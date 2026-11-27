# PetCare

Implementación académica para la **Actividad 4 de Diseño de Aplicaciones Web**.

**Equipo:** Diego Alejandro Parra Cespedes y Nicolás Chesini Martin.

PetCare permite consultar servicios para mascotas, proponer un horario y conocer la respuesta del proveedor. Un envío crea una solicitud **Pendiente**; la cita solo se considera aceptada después de la decisión del proveedor.

## Estado de esta versión

- Código de la interfaz preparado en `docs/` para un hosting estático.
- Reglas de datos verificadas: 19 comprobaciones aprobadas en un motor JavaScript.
- Verificación final de esta versión en navegador, publicación pública y video: pendientes.
- Acceso y registro simulados. No hay usuarios reales, base de datos compartida, pagos ni reservas reales.

## Abrir y publicar

Para probar localmente, abre `docs` en Visual Studio Code y utiliza Live Server sobre `index.html`. El sitio no necesita Node.js ni un proceso de compilación.

Antes de publicar, crea la rama **actividad-4-web** desde `main` y sube el contenido de este paquete a su raíz, conservando las carpetas `docs/`, `documentacion/` y `pruebas/`. La rama todavía no se ha creado en GitHub: la conexión permitió leer el repositorio público, pero rechazó la escritura.

Después: Settings > Pages > Deploy from a branch > rama **actividad-4-web** > carpeta **/docs** > Save. La rama puede publicarse sin fusionarla con `main`. Copia la URL que GitHub muestre al terminar; no confundas esa URL con la del repositorio.

## Documentación del equipo

- [Guía de entrega y publicación](documentacion/Guia_Actividad4.md)
- [Guion del video dividido entre Diego y Nicolás](documentacion/Guion_video.md)
- [Verificaciones y pruebas pendientes](documentacion/Verificacion.md)
- [Planificación original conservada](documentacion/Planificacion_original.md)

## Estructura

| Archivo | Responsabilidad |
| --- | --- |
| `docs/index.html` y las demás páginas | Entrada, estructura común y destinos de cada recorrido. |
| `docs/styles.css` | Presentación, tipografía y adaptación móvil. |
| `docs/modelo.js` | Validaciones, solicitudes, decisiones y servicios. |
| `docs/app.js` | Presentación de los datos y eventos de la interfaz. |
| `docs/configuracion.js` | Integrantes y URL del video. |
| `pruebas/modelo.test.cjs` | Casos del modelo; se ejecutan con Node.js sin dependencias. |

Los ejemplos se conservan con `localStorage` en el navegador. No se almacenan correos ni contraseñas. Los datos de navegadores diferentes no se sincronizan. Cambiar de perfil conserva la demostración; Sobre el proyecto > Restablecer ejemplos la reinicia.

La fuente Inter se solicita a Google Fonts; si no carga, se utiliza una fuente del sistema. No se usan fotografías ni textos de plantillas.

## Video pendiente

Cuando el equipo publique la grabación, debe pegar su URL en `videoUrl` dentro de `docs/configuracion.js` y publicar ese cambio. La página `demostracion.html` mostrará el reproductor. Hasta entonces, indica expresamente que el video está pendiente.

## Pruebas del modelo

Opcional para desarrollo, con Node.js instalado:

```bash
node pruebas/modelo.test.cjs
```

Este comando no inicia un servidor. Las pruebas de lógica no sustituyen las pruebas de navegador ni la comprobación de la web publicada.
