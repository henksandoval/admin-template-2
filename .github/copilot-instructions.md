# 📜 Instrucciones para GitHub Copilot en el proyecto

¡Hola, Copilot! 👋

**ALWAYS reference these instructions FIRST and follow them to the letter. Only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.**

Soy tu guía para contribuir a este repositorio. Sigue estas instrucciones al pie de la letra para generar código que sea consistente, mantenible y que se alinee con la arquitectura del proyecto.

## 🚀 Quick Start - Build & Run Instructions

### Prerequisites
- Node.js v20+ (project tested on v20.19.5)
- npm v10+ (project tested on v10.8.2)

### Bootstrap the Repository
Execute these commands in order. **NEVER CANCEL any build or long-running command** - wait for completion:

```bash
# 1. Install dependencies (takes ~75 seconds, NEVER CANCEL)
npm install
# Timeout: Set 3+ minutes. Expected warnings about deprecated packages are normal.

# 2. Development build (takes ~10 seconds, NEVER CANCEL)  
npx ng build --configuration=development
# Timeout: Set 2+ minutes. Use development config to avoid Google Fonts access issues.

# 3. Run development server (takes ~10 seconds to build, NEVER CANCEL)
npm start
# Timeout: Set 2+ minutes. Server runs on http://localhost:4200/
# Build warnings about duplicate Material theme styles are normal and expected.
```

### Production Build Limitation
⚠️ **CRITICAL**: Production builds (`npm run build`) currently fail due to Google Fonts inlining restrictions in sandboxed environments. Always use development builds:
```bash
# This WILL FAIL in restricted environments
npm run build  # ❌ Fails: getaddrinfo ENOTFOUND fonts.googleapis.com

# Use this instead  
npx ng build --configuration=development  # ✅ Works
```

### Testing
- **No test files exist** in the project yet (`find src -name "*.spec.ts"` returns empty)
- Running `npm run test` will fail with "No inputs were found in config file"
- Tests are configured for Karma + Jasmine but no test files have been created

### Validation Scenarios
After making changes, always manually validate by:
1. **Build validation**: Run `npx ng build --configuration=development` - must complete without errors
2. **Development server**: Run `npm start` and verify app loads at http://localhost:4200/
3. **Navigation testing**: Test the main dashboard and navigate to Components Showcase and PDS sections
4. **Theme switching**: Test light/dark mode toggle in the header
5. **Responsive design**: Verify sidebar collapse/expand functionality

### Common File Locations
```
📁 src/app/
├── 📂 core/           # Singleton services (AuthService, AuthGuard, etc.)
├── 📂 features/       # Business features (dashboard, pds, showcase)  
├── 📂 layout/         # UI shell components (Header, Sidebar, Footer)
├── 📂 shared/         # Reusable components (atoms, molecules, organisms)
└── 📂 themes/         # SCSS theme files and Material Design setup
```

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

3.  **Comandos Útiles y Validaciones**:

#### Build & Development Commands
```bash
# Development server with auto-reload
npm start                                    # ✅ Works (10s build + serve)
# Alternative: npm run start

# Development build only  
npx ng build --configuration=development    # ✅ Works (10s, 2.7MB output)

# Production build - AVOID in restricted environments
npm run build                               # ❌ Fails (Google Fonts access)

# Watch build during development
npm run watch                               # ✅ Works (continuous rebuild)
```

#### Validation Commands (run these before committing)
```bash
# 1. Verify clean build
npx ng build --configuration=development

# 2. Check TypeScript compilation
npx tsc --noEmit

# 3. Verify no Angular-specific errors
npx ng build --configuration=development 2>&1 | grep -i error || echo "No build errors"
```

#### Project Analysis Commands
```bash
# Check bundle size after build
du -sh dist/                               # ~8.7MB for development build

# View route structure  
cat src/app/app.routes.ts                  # Lazy-loaded features configuration

# Check available npm scripts
npm run                                    # Shows: start, build, watch, test

# Verify path aliases (should show @core, @shared, @layout, @env)
grep -A 10 "paths" tsconfig.json
```

Al seguir estas directrices, me ayudarás a generar PRs de alta calidad que el equipo podrá revisar y fusionar rápidamente. ¡Gracias!

---

## 🔧 Advanced Development Information

### Build Times & Expectations
- **npm install**: ~75 seconds (warnings about deprecated packages are normal)
- **Development build**: ~10 seconds (produces ~2.7MB output in dist/)
- **Development server startup**: ~10 seconds (includes initial build)
- **Hot reload after changes**: ~2-5 seconds (HMR is enabled)

### Known Issues & Workarounds
1. **Google Fonts Access**: Production builds fail due to fonts.googleapis.com restrictions
   - **Solution**: Always use `--configuration=development` for builds
   
2. **Material Theme Warnings**: Build shows duplicate theme style warnings
   - **Status**: Expected and safe to ignore - does not affect functionality

3. **No Tests**: Project has testing infrastructure but no test files yet
   - **Action**: Skip test running until test files are created

### Project-Specific TypeScript Paths
The project uses path aliases configured in `tsconfig.json`:
```typescript
"@core/*": ["src/app/core/*"]        // Core singleton services
"@shared/*": ["src/app/shared/*"]    // Reusable components  
"@layout/*": ["src/app/layout/*"]    // Layout shell components
"@env/*": ["src/environments/*"]     // Environment configuration
```

### Features & Lazy Loading
Current feature modules (all lazy-loaded):
- **Dashboard** (`/dashboard`) - Main dashboard with metrics cards
- **Showcase** (`/showcase`) - Component showcase with forms demo  
- **PDS** (`/pds`) - Design system components showcase

### Theme System
- **Light/Dark themes** configured in `src/themes/`
- **Material Design 3** with custom JobMagnetic branding
- **Tailwind CSS** for utility classes (90% of styling)
- **Custom fonts**: Plus Jakarta Sans, Inter, Poppins, JetBrains Mono (loaded from Google Fonts)

### Validation Checklist for Changes
Always verify after making changes:
- [ ] `npx ng build --configuration=development` completes successfully
- [ ] `npm start` serves application without errors  
- [ ] Navigate to http://localhost:4200/ and verify dashboard loads
- [ ] Test sidebar navigation (Dashboard, Components Showcase, PDS)
- [ ] Test theme toggle button (light/dark mode switch)
- [ ] Verify responsive behavior (sidebar collapse on mobile)
- [ ] Check browser console for runtime errors
