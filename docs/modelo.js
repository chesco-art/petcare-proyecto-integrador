'use strict';
/* PetCare: reglas independientes de la interfaz. Solo datos de demostración. */
(function (root) {
  const clone = value => JSON.parse(JSON.stringify(value));
  const categories = {peluqueria:'Peluquería', paseo:'Paseo', guarderia:'Guardería'};
  const zones = {norte:'Norte', centro:'Centro', sur:'Sur'};
  const species = {perro:'Perro', gato:'Gato'};
  function futureDate(now = Date.now()) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone:'America/Bogota', year:'numeric', month:'2-digit', day:'2-digit'
    }).formatToParts(new Date(now + 14 * 86400000));
    return ['year','month','day'].map(k => parts.find(p => p.type === k).value).join('-');
  }
  function initial(now = Date.now()) {
    const service = {
      id:'svc-001', active:true, title:'Baño y corte canino',
      description:'Baño, secado y corte para perros pequeños y medianos.',
      category:'peluqueria', species:'perro', zone:'norte', price:50000,
      address:'Sede de ejemplo en la zona Norte',
      conditions:'Perros pequeños y medianos. Informa necesidades especiales en las notas. Horario sujeto a aceptación.'
    };
    return {version:4, owner:'Propietario de prueba', services:[service],
      requests:['Pendiente','Aceptada','Rechazada'].map((status,i) => ({
        id:'PC-00'+(i+1), serviceId:service.id, title:service.title,
        pet:'Luna', species:'perro', date:futureDate(now), time:'10:00',
        notes:'Luna es pequeña y tiene el pelo largo.', owner:'Propietario de prueba',
        price:50000, address:service.address, status,
        reason:status==='Rechazada'?'No tenemos disponibilidad en el horario solicitado.':''
      }))
    };
  }
  function validState(s) {
    return !!s && s.version===4 && typeof s.owner==='string' &&
      Array.isArray(s.services) && s.services.length>0 &&
      s.services.every(x => x && typeof x.id==='string' && typeof x.title==='string' &&
        typeof x.description==='string' && typeof x.address==='string' &&
        typeof x.conditions==='string' && typeof x.active==='boolean' &&
        categories[x.category] && zones[x.zone] && species[x.species] &&
        Number.isFinite(x.price) && x.price>=0) &&
      new Set(s.services.map(x=>x.id)).size===s.services.length &&
      Array.isArray(s.requests) &&
      s.requests.every(r => r && /^PC-\d+$/.test(r.id) &&
        typeof r.title==='string' && typeof r.pet==='string' &&
        typeof r.owner==='string' && typeof r.reason==='string' &&
        species[r.species] && ['Pendiente','Aceptada','Rechazada'].includes(r.status) &&
        /^\d{4}-\d{2}-\d{2}$/.test(r.date) && /^\d{2}:\d{2}$/.test(r.time) &&
        Number.isFinite(Date.parse(r.date+'T'+r.time+':00-05:00'))) &&
      new Set(s.requests.map(r=>r.id)).size===s.requests.length;
  }
  function requestErrors(data, service, now = Date.now()) {
    const errors = {};
    if (!data.pet?.trim() || data.pet.trim().length>60) errors.pet='Escribe el nombre de la mascota, hasta 60 caracteres.';
    if (!service?.active) errors.service='El servicio no está disponible.';
    if (data.species!==service?.species) errors.species='La especie no corresponde a este servicio.';
    const format = /^\d{4}-\d{2}-\d{2}$/.test(data.date || '') &&
      /^([01]\d|2[0-3]):[0-5]\d$/.test(data.time || '');
    const date = new Date(data.date+'T'+data.time+':00-05:00');
    const calendarDate = new Date(data.date+'T00:00:00Z');
    if (!format || !Number.isFinite(date.valueOf()) ||
        !Number.isFinite(calendarDate.valueOf()) ||
        calendarDate.toISOString().slice(0,10)!==data.date || date.valueOf()<=now) {
      errors.date='Elige una fecha y hora futuras válidas en Colombia.';
    }
    if ((data.notes || '').length>500) errors.notes='Usa hasta 500 caracteres.';
    return errors;
  }
  function addRequest(state, data, now = Date.now()) {
    const service = state.services.find(s=>s.id===data.serviceId);
    const errors = requestErrors(data,service,now);
    if (Object.keys(errors).length) return {errors};
    const next = clone(state);
    const sequence = Math.max(0,...next.requests.map(r=>Number(r.id.slice(3))))+1;
    const request = {
      id:'PC-'+String(sequence).padStart(3,'0'), serviceId:service.id,
      title:service.title, price:service.price, address:service.address,
      pet:data.pet.trim(), species:service.species, date:data.date, time:data.time,
      notes:(data.notes || '').trim(), owner:next.owner, status:'Pendiente', reason:''
    };
    next.requests.unshift(request);
    return {state:next,request};
  }
  function decide(state,id,status,reason='') {
    const request = state.requests.find(r=>r.id===id);
    if (!request) return {error:'No se encontró la solicitud.'};
    if (request.status!=='Pendiente') return {error:'Esta solicitud ya tiene una respuesta definitiva.'};
    if (!['Aceptada','Rechazada'].includes(status)) return {error:'La decisión no es válida.'};
    if (status==='Rechazada' && (!reason.trim() || reason.trim().length>500))
      return {error:'Escribe un motivo de rechazo de hasta 500 caracteres.'};
    const next = clone(state), target=next.requests.find(r=>r.id===id);
    target.status=status; target.reason=status==='Rechazada'?reason.trim():'';
    return {state:next,request:target};
  }
  function saveService(state,id,data) {
    const errors={};
    for(const [field,limit] of Object.entries({title:80,description:500,address:120,conditions:500})) {
      if(!data[field]?.trim() || data[field].trim().length>limit)
        errors[field]='Completa este campo con hasta '+limit+' caracteres.';
    }
    if(!categories[data.category]) errors.category='Selecciona una categoría.';
    if(!zones[data.zone]) errors.zone='Selecciona una zona.';
    if(!species[data.species]) errors.species='Selecciona una especie.';
    if(data.price==='' || !Number.isFinite(Number(data.price)) ||
       Number(data.price)<0 || Number(data.price)>100000000 ||
       Number(data.price)%100!==0) errors.price='Usa un precio entre 0 y 100.000.000 COP, en múltiplos de 100.';
    if(id && !state.services.some(s=>s.id===id)) errors.service='Servicio no encontrado.';
    if(Object.keys(errors).length) return {errors};
    const next=clone(state);
    const old=next.services.find(s=>s.id===id);
    const service={id:id || 'svc-'+String(next.services.length+1).padStart(3,'0'),
      active:old?old.active:true, title:data.title.trim(), description:data.description.trim(),
      category:data.category, species:data.species, zone:data.zone,
      price:Number(data.price), address:data.address.trim(), conditions:data.conditions.trim()};
    if(old) Object.assign(old,service); else next.services.push(service);
    return {state:next,service};
  }
  function setActive(state,id,active) {
    const next=clone(state),service=next.services.find(s=>s.id===id);
    if(!service) return {error:'Servicio no encontrado.'};
    service.active=!!active;
    return {state:next};
  }
  function youtubeId(raw) {
    try {
      const u=new URL(raw); if(u.protocol!=='https:') return null;
      let id=null;
      if(u.hostname==='youtu.be') id=u.pathname.slice(1).split('/')[0];
      if(['youtube.com','www.youtube.com','m.youtube.com'].includes(u.hostname))
        id=u.pathname==='/watch'?u.searchParams.get('v'):
          /^\/(embed|shorts)\//.test(u.pathname)?u.pathname.split('/')[2]:null;
      return /^[A-Za-z0-9_-]{11}$/.test(id || '')?id:null;
    } catch { return null; }
  }
  root.PetCareModel={categories,zones,species,futureDate,initial,validState,
    requestErrors,addRequest,decide,saveService,setActive,youtubeId};
})(typeof window!=='undefined'?window:globalThis);
