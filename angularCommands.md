# Angular CLI Cheat Sheet

---

## Install & Setup

```bash
npm install -g @angular/cli   # Install Angular CLI globally
ng version                    # Check CLI and Angular version
ng help                       # List all available commands
ng new --help                 # See all flags for a specific command
```

---

## Create a New Project

```bash
ng new my-app                                                         # Standalone app (default Angular 17+)
ng new my-app --no-standalone --routing --style=scss                  # Legacy NgModule app
ng new my-app --no-standalone --routing --style=scss --skip-tests     # Legacy, no test files
```

| Flag | Description |
|---|---|
| `--standalone` | Standalone components, no NgModules (default Angular 17+) |
| `--no-standalone` | Legacy NgModule structure (generates `app.module.ts`) |
| `--routing` | Generate an `app-routing.module.ts` |
| `--style=scss` | Stylesheet format: `css` \| `scss` \| `sass` \| `less` |
| `--skip-tests` | Skip `.spec.ts` test files |
| `--prefix=myapp` | Change selector prefix from `app` to custom value |
| `--dry-run` | Preview what would be generated without writing files |

---

## Serve / Run

```bash
ng serve                               # Serve at http://localhost:4200
ng serve --open                        # Serve and open browser automatically
ng serve --port 4300                   # Serve on a different port
ng serve --host 0.0.0.0               # Expose to local network
ng serve --configuration production    # Serve with production config
```

---

## Generate Schematics

### Components
```bash
ng generate component my-component          # Full command
ng g c my-component                         # Shorthand
ng g c components/my-component             # Inside a subfolder
ng g c my-component --skip-tests           # No spec file
ng g c my-component --flat                 # No subfolder created
ng g c my-component --standalone           # Standalone component
ng g c my-component --inline-template      # Template inside .ts file
ng g c my-component --inline-style        # Styles inside .ts file
```

### Services
```bash
ng g s services/my-service
ng g s services/my-service --skip-tests
```

### Modules
```bash
ng g m my-module
ng g m my-module --routing                              # Module with its own routing file
ng g m my-module --route my-route --module app         # Lazy-loaded route module
```

### Pipes
```bash
ng g p pipes/my-pipe
ng g p pipes/my-pipe --skip-tests
```

### Directives
```bash
ng g d directives/my-directive
ng g d directives/my-directive --skip-tests
```

### Guards
```bash
ng g g guards/my-guard                    # Prompts for guard type
ng g g guards/my-guard --functional       # Functional guard (Angular 15+)
```

### Interceptors
```bash
ng g interceptor interceptors/my-interceptor
ng g interceptor interceptors/my-interceptor --functional    # Functional (Angular 15+)
```

### Other
```bash
ng g class models/my-model
ng g interface models/my-interface
ng g enum models/my-enum
ng g resolver resolvers/my-resolver
ng g environments
```

### Common Generate Flags
| Flag | Description |
|---|---|
| `--skip-tests` | Skip `.spec.ts` |
| `--flat` | Don't create a subfolder |
| `--module=app` | Declare in a specific module |
| `--standalone` | Generate as standalone |
| `--dry-run` | Preview without writing files |
| `--project=my-app` | Target a specific project (monorepo) |

---

## Build

```bash
ng build                                   # Dev build (outputs to /dist)
ng build --configuration production        # Production build (optimized, minified)
ng build --watch                           # Rebuild on file changes
ng build --stats-json                      # Output bundle stats
```

> Production builds include tree shaking, minification, AOT compilation, and dead code elimination.

---

## Test

```bash
ng test                                    # Run with Karma/Jasmine (watch mode)
ng test --no-watch                         # Run once and exit
ng test --code-coverage                    # Generate coverage report in /coverage
ng test --include="**/my.spec.ts"         # Run a specific test file
```

---

## Lint

```bash
ng lint          # Lint the project
ng lint --fix    # Auto-fix lint issues
```

---

## Update

```bash
ng update                                  # Check for available updates
ng update @angular/cli @angular/core       # Update Angular CLI and core
ng update @angular/material                # Update Angular Material
```

---

## Add Packages

```bash
ng add @angular/material      # Angular Material (with automatic setup)
ng add @angular/pwa           # PWA support
ng add @ngrx/store            # NgRx state management
ng add @angular/elements      # Angular Elements
```

---

## Miscellaneous

```bash
ng doc ComponentRef           # Open Angular docs for a specific API symbol
ng config                     # Read/write angular.json config values
ng analytics off              # Disable CLI usage analytics
ng cache clean                # Clear the Angular CLI cache
ng cache disable              # Disable caching
```

---

## Testing Stack (Angular Default)

| Tool | Role |
|---|---|
| **Jasmine** | Testing framework: `describe()`, `it()`, `expect()`, `beforeEach()` |
| **Karma** | Test runner: launches a browser and runs Jasmine tests |
| **TestBed** | Angular utility: bootstraps a mini Angular environment for tests |

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
```

---

## Project File Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts          # Root component
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts             # App config (standalone apps)
│   │   ├── app.routes.ts             # Routes (standalone apps)
│   │   ├── app.module.ts             # Root module (NgModule apps)
│   │   └── app-routing.module.ts     # Routing module (NgModule apps)
│   ├── main.ts                       # Entry point
│   ├── index.html
│   └── styles.scss                   # Global styles
├── angular.json                      # CLI configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json
```