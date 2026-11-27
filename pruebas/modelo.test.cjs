/* Ejecutar desde la raíz: node pruebas/modelo.test.cjs */
const assert = require('node:assert/strict');
require('../docs/modelo.js');
const M = globalThis.PetCareModel;
const now = Date.parse('2026-11-27T12:00:00-05:00');
let count = 0;
function check(condition, name) { assert.ok(condition, name); count++; }
const seed = M.initial(now);
check(M.validState(seed), 'Estado inicial válido');
const data = {serviceId:'svc-001',pet:'Bruno',species:'perro',date:'2026-12-10',time:'10:00',notes:'Prueba'};
const first = M.addRequest(seed,data,now);
check(first.request.id==='PC-004' && first.request.status==='Pendiente','Nuevo código y estado pendiente');
check(seed.requests.length===3 && first.state.requests.length===4,'No muta el estado anterior');
const second=M.addRequest(first.state,{...data,pet:'Mia'},now);
check(second.request.id==='PC-005' && second.state.requests.length===5,'Conserva envíos múltiples');
check(!!M.addRequest(seed,{...data,date:'2026-01-01'},now).errors.date,'Fecha pasada');
check(!!M.addRequest(seed,{...data,date:'2027-02-30'},now).errors.date,'Fecha imposible');
check(!!M.addRequest(seed,{...data,time:'25:00'},now).errors.date,'Hora inválida');
check(!!M.addRequest(seed,{...data,pet:'  '},now).errors.pet,'Mascota vacía');
check(!!M.addRequest(seed,{...data,species:'gato'},now).errors.species,'Especie incompatible');
check(!!M.decide(first.state,'PC-004','Rechazada',' ').error,'Motivo obligatorio');
const accepted=M.decide(first.state,'PC-004','Aceptada');
check(accepted.request.status==='Aceptada' && accepted.state.requests.find(r=>r.id==='PC-001').status==='Pendiente','Solo cambia la solicitud seleccionada');
check(!!M.decide(accepted.state,'PC-004','Rechazada','Cambio').error,'Decisión definitiva');
const rejected=M.decide(second.state,'PC-005','Rechazada',' Sin disponibilidad ');
check(rejected.request.reason==='Sin disponibilidad' && rejected.request.status==='Rechazada','Motivo conservado');
const inactive=M.setActive(first.state,'svc-001',false);
check(inactive.state.requests.length===4,'Desactivación conserva historial');
check(!!M.addRequest(inactive.state,data,now).errors.service,'Servicio inactivo bloquea solicitudes');
const active=M.setActive(inactive.state,'svc-001',true);
check(!!M.addRequest(active.state,data,now).request,'Reactivación permite solicitar');
const edited=M.saveService(first.state,'svc-001',{...seed.services[0],price:65000,title:'Nuevo nombre'});
check(edited.state.requests.find(r=>r.id==='PC-004').title==='Baño y corte canino','Editar el servicio conserva la ficha histórica');
check(!!M.saveService(seed,'svc-001',{...seed.services[0],price:-100}).errors.price,'Precio negativo');
check(M.validState(edited.state) && !M.validState({version:4}),'Valida estado guardado');
if (typeof URL !== 'undefined') {
  check(M.youtubeId('https://youtu.be/abcDEF12345')==='abcDEF12345','URL de video válida');
  check(M.youtubeId('https://youtube.com.evil.example/watch?v=abcDEF12345')===null,'Host no autorizado');
  check(M.youtubeId('javascript:alert(1)')===null,'Protocolo no autorizado');
} else {
  console.log('Omitidas 3 comprobaciones de URL: este motor no expone URL. Ejecutar también en Node.');
}
console.log(count+' comprobaciones aprobadas.');
