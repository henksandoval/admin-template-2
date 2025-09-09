# 📜 Instrucciones para GitHub Copilot en el proyecto

¡Hola, Copilot! 👋

Soy tu guía para contribuir a este repositorio. Sigue estas instrucciones al pie de la letra para generar código que sea consistente, mantenible y que se alinee con la arquitectura del proyecto.

## 🎯 Stack Tecnológico Principal

Al generar código, utiliza exclusivamente las siguientes tecnologías y patrones:

- **Framework**: Angular (v19+) con TypeScript.
- **Estilos**:
- **Tailwind CSS**: Para el 90% de los estilos. Usa clases de utilidad directamente en las plantillas HTML.
- **SCSS**: Úsalo solo para estilos globales, temas (claro/oscuro) o para agrupar utilidades complejas con `@apply` en los archivos `.scss` de los componentes.
- **Componentes UI**: Angular Material para componentes base como iconos (`mat-icon`) y menús (`mat-menu`). Para todo lo demás, crea componentes personalizados.
- **Gestión de Estado y Reactividad**:
- **Signals**: Prefiere el uso de `Signals` para gestionar el estado local dentro de los componentes.
- **RxJS**: Utiliza `RxJS` y `Observables` principalmente para la comunicación con servicios (peticiones HTTP) y flujos de datos asíncronos complejos.
- **Entorno**: El proyecto se ejecuta sobre Node.js (v20+).

## 🏗️ Arquitectura y Estructura de Carpetas (¡MUY IMPORTANTE!)

La regla más importante es respetar la **Arquitectura Híbrida** del proyecto. Antes de crear o modificar un archivo, identifica dónde debe vivir según estas reglas:

### 1. `📂 core/` - El Núcleo Singleton

- **Contenido**: Servicios globales (`AuthService`), interceptores HTTP (`AuthInterceptor`), y guardianes de ruta (`AuthGuard`).
- **Regla**: Solo código que deba existir en una **única instancia** para toda la aplicación. **NUNCA** coloques aquí lógica de negocio específica de una _feature_.

### 2. `📂 features/` - El Corazón del Negocio (Screaming Architecture)

- **Contenido**: Módulos de funcionalidades de negocio (`users`, `products`, `dashboard`, etc.).
- **Regla**: Cada _feature_ es un módulo autocontenido y debe ser cargada con **lazy-loading** en `src/app/app.routes.ts`. Los componentes, servicios y lógica relacionados con una _feature_ específica deben vivir aquí.

### 3. `📂 layout/` - El Cascarón de la App

- **Contenido**: Componentes estructurales de la UI principal como `Header`, `Sidebar` y `Footer`.
- **Regla**: Estos componentes orquestan la navegación y el estado global de la UI. Pueden depender de servicios de `core`. No son reutilizables fuera de este proyecto.

### 4. `📂 shared/` - La Caja de Herramientas Reutilizable (Atomic Design)

- **Contenido**: Componentes, directivas y pipes 100% reutilizables y agnósticos al contexto de negocio.
- **Regla**: Un componente `shared` **NUNCA** debe depender de un servicio de `core/` o `features/`. Recibe toda su información a través de `@Input()` y emite eventos con `@Output()`.

#### Clasificación de Componentes en `shared/components/`

Cuando se te pida crear un componente reutilizable, clasifícalo y colócalo en la subcarpeta correcta:

| Categoría        | Ubicación                      | Concepto                                    | Regla Clave                                                                         | Ejemplos                                                                        |
| :--------------- | :----------------------------- | :------------------------------------------ | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **⚛️ Atoms**     | `shared/components/atoms/`     | Bloques de UI indivisibles.                 | No pueden descomponerse más. No tienen estado.                                      | `app-button`, `app-input`, `app-icon`, `app-label`.                             |
| **🧬 Molecules** | `shared/components/molecules/` | Grupos de átomos para una función concreta. | Orquestan átomos para realizar una tarea.                                           | `app-search-bar` (un `app-input` y un `app-button`), `app-pagination-controls`. |
| **🔬 Organisms** | `shared/components/organisms/` | Secciones de UI complejas y autónomas.      | Compuestos por moléculas y/o átomos. Representan una parte completa de la interfaz. | `app-data-table`, `app-user-form`, `app-wizard`.                                |

---

## ✅ Reglas Generales al Contribuir

1.  **Creación de Componentes**:

- **¿Es reutilizable?** -> Va a `shared/` y sigue las reglas de Atomic Design.
- **¿Es específico de una _feature_?** -> Va dentro de la carpeta de la _feature_ en `features/`.
- **¿Es parte del layout principal?** -> Va a `layout/components/`.

2.  **Estilo de Código**:

- Utiliza el tipado estricto de **TypeScript** en todo momento.
- Sigue las convenciones de estilo de Angular y TypeScript.
- Usa `Prettier` para formatear el código automáticamente.

3**Comandos Útiles**:

- Para ejecutar la app: `ng serve -o`
- Para ejecutar pruebas: `ng test`

Al seguir estas directrices, me ayudarás a generar PRs de alta calidad que el equipo podrá revisar y fusionar rápidamente. ¡Gracias!
