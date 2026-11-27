# Guía de entrega de PetCare

**Asignatura:** Diseño de Aplicaciones Web. **Actividad:** 4.  
**Integrantes:** Diego Alejandro Parra Cespedes y Nicolás Chesini Martin.  
**Preparación:** 27 de noviembre de 2026.

## Qué hay que entregar

1. La URL pública del sitio programado a partir del prototipo anterior.
2. La URL de un video del equipo que explique la creación y demuestre el funcionamiento.
3. El mismo video integrado dentro del sitio.
4. Contenido propio de PetCare y trabajo grupal.

El enunciado no exige expresamente un informe APA adicional ni fija la duración del video. Esta guía y el guion son apoyos; no sustituyen las dos URL.

## Qué representa la implementación

Se mantiene el recorrido del wireframe: catálogo, ficha del servicio, acceso o registro, solicitud, acuse de recibo, seguimiento, revisión del proveedor y respuesta. Cada envío crea un código diferente. El botón «Ver mis solicitudes» indica el siguiente paso después del envío.

Los campos se pueden editar. Se bloquean las fechas pasadas, las especies incompatibles y los rechazos sin motivo. El proveedor puede crear, editar, desactivar y reactivar servicios. La desactivación conserva las solicitudes anteriores.

Esta es una demostración funcional de interfaz y lógica local. El acceso no autentica cuentas y las solicitudes no se envían a negocios. No hay una base de datos compartida. Usen datos ficticios y una sola pestaña para ensayar ambos perfiles.

## Herramientas y modelo elegido

| Elemento | Elección y motivo |
| --- | --- |
| Editor | Visual Studio Code; permite revisar y explicar los archivos del proyecto. |
| Estructura | HTML5 multipágina, con navegación mediante enlaces. |
| Presentación | CSS3, Grid, Flexbox y consultas de medios. |
| Interacción | JavaScript sin framework; las reglas están en modelo.js y la interfaz en app.js. |
| Datos de ejemplo | localStorage; conserva el recorrido en el mismo navegador. |
| Hosting | GitHub Pages; sirve los archivos estáticos desde el repositorio público. |

Se propone desarrollo incremental: revisar el wireframe, construir la estructura, aplicar estilos, incorporar interacción, verificar y publicar. Un desarrollo secuencial completo ofrece fases definidas, pero posterga la evaluación de la interacción; la iteración sobre el prototipo permite corregir la orientación del usuario antes de cerrar la entrega. Esta comparación justifica el enfoque, sin afirmar que exista un backend completo ni un proceso Scrum ejecutado con evidencias que no se han registrado.

## Hosting investigado

| Alternativa | Uso en esta actividad | Condición relevante |
| --- | --- | --- |
| GitHub Pages | Opción elegida, compatible con el repositorio existente. | GitHub Free permite publicar desde repositorios públicos. Aloja HTML, CSS y JavaScript estáticos. |
| Cloudflare Pages | Alternativa consultada para carga directa o integración con Git. | Su plan gratuito tiene límites de archivos y compilaciones, publicados en su documentación. |

No se requiere contratar un plan de pago para el alcance propuesto. Node.js y Bootstrap aparecen como sugerencias en el enunciado; no son obligatorios para este sitio.

## Subir los archivos del proyecto

La visibilidad pública permitió leer el repositorio, pero la conexión no pudo escribir. Al preparar este paquete no se creó la rama ni se modificó el repositorio.

