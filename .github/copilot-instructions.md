# 📜 GitHub Copilot Instructions for the Project

Hello, Copilot! 👋

**ALWAYS reference these instructions FIRST and follow them to the letter. Only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.**

I am your guide for contributing to this repository. Follow these instructions to the letter to generate code that is consistent, maintainable, and aligns with the project architecture.

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

## 🎯 Main Technology Stack

When generating code, exclusively use the following technologies and patterns:

- **Framework**: Angular (v19+) with TypeScript.
- **Styling**:
- **Tailwind CSS**: For 90% of styling. Use utility classes directly in HTML templates.
- **SCSS**: Use only for global styles, themes (light/dark), or to group complex utilities with `@apply` in component `.scss` files.
- **UI Components**: Angular Material for base components like icons (`mat-icon`) and menus (`mat-menu`). For everything else, create custom components.
- **State Management and Reactivity**:
- **Signals**: Prefer using `Signals` for managing local state within components.
- **RxJS**: Use `RxJS` and `Observables` primarily for service communication (HTTP requests) and complex asynchronous data flows.
- **Environment**: The project runs on Node.js (v20+).

## 🏗️ Architecture and Folder Structure (VERY IMPORTANT!)

The most important rule is to respect the project's **Hybrid Architecture**. Before creating or modifying a file, identify where it should live according to these rules:

### 1. `📂 core/` - The Singleton Core

- **Content**: Global services (`AuthService`), HTTP interceptors (`AuthInterceptor`), and route guards (`AuthGuard`).
- **Rule**: Only code that should exist in a **single instance** for the entire application. **NEVER** place feature-specific business logic here.

### 2. `📂 features/` - The Business Heart (Screaming Architecture)

- **Content**: Business functionality modules (`users`, `products`, `dashboard`, etc.).
- **Rule**: Each _feature_ is a self-contained module and should be loaded with **lazy-loading** in `src/app/app.routes.ts`. Components, services, and logic related to a specific _feature_ should live here.

### 3. `📂 layout/` - The App Shell

- **Content**: Main UI structural components like `Header`, `Sidebar`, and `Footer`.
- **Rule**: These components orchestrate navigation and global UI state. They can depend on `core` services. They are not reusable outside this project.

### 4. `📂 shared/` - The Reusable Toolbox (Atomic Design)

- **Content**: 100% reusable components, directives, and pipes that are agnostic to business context.
- **Rule**: A `shared` component should **NEVER** depend on a `core/` or `features/` service. It receives all information through `@Input()` and emits events with `@Output()`.

#### Component Classification in `shared/components/`

When asked to create a reusable component, classify it and place it in the correct subfolder:

| Category         | Location                       | Concept                                     | Key Rule                                                                            | Examples                                                                        |
| :--------------- | :----------------------------- | :------------------------------------------ | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **⚛️ Atoms**     | `shared/components/atoms/`     | Indivisible UI blocks.                      | Cannot be decomposed further. Have no state.                                       | `app-button`, `app-input`, `app-icon`, `app-label`.                             |
| **🧬 Molecules** | `shared/components/molecules/` | Groups of atoms for a specific function.   | Orchestrate atoms to perform a task.                                               | `app-search-bar` (an `app-input` and an `app-button`), `app-pagination-controls`. |
| **🔬 Organisms** | `shared/components/organisms/` | Complex and autonomous UI sections.         | Composed of molecules and/or atoms. Represent a complete part of the interface.     | `app-data-table`, `app-user-form`, `app-wizard`.                                |

---

## ✅ General Contribution Rules

1.  **Component Creation**:

- **Is it reusable?** -> Goes to `shared/` and follows Atomic Design rules.
- **Is it feature-specific?** -> Goes within the _feature_ folder in `features/`.
- **Is it part of the main layout?** -> Goes to `layout/components/`.

2.  **Code Style**:

- Use strict **TypeScript** typing at all times.
- Follow Angular and TypeScript style conventions.
- Use `Prettier` to automatically format code.

3.  **Useful Commands and Validations**:

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

By following these guidelines, you will help me generate high-quality PRs that the team can review and merge quickly. Thank you!

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
