'use strict';
/* Control de las pantallas. El modelo mantiene separadas las reglas del negocio. */
(() => {
  const M=window.PetCareModel, config=window.PETCARE_CONFIG;
  const main=document.getElementById('contenido');
  const page=document.body.dataset.page, params=new URLSearchParams(location.search);
  const key='petcare-actividad4-v4:'+new URL('.',location.href).pathname;
  const $=s=>document.querySelector(s);
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url=(path,id)=>path+'.html'+(id?'?id='+encodeURIComponent(id):'');
  const money=n=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n)+' COP';
  const when=r=>new Intl.DateTimeFormat('es-CO',{timeZone:'America/Bogota',dateStyle:'long',timeStyle:'short'}).format(new Date(r.date+'T'+r.time+':00-05:00'));
  const badge=status=>'<span class="badge '+status.toLowerCase()+'">'+esc(status)+'</span>';
  const link=(href,label,secondary=false)=>'<a class="button'+(secondary?' secondary':'')+'" href="'+esc(href)+'">'+esc(label)+'</a>';
  const notice=(title,body,kind='info')=>'<div class="notice '+kind+'"><strong>'+esc(title)+'</strong><p>'+esc(body)+'</p></div>';
  const errorsBox='<div id="errors" class="notice danger" role="alert" tabindex="-1" hidden></div>';
  const field=(id,label,value='',type='text',extra='')=>'<div class="field"><label for="'+id+'">'+label+'</label><input id="'+id+'" name="'+id+'" type="'+type+'" value="'+esc(value)+'" '+extra+'></div>';
  const area=(id,label,value='')=>'<div class="field"><label for="'+id+'">'+label+'</label><textarea id="'+id+'" name="'+id+'" rows="3" maxlength="500">'+esc(value)+'</textarea></div>';
  const select=(id,label,options,value='')=>'<div class="field"><label for="'+id+'">'+label+'</label><select id="'+id+'" name="'+id+'">'+Object.entries(options).map(([v,t])=>'<option value="'+esc(v)+'"'+(v===value?' selected':'')+'>'+esc(t)+'</option>').join('')+'</select></div>';
  const form=(id,body,button)=>'<form id="'+id+'" class="panel stack" novalidate>'+errorsBox+body+'<button type="submit" class="button">'+button+'</button></form>';
  const go=path=>{location.href=path;};
  let state=M.initial(),storageReady=true;
  try {
    const saved=JSON.parse(localStorage.getItem(key));
    if(M.validState(saved))state=saved;
    else localStorage.setItem(key,JSON.stringify(state));
  } catch {storageReady=false;}
  function fresh() {
    try {const saved=JSON.parse(localStorage.getItem(key));return M.validState(saved)?saved:state;}
    catch {return state;}
  }
  function showErrors(errors) {
    document.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
    let box=$('#errors');
    if(!box){box=document.createElement('div');box.id='errors';box.className='notice danger';box.setAttribute('role','alert');box.tabIndex=-1;main.prepend(box);}
    box.hidden=false;box.innerHTML='<strong>Revisa los datos</strong><ul>'+Object.entries(errors).map(([id,msg])=>'<li>'+esc(msg)+'</li>').join('')+'</ul>';
    for(const id of Object.keys(errors)){const control=document.getElementById(id);if(control){control.setAttribute('aria-invalid','true');control.setAttribute('aria-describedby','errors');}}
    box.focus();
  }
  function persist(next,redirect) {
    try {localStorage.setItem(key,JSON.stringify(next));state=next;if(redirect)go(redirect);return true;}
    catch {storageReady=false;showErrors({storage:'No se pudo guardar. Habilita el almacenamiento del sitio y vuelve a intentarlo.'});return false;}
  }
  function submit(id,callback) {
    document.getElementById(id).addEventListener('submit',e=>{
      e.preventDefault();
      if(!storageReady){showErrors({storage:'Habilita el almacenamiento del navegador y recarga esta página.'});return;}
      callback(Object.fromEntries(new FormData(e.currentTarget)));
    });
  }
  function view(title,body,subtitle='') {
    document.title=title+' | PetCare';
    main.innerHTML='<div class="heading"><p class="eyebrow">PETCARE · CUIDADO CERCA DE TI</p><h1>'+esc(title)+'</h1>'+(subtitle?'<p class="muted">'+esc(subtitle)+'</p>':'')+'</div>'+body;
  }
  const request=()=>state.requests.find(r=>r.id===params.get('id'));
  const service=()=>state.services.find(s=>s.id===params.get('id'));
  function requestInfo(r) {
    return badge(r.status)+'<h2>'+esc(r.title)+'</h2><p>'+esc(r.id)+' · '+esc(r.pet)+' · '+esc(M.species[r.species])+'</p><p>'+esc(when(r))+'<br><span class="muted">Hora de Colombia (UTC−5)</span></p><p>Proveedor: Huellas Norte</p><p>Propietario: '+esc(r.owner)+'</p>'+(r.notes?'<p>Notas: '+esc(r.notes)+'</p>':'');
  }
  function requestList(provider) {
    const render=()=>{
      state=fresh();
      const status=$('#estado').value, items=state.requests.filter(r=>!status||r.status===status);
      $('#count').textContent=items.length+(items.length===1?' solicitud':' solicitudes');
      $('#request-list').innerHTML=items.map(r=>'<article class="panel stack" data-request-id="'+esc(r.id)+'">'+requestInfo(r)+(r.status==='Rechazada'?notice('Motivo',r.reason,'danger'):'')+link(url(provider?(r.status==='Pendiente'?'revisar-solicitud':'respuesta'):'solicitud-pendiente',r.id),provider&&r.status==='Pendiente'?'Revisar solicitud':'Ver detalle')+'</article>').join('');
      $('#empty').hidden=!!items.length;
    };
    view(provider?'Solicitudes recibidas':'Mis solicitudes',
      '<div class="toolbar">'+select('estado','Filtrar por estado',{'':'Todos los estados',Pendiente:'Pendiente',Aceptada:'Aceptada',Rechazada:'Rechazada'})+'<p id="count" role="status"></p></div><div id="request-list" class="grid-three"></div><p id="empty" class="notice" hidden>No hay solicitudes con este estado.</p>'+
      notice('Una solicitud no confirma una cita','El proveedor debe aceptar el horario. El rechazo siempre incluye un motivo.','pending')+
      link(provider?'mis-solicitudes.html':'login-proveedor.html',provider?'Ver como propietario':'Probar la respuesta como proveedor',true));
    $('#estado').addEventListener('change',render);render();
  }
  function outcome(r,provider=false) {
    const title=r.status==='Aceptada'?'Horario aceptado':r.status==='Rechazada'?'Motivo del rechazo':'Pendiente de respuesta';
    const message=r.status==='Aceptada'?'Huellas Norte aceptó '+when(r)+' (Colombia).':r.status==='Rechazada'?r.reason:'Tu cita aún no está confirmada. Abre Mis solicitudes para consultar la decisión.';
    view(provider?'Respuesta registrada':r.status==='Pendiente'?'Tu solicitud fue enviada':'Tu solicitud fue '+r.status.toLowerCase(),
      '<section class="panel stack detail">'+requestInfo(r)+notice(title,message,r.status==='Aceptada'?'success':r.status==='Rechazada'?'danger':'pending')+
      '<div class="actions">'+link(provider?url('solicitud-pendiente',r.id):'mis-solicitudes.html',provider?'Ver como propietario':'Ver mis solicitudes')+link(provider?'solicitudes-proveedor.html':'catalogo.html',provider?'Volver a solicitudes':'Explorar servicios',true)+'</div></section>');
  }
  const requestPages=['solicitud-pendiente','revisar-solicitud','aceptar-solicitud','rechazar-solicitud','respuesta'];
  if(requestPages.includes(page)&&!request()){view('Solicitud no encontrada',link('mis-solicitudes.html','Ver mis solicitudes'));return;}
  if(['servicio','solicitud','desactivar-servicio'].includes(page)&&!service()){view('Servicio no encontrado',link('catalogo.html','Volver al catálogo'));return;}
  if(['servicio','solicitud'].includes(page)&&!service().active){view('Servicio no disponible',notice('No recibe nuevas solicitudes','Puedes consultar otros servicios. Las solicitudes anteriores se conservan.')+link('catalogo.html','Explorar servicios'));return;}

  if(page==='catalogo') {
    view('Encuentra el cuidado que necesita',
      '<form id="filters" class="panel filters">'+select('categoria','Categoría',{'':'Todas',...M.categories})+select('zona','Zona',{'':'Todas',...M.zones})+'<button class="button" type="submit">Buscar servicios</button><button class="button secondary" id="clear" type="button">Limpiar filtros</button></form><p id="count" role="status"></p><div id="catalog" class="grid-three"></div><div id="empty" class="notice" hidden>No hay coincidencias. Limpia los filtros para volver al catálogo.</div>'+notice('Tú propones. El proveedor confirma.','Consulta las condiciones antes de enviar una solicitud.','pending'));
    const render=()=>{
      const matches=fresh().services.filter(s=>s.active&&(!$('#categoria').value||s.category===$('#categoria').value)&&(!$('#zona').value||s.zone===$('#zona').value));
      $('#count').textContent=matches.length+(matches.length===1?' servicio disponible':' servicios disponibles');
      $('#catalog').innerHTML=matches.map(s=>'<article class="panel stack" data-service-id="'+esc(s.id)+'"><p class="eyebrow">'+esc(M.categories[s.category])+' · '+esc(M.zones[s.zone])+'</p><h2>'+esc(s.title)+'</h2><p>Huellas Norte</p><p>'+esc(s.description)+'</p><p class="price">'+money(s.price)+'</p><p class="small muted">Precio de referencia. Datos ficticios.</p>'+link(url('servicio',s.id),'Ver servicio')+'</article>').join('');
      $('#empty').hidden=!!matches.length;
    };
    $('#filters').addEventListener('submit',e=>{e.preventDefault();render();});
    $('#clear').addEventListener('click',()=>{$('#filters').reset();render();});render();
  } else if(page==='servicio') {
    const s=service();
    view(s.title,'<div class="columns"><section class="panel stack"><h2>Qué incluye</h2><p>'+esc(s.description)+'</p><h2>Condiciones</h2><p>'+esc(s.conditions)+'</p><p>Especie admitida: '+esc(M.species[s.species])+'</p><h2>Dónde se presta</h2><p>Zona '+esc(M.zones[s.zone])+' · '+esc(s.address)+'</p><p class="small muted">Ubicación ficticia para esta demostración.</p></section><aside class="panel stack"><h2>Huellas Norte</h2><p class="price">'+money(s.price)+'</p><p class="small muted">Precio de referencia</p>'+notice('Primero, envía una solicitud','El horario necesita la aceptación del proveedor. No se realizan pagos.','pending')+link(url('login',s.id),'Solicitar servicio')+link('catalogo.html','Volver al catálogo',true)+'</aside></div>');
  } else if(['login','registro','login-proveedor'].includes(page)) {
    const register=page==='registro', provider=page==='login-proveedor';
    const target=provider?'panel-proveedor.html':params.get('id')?url('solicitud',params.get('id')):'panel-propietario.html';
    view(register?'Crea tu cuenta de demostración':provider?'Acceso de proveedor':'Iniciar sesión',
      notice('Acceso simulado','Usa datos ficticios. No se crea una cuenta real ni se guardan correos o contraseñas.')+
      '<div class="columns">'+form('access',(register?field('owner','Nombre completo *','Propietario de prueba','text','required maxlength="80"'):'')+
      field('email','Correo electrónico *',provider?'proveedor@petcare.example':'propietario@petcare.example','email','required autocomplete="off"')+
      field('password','Contraseña de ejemplo *','PetCareDemo12!','password','required minlength="12" autocomplete="off"')+
      (register?field('confirmation','Confirmar contraseña *','PetCareDemo12!','password','required minlength="12" autocomplete="off"'):''),
      register?'Crear cuenta y continuar':'Iniciar sesión')+
      '<aside class="panel stack"><h2>'+esc(params.get('id')?(state.services.find(s=>s.id===params.get('id'))?.title||'Continuar solicitud'):'Tu espacio en PetCare')+'</h2><p>El servicio elegido se conserva durante el acceso.</p>'+
      (provider?link('login.html','Soy propietario',true):link(url(register?'login':'registro',params.get('id')),register?'Ya tengo cuenta':'Crear una cuenta',true))+'</aside></div>');
    submit('access',data=>{
      const errors={};
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))errors.email='Escribe un correo electrónico válido.';
      if(data.password.length<12)errors.password='Usa al menos 12 caracteres.';
      if(register&&data.password!==data.confirmation)errors.confirmation='Las contraseñas deben coincidir.';
      if(register&&(!data.owner.trim()||data.owner.trim().length>80))errors.owner='Escribe un nombre de hasta 80 caracteres.';
      if(Object.keys(errors).length){showErrors(errors);return;}
      const next=fresh();if(register)next.owner=data.owner.trim();
      persist(next,target);
    });
  } else if(page==='panel-propietario') {
    view('Hola, '+state.owner,'<div class="grid-two"><section class="panel stack"><h2>El cuidado empieza aquí</h2><p>Revisa la oferta y propón un horario.</p>'+link('catalogo.html','Explorar servicios')+'</section><section class="panel stack"><h2>Tus solicitudes, en un lugar</h2><p>Consulta los estados y las respuestas.</p>'+link('mis-solicitudes.html','Ver mis solicitudes')+'</section></div>');
  } else if(page==='solicitud') {
    const s=service();
    view('Solicita el servicio para tu mascota','<div class="columns">'+
      form('request','<div class="grid-two">'+field('pet','Nombre de la mascota *','Luna','text','required maxlength="60"')+select('species','Especie *',{[s.species]:M.species[s.species]},s.species)+'</div><div class="grid-two">'+field('date','Fecha preferida *',M.futureDate(),'date','required')+field('time','Hora preferida *','10:00','time','required')+'</div><p class="small muted">Selecciona una fecha futura. Hora de Colombia (UTC−5).</p>'+area('notes','Notas (opcional)')+notice('Quedará pendiente de revisión','Enviar esta solicitud no confirma una reserva.','pending'),'Enviar solicitud')+
      '<aside class="panel stack"><h2>'+esc(s.title)+'</h2><p>Huellas Norte · Zona '+esc(M.zones[s.zone])+'</p><p class="price">'+money(s.price)+'</p>'+link(url('servicio',s.id),'Volver al servicio',true)+'</aside></div>');
    submit('request',data=>{
      const result=M.addRequest(fresh(),{...data,serviceId:s.id});
      if(result.errors)showErrors(result.errors);
      else persist(result.state,url('solicitud-pendiente',result.request.id));
    });
  } else if(page==='mis-solicitudes') {
    requestList(false);
  } else if(page==='solicitudes-proveedor') {
    requestList(true);
  } else if(page==='solicitud-pendiente'||page==='respuesta') {
    outcome(request(),page==='respuesta');
  } else if(page==='panel-proveedor') {
    view('Gestiona tu servicio','<div class="grid-two"><section class="panel stack"><h2>Revisa las solicitudes</h2><p>Comprueba la disponibilidad antes de responder.</p>'+link('solicitudes-proveedor.html','Ver solicitudes')+'</section><section class="panel stack"><h2>Mantén el catálogo al día</h2><p>Crea, edita, desactiva o reactiva tu oferta.</p>'+link('mis-servicios.html','Gestionar servicios')+'</section></div>'+notice('Perfil de demostración','Representas a Huellas Norte. Las acciones se realizan únicamente en este navegador.'));
  } else if(['revisar-solicitud','aceptar-solicitud','rechazar-solicitud'].includes(page)) {
    const r=request();
    if(r.status!=='Pendiente'){outcome(r,true);return;}
    if(page==='revisar-solicitud') {
      view('Revisa la solicitud de '+r.pet,'<section class="panel stack detail">'+requestInfo(r)+notice('La decisión será definitiva','Aceptar confirma el horario; rechazar exige un motivo.')+'<div class="actions">'+link(url('aceptar-solicitud',r.id),'Aceptar solicitud')+link(url('rechazar-solicitud',r.id),'Rechazar solicitud',true)+'</div>'+link('solicitudes-proveedor.html','Volver a solicitudes',true)+'</section>');
    } else if(page==='aceptar-solicitud') {
      view('¿Aceptar este horario?',form('accept',requestInfo(r)+notice('Confirmar aceptación','El propietario verá este horario como aceptado.'),'Confirmar aceptación')+link(url('revisar-solicitud',r.id),'Volver a revisar',true));
      submit('accept',()=>{const result=M.decide(fresh(),r.id,'Aceptada');if(result.error)showErrors({decision:result.error});else persist(result.state,url('respuesta',r.id));});
    } else {
      view('Explica el motivo del rechazo',form('reject',requestInfo(r)+area('reason','Motivo del rechazo *')+'<p>El propietario podrá leer tu respuesta.</p>','Confirmar rechazo')+link(url('revisar-solicitud',r.id),'Volver a revisar',true));
      submit('reject',data=>{const result=M.decide(fresh(),r.id,'Rechazada',data.reason);if(result.error)showErrors({reason:result.error});else persist(result.state,url('respuesta',r.id));});
    }
  } else if(page==='mis-servicios') {
    view('Mis servicios',link('editar-servicio.html','Crear servicio')+
      '<div class="grid-two">'+state.services.map(s=>'<article class="panel stack" data-service-id="'+esc(s.id)+'"><p class="eyebrow">'+(s.active?'ACTIVO':'INACTIVO')+'</p><h2>'+esc(s.title)+'</h2><p>'+esc(M.categories[s.category])+' · Zona '+esc(M.zones[s.zone])+'</p><p class="price">'+money(s.price)+'</p><div class="actions">'+link(url('editar-servicio',s.id),'Editar servicio',true)+(s.active?link(url('desactivar-servicio',s.id),'Desactivar',true):'<button class="button" data-reactivate="'+esc(s.id)+'">Reactivar servicio</button>')+'</div></article>').join('')+'</div>');
    document.querySelectorAll('[data-reactivate]').forEach(b=>b.addEventListener('click',()=>{const result=M.setActive(fresh(),b.dataset.reactivate,true);if(result.error)showErrors({service:result.error});else persist(result.state,'mis-servicios.html');}));
  } else if(page==='desactivar-servicio') {
    const s=service();
    view('¿Desactivar este servicio?',form('disable','<h2>'+esc(s.title)+'</h2>'+notice('No recibirá nuevas solicitudes','Dejará de aparecer en el catálogo. Las solicitudes anteriores se conservan.'),'Confirmar desactivación')+link('mis-servicios.html','Cancelar',true));
    submit('disable',()=>{const result=M.setActive(fresh(),s.id,false);if(result.error)showErrors({service:result.error});else persist(result.state,'mis-servicios.html');});
  } else if(page==='editar-servicio') {
    const s=service()||{title:'',description:'',category:'peluqueria',species:'perro',zone:'norte',price:50000,address:'',conditions:''};
    if(params.has('id')&&!service()){view('Servicio no encontrado',link('mis-servicios.html','Mis servicios'));return;}
    view(params.has('id')?'Editar servicio':'Crear servicio',
      form('service',field('title','Nombre del servicio *',s.title,'text','required maxlength="80"')+
      area('description','Descripción *',s.description)+
      '<div class="grid-two">'+select('category','Categoría *',M.categories,s.category)+select('species','Especie admitida *',M.species,s.species)+select('zone','Zona *',M.zones,s.zone)+field('price','Precio de referencia (COP) *',s.price,'number','required min="0" max="100000000" step="100"')+'</div>'+
      field('address','Dirección de ejemplo *',s.address,'text','required maxlength="120"')+area('conditions','Condiciones *',s.conditions),'Guardar servicio')+link('mis-servicios.html','Cancelar',true));
    submit('service',data=>{const result=M.saveService(fresh(),params.get('id'),data);if(result.errors)showErrors(result.errors);else persist(result.state,'mis-servicios.html');});
  } else if(page==='demostracion') {
    const id=M.youtubeId(config.videoUrl);
    view('Así construimos PetCare',
      '<p>'+esc(config.autores.join(' y '))+'</p><section class="panel stack"><h2>Video de creación y demostración</h2>'+
      (id?'<div class="video-player"><iframe src="https://www.youtube-nocookie.com/embed/'+id+'" title="Creación y demostración de PetCare por Diego y Nicolás" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>'+link('https://www.youtube.com/watch?v='+id,'Abrir video en YouTube',true):
      '<div class="video-pending"><p class="eyebrow">GRABACIÓN DEL EQUIPO</p><h3>Video pendiente de incorporar</h3><p>Diego y Nicolás deben grabar la explicación y añadir su enlace antes de entregar la actividad.</p>'+(config.videoUrl?'<p>El enlace configurado no es válido. Revísenlo antes de entregar.</p>':'')+'</div>')+'</section><div class="grid-three"><article class="panel stack"><h2>Diseño</h2><p>El problema, los perfiles y la relación con el wireframe.</p></article><article class="panel stack"><h2>Código</h2><p>Estructura HTML, CSS adaptable y reglas de JavaScript.</p></article><article class="panel stack"><h2>Demostración</h2><p>Envío, seguimiento, respuestas y publicación del sitio.</p></article></div>'+link('proyecto.html','Sobre el proyecto',true));
  } else if(page==='proyecto') {
    view('Un sitio para solicitar y dar seguimiento',
      '<p>'+esc(config.autores.join(' y '))+'</p><section class="panel stack"><h2>Problema y objetivo</h2><p>PetCare reúne la consulta de servicios para mascotas, la propuesta de un horario y la respuesta del proveedor. La mejora central es distinguir una solicitud recibida de una cita confirmada.</p></section>'+
      '<div class="grid-two"><article class="panel stack"><h2>Del wireframe al código</h2><p>Se conservan catálogo, detalle, acceso, registro, solicitud y revisión. El verde #166534, las tarjetas y la jerarquía mantienen la identidad de PetCare.</p></article><article class="panel stack"><h2>Desarrollo incremental</h2><p>El trabajo avanza por estructura, estilos, interacción, verificación y publicación. Cada etapa permite revisar un resultado concreto.</p></article></div>'+
      '<section class="panel stack"><h2>Tecnologías y alcance</h2><p>HTML estructura las páginas, CSS adapta su presentación y JavaScript controla formularios, filtros y estados. GitHub Pages es el hosting gratuito seleccionado.</p><p>Los accesos son simulados. No hay cuentas reales, base de datos compartida, pagos ni reservas reales. No se guardan correos ni contraseñas. Cada navegador tiene sus propios ejemplos.</p><p>Las verificaciones técnicas de esta actividad no representan nuevas pruebas con participantes reales.</p></section>'+
      '<section class="panel stack"><h2>Comprobar la demostración</h2><p>Cambiar de perfil conserva los datos. El reinicio restaura únicamente los ejemplos de este navegador.</p><div class="actions">'+link('movil.html','Ver vista de 360 px',true)+'<button id="reset" class="button secondary">Restablecer ejemplos</button></div></section>'+
      '<section class="panel stack"><h2>Fuentes técnicas</h2><a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages">GitHub Docs: GitHub Pages</a><a href="https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API">MDN: almacenamiento web</a></section>');
    $('#reset').addEventListener('click',()=>{if(confirm('¿Restablecer los ejemplos? Se borrarán los cambios de esta demostración en este navegador.'))persist(M.initial(),'index.html');});
  } else if(page==='movil') {
    view('Recorrido móvil de 360 px','<p>Las mismas páginas se adaptan al ancho disponible. Esta vista permite comprobar el recorrido.</p><iframe class="mobile-preview" title="PetCare a 360 píxeles de ancho" src="catalogo.html"></iframe>');
  }
  if(!storageReady) {
    const p=document.createElement('p');p.className='notice danger';p.setAttribute('role','alert');
    p.textContent='El almacenamiento está bloqueado. Habilítalo antes de probar los formularios.';
    main.prepend(p);
  }
})();
