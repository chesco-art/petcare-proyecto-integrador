# Guion del video de PetCare

**Equipo:** Diego Alejandro Parra Cespedes y Nicolás Chesini Martin.  
**Duración sugerida:** aproximadamente 5 a 6 minutos. El enunciado no fija un límite.  
**Preparación:** tener abiertos el wireframe anterior, el editor, el sitio publicado y la configuración de GitHub Pages. Ensayar los clics, utilizar datos ficticios y elegir fechas futuras.

El texto debe adaptarse al trabajo efectivamente realizado. No lean como terminado un paso que todavía esté pendiente.

## Diego · Objetivo y continuidad · 0:00 a 0:45

**Mostrar:** portada del sitio y brevemente el wireframe.

“Hola, somos Diego Alejandro Parra Cespedes y Nicolás Chesini Martin. Presentamos PetCare para la Actividad 4 de Diseño de Aplicaciones Web.

El proyecto responde a una necesidad concreta: consultar un servicio para una mascota, proponer un horario y saber si el proveedor lo acepta. En la actividad anterior definimos la navegación mediante un wireframe. Ahora esa estructura se implementa con código.

Conservamos los perfiles de propietario y proveedor, el catálogo y el seguimiento. La regla principal es que enviar una solicitud no confirma la cita: primero queda pendiente y luego el proveedor responde.”

## Diego · HTML y CSS · 0:45 a 1:40

**Mostrar:** index.html y styles.css. Buscar las reglas .columns, .grid-two y @media.

“HTML organiza el encabezado, la navegación, el contenido principal y el pie de página. Cada pantalla tiene su propio destino. Las fichas y los formularios que dependen de los datos se generan desde app.js con etiquetas HTML.

CSS define la presentación compartida. Conservamos el verde de PetCare y utilizamos Inter, con una fuente alternativa del sistema si no carga. Las variables facilitan mantener los colores consistentes.

Grid y Flexbox distribuyen los elementos. Las consultas de medios cambian las columnas de escritorio por una sola columna cuando el espacio es pequeño. También usamos etiquetas de formulario, foco visible para teclado y nombres de estado. Así, Pendiente, Aceptada y Rechazada se entienden sin depender solamente del color.”

## Nicolás · Reglas de JavaScript · 1:40 a 2:30

**Mostrar:** modelo.js, funciones requestErrors, addRequest y decide; luego app.js.

“Separar las reglas de la interfaz permite revisar cada parte con claridad. En modelo.js se comprueban los datos, se crean las solicitudes y se registran las decisiones. En app.js se muestran los resultados y se responde a los clics y formularios.

Cada nuevo envío tiene su propio código y empieza en Pendiente. Una decisión cambia únicamente la solicitud seleccionada. El rechazo exige un motivo y una respuesta definitiva no puede cambiarse desde el recorrido normal.

Los ejemplos se conservan en el almacenamiento local del navegador. Esta versión no autentica cuentas ni tiene una base de datos compartida; demuestra la interfaz y la lógica del alcance académico.”

## Nicolás · Demostración · 2:30 a 3:55

**Mostrar y realizar:** catálogo, ficha, acceso o registro, solicitud, seguimiento y respuesta del proveedor. Preparar otra solicitud para el rechazo.

“Como propietario, consulto el catálogo y abro una ficha. Reviso la especie admitida, las condiciones y el precio. Continúo con los datos ficticios y propongo un horario.

Si elijo una fecha pasada, aparece el error y se bloquea el envío. Al corregirla, se crea la solicitud con un código y se indica que todavía no está confirmada. El botón Ver mis solicitudes muestra dónde dar seguimiento.

Ahora paso al perfil de proveedor sin reiniciar los datos. Busco el mismo código, reviso la solicitud y confirmo la aceptación. Al volver a la vista del propietario se muestra Aceptada.

En otra solicitud pruebo el rechazo. Sin escribir un motivo no se registra la decisión. Cuando completo la explicación, el propietario puede verla. Cada caso conserva su propio resultado.”

## Diego · Adaptación y enfoque de desarrollo · 3:55 a 4:35

**Mostrar:** Sobre el proyecto > Ver vista de 360 px, y recorrer catálogo y formulario.

“En esta vista, los elementos se organizan según el ancho disponible. Los mismos campos y acciones permiten completar el recorrido desde una pantalla pequeña.

El desarrollo se organizó por incrementos: estructura, presentación, interacción, verificación y publicación. Trabajar por etapas permite revisar lo que ya funciona antes de añadir lo siguiente.

La mejora de PetCare está en hacer visible lo que sucede después del envío. El propietario conoce el siguiente paso y puede distinguir la recepción de su petición de la confirmación del horario.”

## Nicolás · Hosting y cierre · 4:35 a 5:20

**Mostrar:** configuración real de Pages y URL pública. Grabar esta parte después de activar y comprobar la publicación.

“Investigamos GitHub Pages y Cloudflare Pages. Seleccionamos GitHub Pages porque publica archivos HTML, CSS y JavaScript desde el repositorio del proyecto.

Aquí se observa la rama y la carpeta utilizadas para la publicación. Esta es la dirección pública del sitio. Antes de entregar, comprobamos el acceso desde una ventana sin sesión y repetimos el recorrido principal.

El sitio también tiene la página Video del proyecto. Después de subir esta grabación, incorporaremos su URL en configuracion.js y publicaremos el cambio. Finalmente entregaremos dos enlaces: el del sitio y el del video del equipo.

Con PetCare mostramos el paso de un prototipo de interacción a una implementación web adaptable.”

## Después de grabar

Subir el video, configurar videoUrl, publicar el cambio y comprobar la reproducción dentro del sitio. Mantener la frase “comprobamos el acceso” únicamente si el equipo lo hizo. No es necesario grabar el video reproduciéndose dentro de sí mismo.