1. Descarga y extrae PetCare_Actividad4.zip.
2. Abre [petcare-proyecto-integrador](https://github.com/chesco-art/petcare-proyecto-integrador) con tu cuenta chesco-art.
3. Abre el selector de rama que dice **main**. Escribe **actividad-4-web** y elige crear esa rama desde main.
4. Con esa rama seleccionada, pulsa **Add file > Upload files**.
5. Arrastra el contenido de la carpeta extraída: **docs**, **documentacion**, **pruebas** y **README.md**. No subas solamente el archivo ZIP ni una carpeta exterior adicional.
6. Revisa que GitHub muestre **docs/index.html** y confirma la carga con **Commit changes**. El README preparado es para esta rama; el original queda conservado en documentacion/Planificacion_original.md.
7. Abre docs/index.html en GitHub para comprobar que se cargó el código.

## Activar GitHub Pages

1. Abre el repositorio petcare-proyecto-integrador con tu cuenta chesco-art.
2. Ve a **Settings > Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**.
4. Selecciona la rama **actividad-4-web** y la carpeta **/docs**.
5. Pulsa **Save** y espera a que el despliegue termine. Si aparece un fallo, revisa la ejecución en **Actions**.
6. Copia la dirección exacta que muestre Pages. Esa será la URL del sitio cuando la publicación haya terminado correctamente.
7. Abre esa URL en incógnito y repite las tareas. Si la página carga sin estilos, revisa que index.html, styles.css y los tres JavaScript estén en la misma carpeta publicada.

No es necesario fusionar la rama con main para publicarla desde Pages. La URL del repositorio, el enlace de Figma y las direcciones localhost o 127.0.0.1 no sustituyen la URL del hosting.

## Ensayo del recorrido

1. Inicio > Entrar como propietario > Ver servicio > Solicitar servicio.
2. Utiliza los datos ficticios del acceso. Para enseñar el registro, abre Crear una cuenta.
3. Escribe una mascota, una fecha futura y una nota. Primero puedes intentar una fecha pasada para mostrar la validación.
4. Envía y anota el nuevo código. El estado debe ser Pendiente.
5. Abre Ver mis solicitudes > Probar la respuesta como proveedor.
6. Inicia el acceso de demostración, entra a Ver solicitudes y revisa ese mismo código.
7. Acepta y confirma. Pulsa Ver como propietario para consultar la respuesta.
8. Crea otra solicitud para mostrar el rechazo. Comprueba que sin motivo no se registra y que el motivo aparece después.
9. Prueba el filtro por estado, la creación de un servicio y la vista móvil desde Sobre el proyecto.

PC-001, PC-002 y PC-003 son ejemplos iniciales. Los nuevos envíos generan PC-004, PC-005 y siguientes. Los ejemplos se comparten entre los perfiles de la demostración, no entre dispositivos.

## Video e integración

Se propone una grabación de unos 5 a 6 minutos; es una sugerencia, no un límite del enunciado. El guion está en Guion_video.md.

1. Ensayen el código y la navegación antes de grabar.
2. Muestren brevemente el wireframe, la estructura HTML, el CSS y las funciones de JavaScript. La grabación debe explicar la creación, no limitarse a recorrer botones.
3. Cuando el sitio esté publicado, muestren la configuración real de Pages y la dirección pública.
4. Suban el video del equipo a YouTube con acceso público o no listado e inserción habilitada.
5. En docs/configuracion.js, sustituyan las comillas vacías de `videoUrl: ''` por la URL completa de su video, conservando las comillas.
6. Guarden el cambio en la misma rama y esperen el nuevo despliegue.
7. Abran Video del proyecto desde incógnito y comprueben que el video se reproduce. No basta con que aparezca el marco.

Mientras no exista una URL válida, la página muestra «Video pendiente de incorporar». Esa condición no cumple todavía el requisito del video.

## Distribución propuesta

| Integrante | Preparación e intervención |
| --- | --- |
| Diego Alejandro Parra Cespedes | Objetivo, relación con el wireframe, estructura HTML, CSS y adaptación móvil. |
| Nicolás Chesini Martin | Reglas JavaScript, recorrido de solicitud y respuesta, hosting e incorporación del video. |
| Ambos | Revisar el sitio publicado, grabar sus intervenciones y comprobar la entrega. |

Es una distribución sugerida. Los commits y la explicación de autoría deben reflejar las contribuciones efectivamente realizadas.

## Lista de cierre

- [ ] La URL pública abre sin iniciar sesión.
- [ ] Los textos y servicios corresponden a PetCare.
- [ ] La solicitud crea Pendiente y conserva su código.
- [ ] Aceptación y rechazo aparecen correctamente para el propietario.
- [ ] Se bloquean la fecha pasada y el rechazo sin motivo.
- [ ] Se verificó el uso en móvil y con teclado.
- [ ] Ambos integrantes explican el proceso y el código en el video.
- [ ] El video se reproduce dentro del sitio sin pedir permisos.
- [ ] Se entregan la URL del sitio y la URL del video.

## Fuentes oficiales consultadas

- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Crear un sitio de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configurar la fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [Límites de Cloudflare Pages](https://developers.cloudflare.com/pages/platform/limits/)
- [MDN API de almacenamiento web](https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API)
- [Reproductor integrado de YouTube](https://developers.google.com/youtube/player_parameters)

Los recursos bibliográficos de la asignatura deben consultarse desde la unidad. No se atribuyen afirmaciones a los textos cuyo contenido no se ha revisado.
