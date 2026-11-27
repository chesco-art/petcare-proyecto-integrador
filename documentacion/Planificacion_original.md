# PetCare

Proyecto tecnológico integrador de Ingeniería de Software, quinto semestre.
Línea B: gestión de servicios para mascotas.

## Idea y propósito
Aplicación web para conectar propietarios de mascotas con proveedores de veterinaria programada, peluquería, paseo y cuidado temporal. Permite consultar servicios, enviar solicitudes y conocer la respuesta del proveedor.

La información dispersa y la confusión entre solicitar y tener una reserva confirmada son hipótesis que deben contrastarse con usuarios. Una solicitud enviada queda **Pendiente**: no reserva automáticamente un cupo.

## Alcance del MVP
- Catálogo público con filtros por categoría y zona.
- Fichas con descripción, especies atendidas, ubicación, proveedor y precio de referencia.
- Registro de propietarios, inicio y cierre de sesión. Proveedores invitados.
- Solicitudes con mascota, especie y fecha y hora preferidas futuras.
- Aceptación o rechazo por el proveedor del servicio; el rechazo exige motivo.
- Consulta del estado de las solicitudes propias.
- Creación, edición y desactivación de servicios propios.

Se excluyen pagos, chat, geolocalización, reservas automáticas de cupos, reseñas, historias clínicas y urgencias.

## Organización ágil
Se propone Scrum para el desarrollo incremental y Design Thinking para comprender el problema. El análisis de esta primera entrega no se presenta como un sprint de software ya ejecutado.

Cada historia conserva su identificador HU01–HU07, requisito asociado, criterios de aceptación, prioridad e iteración. Las tareas de investigación y preparación se distinguen de las historias de software.

Estados del tablero: Backlog, Por hacer, En curso, En revisión y Terminado. Solo se marca Terminado cuando existe evidencia del cumplimiento; redactar una historia no significa implementarla.

## Iteraciones propuestas
| Iteración | Alcance | Situación |
| --- | --- | --- |
| Preparación | Investigación, prototipo, requisitos y evidencias | Validación pendiente |
| Sprint 1, 5–11 octubre 2026 | HU01 búsqueda y HU02 ficha | Planificado |
| Sprint 2 | HU03 acceso y HU04 solicitudes | Previsión revisable |
| Sprint 3 | HU05 respuesta, HU06 seguimiento y HU07 catálogo | Previsión revisable |

### Plan inicial del Sprint 1
Objetivo: encontrar servicios del catálogo piloto y consultar sus fichas en una web usable.

| Trabajo | Horas persona estimadas |
| --- | ---: |
| Refinar criterios y preparar catálogo autorizado | 4 |
| Preparar proyecto, almacenamiento y carga inicial | 6 |
| Implementar consulta, filtros y mensajes vacíos | 10 |
| Implementar ficha y control de servicio inactivo | 6 |
| Pruebas de aceptación, tamaños y teclado | 7 |
| Planificación, seguimiento, revisión y retrospectiva | 7 |
| Total | 40 |

Capacidad supuesta: cinco integrantes con ocho horas cada uno. Ajustar a los integrantes y disponibilidad reales.

Condición de terminado: HU01 y HU02 integradas, criterios cumplidos, revisión por otro integrante, pruebas aprobadas y demostración accesible, sin defectos bloqueantes.

## Responsabilidades
Product Owner: priorizar y contrastar valor. Scrum Master: facilitar el proceso y hacer visibles impedimentos. Developers: análisis, diseño, implementación y calidad. La asignación nominal debe acordarse con el equipo, de máximo cinco estudiantes.

## Estado de la evidencia
Los documentos preparados contienen escenarios simulados, perfiles hipotéticos y prototipos de baja fidelidad. No se atribuyen entrevistas ni pruebas de usabilidad reales sin sus registros. Las metas de rendimiento y usabilidad son objetivos, no resultados medidos. Este repositorio contiene planificación y documentación, no una aplicación implementada.

## Evidencias para el documento académico
Incluir captura del tablero, enlace del proyecto, planificación del sprint, registros anonimizados de entrevistas y pruebas reales, y fotografías del prototipo en papel cuando se realicen. No subir contraseñas ni información personal de participantes.
