# Verificación técnica de PetCare

**Versión de repositorio preparada el 27 de noviembre de 2026.**

## Comprobaciones realizadas para esta versión

- Compilación sintáctica de modelo.js, configuracion.js, app.js y modelo.test.cjs: sin errores.
- Las 22 páginas HTML tienen sus destinos y recursos locales referenciados disponibles en el conjunto preparado.
- No se detectaron identificadores HTML duplicados en las páginas estáticas.
- 19 comprobaciones del modelo de datos ejecutadas en un motor JavaScript: aprobadas.

Las pruebas del modelo verifican:

1. Estado inicial válido.
2. Nuevo código y estado Pendiente.
3. Conservación del estado anterior.
4. Varios envíos sin reemplazar el historial.
5. Bloqueo de fecha pasada.
6. Bloqueo de fecha imposible, como 30 de febrero.
7. Bloqueo de hora inválida.
8. Bloqueo de nombre de mascota vacío.
9. Bloqueo de especie incompatible.
10. Motivo obligatorio de rechazo.
11. Actualización únicamente de la solicitud seleccionada.
12. Protección de la decisión definitiva.
13. Conservación del motivo de rechazo.
14. Historial conservado al desactivar un servicio.
15. Bloqueo de nuevas solicitudes al servicio inactivo.
16. Reactivación que vuelve a permitir solicitudes.
17. Edición del servicio sin modificar la ficha histórica de una solicitud.
18. Bloqueo de precio negativo.
19. Validación básica del estado guardado.

El archivo de pruebas incluye tres casos adicionales del análisis de URL de YouTube. El motor utilizado no expone la clase URL y esos tres casos no se ejecutaron. En Node.js se incluyen al ejecutar:

```bash
node pruebas/modelo.test.cjs
```

## Lo que sigue pendiente

Esta versión separa el modelo y la presentación. Las pruebas de navegador realizadas en la primera versión local no certifican esta revisión del código. Antes de entregar debe completarse la comprobación de la versión publicada:

| Comprobación | Estado |
| --- | --- |
| Recorrido completo de propietario y proveedor | Pendiente en esta revisión |
| Validación de registro y campos del formulario en la interfaz | Pendiente en esta revisión |
| Vista de 360 px, móvil real y navegación con teclado | Pendiente en esta revisión |
| Carga de CSS, fuente y JavaScript desde GitHub Pages | Pendiente de publicación |
| Reproducción del video integrado | Pendiente de grabación y URL |
| Acceso desde incógnito sin permisos | Pendiente de publicación |

Las comprobaciones de sintaxis y del modelo no certifican la presentación, la accesibilidad completa, el hosting ni la reproducción de un video. Tampoco representan nuevas pruebas de usabilidad con participantes reales.

## Primera versión local

El 26 de noviembre se recorrieron en Chrome el registro, el bloqueo de fecha pasada, un envío nuevo, la aceptación, el rechazo con motivo, la recarga y la gestión de servicios. Se completó otro envío dentro de una vista de 360 px; el ancho de contenido observado fue de 360 px. Estos resultados se conservan como antecedentes de desarrollo, no como validación de los archivos actuales.
