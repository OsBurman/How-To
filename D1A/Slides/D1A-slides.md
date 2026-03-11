# Day 1 Part A — What is Angular & Getting Started

## Slide Deck

---

## Slide 1: Day 1 Part A — What is Angular & Getting Started

Welcome to the first session of this 5-day Angular course.

**Today's topic:** Understanding what Angular is, setting up your development environment, creating your first project, and building your first standalone components.

By the end of this section, you will have a running Angular application with multiple components rendered on screen — built entirely from scratch using the Angular CLI.

---

## Slide 2: What You'll Be Able to Do

By the end of this section, you will be able to:

- **Explain** what Angular is, why it exists, and how it differs from vanilla JavaScript
- **Install** the Angular CLI and **create** a new project using `ng new`
- **Navigate** the generated file structure and understand what each file does
- **Build** standalone components with the `@Component` decorator, `templateUrl`, and `styleUrl`
- **Fix** the "not a known element" error by managing the `imports` array
- **Use** Angular CLI commands to serve, generate, build, and test your application

---

## Slide 3: What Is Angular?

Angular is a **component-based framework** for building web applications. It is maintained by Google and has been in active development since 2016.

A framework means Angular is not just one tool — it is a complete platform. When you start an Angular project, you get a built-in solution for structuring your UI, handling user interaction, fetching data from servers, navigating between pages, and testing your code. You do not need to find and install separate libraries for each of those tasks.

Angular applications are built from **components** — self-contained pieces of UI that each own their own HTML template, CSS styles, and TypeScript logic. You compose an application by nesting components inside each other, like building blocks.

---

## Slide 4: Why Angular Exists

Before frameworks like Angular, developers built web applications by writing vanilla JavaScript that directly manipulated the DOM — the browser's internal representation of the HTML on the page.

The problems with vanilla JS DOM manipulation at scale:

- **No structure** — as an app grows, vanilla JS code becomes a tangled mix of event listeners, DOM queries, and state management scattered across files with no enforced organization
- **Manual DOM updates** — every time data changes, you must manually find the right elements and update their text, attributes, or visibility — and if you forget one, the UI falls out of sync with the data
- **No reusability** — there is no built-in way to create a reusable piece of UI with its own logic and styles; you end up copying and pasting HTML and JS
- **Scaling pain** — a 10-page app might be manageable, but a 100-page app with dozens of developers becomes nearly impossible to maintain without conventions and tooling

Angular solves all of these problems by providing a structured, opinionated way to build applications where the framework handles DOM updates, enforces component-based architecture, and includes tooling for every common need.

---

## Slide 5: Framework vs Library

A **library** gives you one tool and lets you decide how to use it. A **framework** gives you an entire workshop with tools, workbenches, and a blueprint for how to build.

Angular is a framework. When you install Angular, you get all of the following out of the box — no extra installation needed:

- **Component system** — build your UI from reusable, self-contained pieces
- **Routing** — navigate between pages in a single-page application
- **Forms** — handle user input with validation, error messages, and data binding
- **HTTP client** — fetch data from APIs and send data to servers
- **Dependency injection** — share services and logic across components without tight coupling
- **Testing utilities** — unit test and integration test your components and services

Compare this to a library like React, which provides only the component layer — you must choose and install your own router, form library, HTTP client, and state management. Angular makes those choices for you so you can focus on building features.

---

## Slide 6: Prerequisites — Node.js and npm

Before you can use Angular, you need **Node.js** and **npm** installed on your machine.

**Node.js** is a JavaScript runtime that lets you run JavaScript outside of a browser. Angular's development tools — the CLI, the compiler, the dev server — all run on Node.js.

**npm** (Node Package Manager) is the tool that installs JavaScript packages from the npm registry. It comes bundled with Node.js. Angular itself and all of its dependencies are npm packages.

To verify you have both installed, open a terminal and run:

```
node -v
```

You should see a version number like `v20.11.0`. Any LTS version 18 or higher works.

```
npm -v
```

You should see a version number like `10.2.4`.

If either command is not recognized, download and install Node.js from [nodejs.org](https://nodejs.org). Choose the **LTS** (Long Term Support) version. npm is included automatically.

---

## Slide 7: Installing the Angular CLI

The **Angular CLI** (Command Line Interface) is a command-line tool that creates projects, generates components, runs the dev server, builds for production, and runs tests. It is the primary tool you will use every day when working with Angular.

Install the CLI globally so you can use it from any directory:

```
npm install -g @angular/cli
```

The `-g` flag means "global" — it installs the CLI as a system-wide command, not just in one project.

After installation, verify it worked:

```
ng version
```

This prints the Angular CLI version, the Node.js version, and the operating system. If you see output with version numbers, the CLI is ready to use.

The `ng` command is the CLI's entry point. Every Angular CLI command starts with `ng` followed by a verb: `ng new`, `ng serve`, `ng generate`, `ng build`, `ng test`.

---

## Slide 8: Creating a New Project with ng new

To create a new Angular project, run:

```
ng new my-first-app
```

The CLI will ask you several prompts:

- **Which stylesheet format would you like to use?** — Choose CSS for this course. Other options include SCSS, Sass, and Less. CSS keeps things simple while you're learning.
- **Do you want to enable Server-Side Rendering (SSR)?** — Choose **No** for now. SSR is an advanced deployment topic.

After you answer the prompts, the CLI creates a full project folder, generates all configuration and source files, and runs `npm install` to download all dependencies. This takes a minute or two.

Once complete, move into the project folder:

```
cd my-first-app
```

You now have a complete, runnable Angular application.

**Note:** `ng new` also initializes a **Git repository** in the project folder and creates an initial commit with all generated files. You do not need to run `git init` yourself — it is already done.

---

## Slide 9: What ng new Generates

When `ng new` finishes, it creates a project folder with this structure:

```
my-first-app/
├── node_modules/        ← all installed npm packages (do not edit)
├── src/                 ← your application source code lives here
│   ├── app/             ← your components, services, and application logic
│   ├── index.html       ← the single HTML page
│   ├── main.ts          ← the entry point that boots Angular
│   └── styles.css       ← global styles applied to the entire app
├── angular.json         ← Angular CLI workspace configuration
├── package.json         ← project dependencies and npm scripts
├── tsconfig.json        ← base TypeScript compiler settings
└── tsconfig.app.json    ← app-specific TypeScript settings (extends base)
```

Key takeaway: Angular is a **single-page application** framework. There is only one HTML file — `index.html`. Angular takes over that page and dynamically renders components inside it. When you "navigate" to different pages, Angular swaps out components without reloading the browser.

---

## Slide 10: Root Config Files

Three configuration files sit at the root of every Angular project. You rarely edit them directly, but understanding what they control helps you troubleshoot problems.

**package.json** — Lists every npm package your project depends on and defines scripts you can run. The most important scripts are:
- `npm start` → runs `ng serve` (starts the dev server)
- `npm run build` → runs `ng build` (creates a production bundle)
- `npm test` → runs `ng test` (runs unit tests)

**tsconfig.json** — Base TypeScript compiler settings for the entire project. This controls how TypeScript code is compiled to JavaScript: strict type checking, module resolution, target JavaScript version, and more. The setting `"strict": true` is enabled by default — this catches bugs at compile time.

**angular.json** — The Angular CLI workspace configuration. It tells the CLI where your source code lives, what to include in builds, which stylesheets to load globally, and how to configure the dev server. If you ever need to add a global CSS file or change the build output folder, this is where you do it.

---

## Slide 11: The src/ Folder

The `src/` folder contains everything that makes up your actual application.

**index.html** — The single HTML page. It contains a `<body>` with one special tag: `<app-root></app-root>`. This is where Angular will render your root component. You almost never edit this file directly — Angular components generate all the visible HTML.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyFirstApp</title>
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

**main.ts** — The TypeScript entry point. This is the first file that runs when your application starts. It calls `bootstrapApplication()` to launch Angular with your root component.

**styles.css** — Global styles that apply to every component in the application. Styles you write here are not scoped to any one component — they affect the entire page. Use this for base resets, fonts, and layout rules that should be universal.

---

## Slide 12: The src/app/ Folder

The `src/app/` folder is where you spend most of your time. This is where all your components, services, and application logic live.

Out of the box, `ng new` generates:

- **app.component.ts** — The root component's TypeScript class and `@Component` decorator. This is the component that `<app-root>` in `index.html` renders.
- **app.component.html** — The root component's HTML template.
- **app.component.css** — The root component's scoped styles.
- **app.config.ts** — Application-wide configuration: the `providers` array where you register services, the router, and the HTTP client (you will fill this in on Days 3–4).

As you build your app, you will create **subfolders** inside `src/app/` for each new component. For example, a `HeaderComponent` lives in `src/app/header/` with its own `.ts`, `.html`, and `.css` files. This keeps every component's files together and makes the project easy to navigate.

---

## Slide 13: What main.ts Does

`main.ts` is the very first file that executes when your Angular application starts. Its job is simple: tell Angular which component to render and what configuration to use.

Here is what a standard `main.ts` looks like:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```

This file does three things:

1. Imports the `bootstrapApplication` function from Angular's platform-browser package
2. Imports your root component (`AppComponent`) and your app configuration (`appConfig`)
3. Calls `bootstrapApplication()` with those two arguments to launch the application

When the browser loads `index.html`, Angular's bundler executes `main.ts`, which calls `bootstrapApplication()`. Angular then finds the `<app-root>` tag in `index.html`, creates an instance of `AppComponent`, and renders its template inside that tag.

---

## Slide 14: bootstrapApplication() — The Two Arguments

`bootstrapApplication()` accepts exactly two arguments:

**Argument 1: The root component** — This is the top-level component that Angular renders first. It is almost always `AppComponent`. Every other component in your application is a child (or grandchild, or great-grandchild) of this root component.

**Argument 2: The application config** — This is an object containing a `providers` array. Providers are application-wide services and features that Angular makes available everywhere. Right now this array is empty or nearly empty. On Day 3 you will add `provideRouter(routes)` for navigation, and `provideHttpClient()` for API calls.

```typescript
bootstrapApplication(AppComponent, appConfig);
```

This is the **modern** way to start an Angular application. It replaced the older `bootstrapModule(AppModule)` approach, which required a separate NgModule class just to get the app running. The modern approach is simpler — one function call, two arguments, done.

---

## Slide 15: app.config.ts — The Providers Array

`app.config.ts` is where you configure application-wide features. It exports an `ApplicationConfig` object with a `providers` array.

```typescript
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // Nothing here yet — we add providers on Days 3–4
  ]
};
```

Right now the `providers` array is empty. As the course progresses, you will add:

- **Day 3:** `provideHttpClient()` — enables the HTTP client for API calls
- **Day 4:** `provideRouter(routes)` — enables client-side routing between pages

Think of `providers` as the list of "batteries" you plug into your app. Angular includes many features, but you only activate the ones you need. This keeps your application lean — you never ship code for features you do not use.

---

## Slide 16: How Angular Starts Up — The Full Picture

Now that you have seen each file individually, here is how they all connect when your Angular application starts:

```
Browser loads index.html
        ↓
index.html contains <app-root></app-root>
        ↓
Angular's bundler executes main.ts
        ↓
main.ts calls bootstrapApplication(AppComponent, appConfig)
        ↓
appConfig (from app.config.ts) provides app-wide services
        ↓
Angular creates an instance of AppComponent
        ↓
AppComponent's template renders inside <app-root>
        ↓
You see your app in the browser
```

**The key insight:** `index.html` is the shell, `main.ts` is the ignition, `app.config.ts` is the settings, and `AppComponent` is the first thing that actually appears on screen. Every Angular app follows this exact startup sequence. When something goes wrong at launch, trace through these four files in order — the problem is always in one of them.

---

## Slide 17: The @Component Decorator

Every Angular component is a TypeScript class with a **decorator** on top: `@Component()`. The decorator is what turns a plain class into an Angular component.

A decorator is a special function prefixed with `@` that attaches metadata to a class. When Angular sees `@Component()`, it knows this class is a component and reads the metadata inside to understand how to create, render, and manage it.

Without the `@Component()` decorator, your class is just a regular TypeScript class — Angular has no idea it exists and will never render it.

```typescript
@Component({
  // metadata goes here — tells Angular everything
  // about this component
})
export class HeaderComponent {
  // class body — properties and methods
}
```

The decorator always goes directly above the `export class` line. The metadata is an object passed as an argument to `@Component()`.

---

## Slide 18: Component Metadata — selector

The `selector` tells Angular what HTML tag to use when rendering this component in a template. It works exactly like an HTML element name.

```typescript
@Component({
  selector: 'app-header',
  // ...other metadata
})
export class HeaderComponent { }
```

With this selector, you render the component in any parent template by writing:

```html
<app-header></app-header>
```

**Convention:** Always prefix your selectors with `app-` (or your project's prefix). This prevents conflicts with native HTML elements and third-party libraries. `app-header` is clearly your component. `header` could be confused with the native `<header>` element.

---

## Slide 19: Component Metadata — standalone, imports, templateUrl, styleUrl

The remaining metadata properties:

```typescript
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ChildComponent, SomePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent { }
```

- **standalone: true** — This component manages its own dependencies. It does not need to be registered in an NgModule. Every component in this course uses `standalone: true`.
- **imports: [...]** — Lists every component, directive, and pipe this template uses. If your template contains `<app-child>`, you must import `ChildComponent` here.
- **templateUrl** — Points to the external HTML file that contains this component's template markup. We always use a separate file — never inline templates.
- **styleUrl** — Points to the external CSS file that contains this component's scoped styles. We always use a separate file — never inline styles.

---

## Slide 20: What standalone: true Means

`standalone: true` means the component is **self-contained**. It declares its own dependencies in its own `imports` array, without needing a central NgModule to register it.

Before standalone components existed (Angular 14 and earlier), every component had to be listed in an NgModule's `declarations` array. If you forgot to add a component there, it would not work. If two NgModules both tried to declare the same component, you would get an error.

With `standalone: true`:

- The component imports what it needs directly — no middleman
- You can use the component anywhere by importing it into another component's `imports` array
- There is no NgModule to manage, no declarations array to maintain
- Each component is a self-contained unit you can move, reuse, or delete independently

This is the modern Angular pattern. All components in this course use `standalone: true`. You will see the legacy NgModule pattern in the contrast slides at the end of this section.

---

## Slide 21: The Component Class

Below the decorator is the component class itself. This is where you define the data and behavior for your component.

```typescript
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Properties — data the template can display
  title = 'My Application';
  year = new Date().getFullYear();

  // Methods — behavior the template can trigger
  onLogoClick(): void {
    console.log('Logo clicked!');
  }
}
```

- **Properties** become available in the template through **data binding** — you can display `title` using `{{ title }}` in the HTML
- **Methods** can be called from the template through **event binding** — you can wire `onLogoClick()` to a button's click event
- The class is just a regular TypeScript class — you can use typed properties, access modifiers, and all standard TypeScript features

---

## Slide 22: What the imports Array Does

The `imports` array on a standalone component tells Angular which other components, directives, and pipes this component's template is allowed to use.

Think of it as a **whitelist**. If a component, directive, or pipe is not listed in `imports`, the template cannot use it — Angular will throw an error.

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
```

In this example, `AppComponent`'s template can use `<app-header>` and `<app-footer>` because both are listed in `imports`. If the template tried to use `<app-sidebar>`, Angular would throw an error because `SidebarComponent` is not imported.

---

## Slide 23: Adding and Removing from imports

When you add a new child component to a template, you must do two things:

**Step 1:** Import the class at the top of the file.

```typescript
import { HeaderComponent } from './header/header.component';
```

**Step 2:** Add the class name to the `imports` array in `@Component()`.

```typescript
imports: [HeaderComponent]
```

If you do Step 1 but forget Step 2, Angular cannot find the component in the template and throws the "not a known element" error. If you do Step 2 but forget Step 1, TypeScript itself will show a compile error because the class name is undefined.

When you **remove** a component from the template, remove it from both places — the `import` statement at the top and the `imports` array. Leaving unused imports is not harmful but creates clutter.

---

## Slide 24: ⚠️ The "Not a Known Element" Error

This is the single most common error beginners encounter in Angular. You will see it many times during this course, and now you know exactly what it means and how to fix it.

When Angular encounters a tag in your template that it does not recognize, it shows an error like this in the browser console:

```
'app-header' is not a known element:
1. If 'app-header' is an Angular component, then verify that it is
   included in the '@Component.imports' of this component.
2. If 'app-header' is a Web Component, then add 'CUSTOM_ELEMENTS_SCHEMA'
   to the '@Component.schemas' of this component.
```

Ignore option 2 — you are not using Web Components. The answer is almost always option 1.

---

## Slide 25: ⚠️ Fixing the "Not a Known Element" Error

**Why it happens:** You used a component tag like `<app-header>` in your template, but the `HeaderComponent` class is not listed in this component's `imports` array.

**The two-second fix:**

1. Add the `import` statement at the top of the TypeScript file:

```typescript
import { HeaderComponent } from './header/header.component';
```

2. Add `HeaderComponent` to the `imports` array in the `@Component` decorator:

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],  // ← add it here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
```

Save both changes. The error disappears. Every time you see "not a known element," check the `imports` array first — it is the cause 99% of the time.

---

## Slide 26: ng serve — Starting the Dev Server

`ng serve` compiles your application and starts a local development server so you can see your app in the browser.

```
ng serve
```

After a few seconds of compilation, you will see output like:

```
** Angular Live Development Server is listening on localhost:4200 **
```

Open your browser to `http://localhost:4200` and you will see your running Angular application.

**Live reload:** While `ng serve` is running, every time you save a file, Angular automatically recompiles and refreshes the browser. You do not need to manually reload — just save and look at the browser.

To stop the dev server, press `Ctrl+C` in the terminal.

You can also specify a different port if 4200 is already in use:

```
ng serve --port 4300
```

---

## Slide 27: ng generate component — Creating Components

The CLI can generate new components for you with a single command:

```
ng generate component header
```

Or use the shorthand:

```
ng g c header
```

This creates four files inside a new `src/app/header/` folder:

```
src/app/header/
├── header.component.ts      ← the component class and decorator
├── header.component.html    ← the component's template
├── header.component.css     ← the component's scoped styles
└── header.component.spec.ts ← a starter unit test file
```

The generated component already has `standalone: true` set, the correct selector (`app-header`), and the `templateUrl` and `styleUrl` pointing to the companion files. You can start writing your template and logic immediately.

**Important:** After generating a component, you still need to import it into the parent component's `imports` array before the parent can use it in its template.

---

## Slide 28: ng build and ng test

Two more commands you will use regularly:

**ng build** — Compiles your application into a set of static files (HTML, CSS, JavaScript bundles) optimized for production. The output goes into a `dist/` folder by default.

```
ng build
```

Use this when you are ready to deploy your app to a web server. The production build is minified, tree-shaken (unused code removed), and optimized for fast loading.

**ng test** — Runs your unit tests using the Karma test runner and Jasmine testing framework. You will use this on Day 5 when you learn testing.

```
ng test
```

This opens a browser window that runs your tests and shows results. Tests re-run automatically when you save changes, just like `ng serve` auto-reloads the app.

---

## Slide 29: What Angular DevTools Is

**Angular DevTools** is a free Chrome browser extension built by the Angular team. It adds new tabs to Chrome's Developer Tools that let you inspect your Angular application's component structure and performance.

It provides two main tabs:

- **Components tab** — Shows the full tree of components in your application. You can click any component to see its properties, inputs, outputs, and current state. This is invaluable for debugging — you can verify that data is flowing correctly between parent and child components.

- **Profiler tab** — Records and visualizes change detection cycles. It shows you which components were checked, how long each check took, and what triggered the cycle. This becomes important when you learn about performance optimization later in the course.

Angular DevTools only works on applications built with Angular. It will not activate on non-Angular websites.

---

## Slide 30: Installing Angular DevTools

To install Angular DevTools:

1. Open the **Chrome Web Store** (search "Chrome Web Store" in your browser)
2. Search for **"Angular DevTools"**
3. Click **"Add to Chrome"** and confirm the installation

After installation:

1. Navigate to your Angular app running on `localhost:4200`
2. Open Chrome DevTools (`F12` or `Cmd+Option+I` on Mac)
3. Look for the new **"Angular"** tab in the DevTools panel

If the Angular tab does not appear, make sure your app is running in **development mode** (the default when using `ng serve`). Angular DevTools does not work on production builds.

You do not need to use Angular DevTools for the exercises in this course, but having it installed now means you can explore your components visually as you build them.

---

## Slide 31: ViewEncapsulation — How Component Styles Are Scoped

When you write CSS in a component's `.css` file, those styles **only apply to that component's template** — they do not leak out to the rest of the application. Angular calls this **ViewEncapsulation**.

**How it works:** Angular's default mode is **Emulated**. It adds unique, auto-generated attributes (like `_ngcontent-abc123`) to every element in a component's template. Your CSS rules are rewritten to include these attributes, so `h1 { color: blue; }` becomes `h1[_ngcontent-abc123] { color: blue; }` — meaning the rule only matches elements inside that specific component. This all happens automatically.

**The three modes:**

- **Emulated (default)** — Angular adds unique attributes to scope styles. Use this 99% of the time. It is the default — you do not need to set it.
- **None** — No scoping. Styles become global and affect the entire application. Use sparingly for intentional global themes.
- **ShadowDom** — Uses the browser's native Shadow DOM for true isolation. Rarely used due to limitations with third-party CSS.

To override the default, import `ViewEncapsulation` from `@angular/core` and set it in the decorator:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None  // only set when overriding the default
})
export class HeaderComponent { }
```

Most of the time, leave `encapsulation` out entirely — the default Emulated mode is what you want. The key takeaway: your component styles are scoped automatically, and now you know why.

---

---

# Legacy Contrast Slides

---

## Slide 32: What Are NgModules?

Before we compare modern and classic Angular, you need to understand the core concept the classic approach was built around: **NgModules**.

An **NgModule** is a class decorated with `@NgModule()` that serves as a container for organizing an Angular application. It groups related components, directives, pipes, and services together and tells Angular how the pieces of your app fit together.

Every classic Angular application had at least one NgModule — the **root module**, typically called `AppModule`. Larger applications had dozens of NgModules: one per feature area, shared modules for reusable components, and routing modules for navigation configuration.

**What an NgModule controls:**

- **declarations** — which components, directives, and pipes belong to this module
- **imports** — which other modules this module depends on
- **exports** — which components/pipes/directives this module makes available to other modules
- **providers** — which services this module registers for dependency injection
- **bootstrap** — which component to launch as the root (only in the root module)

You do not need to write NgModules in modern Angular — standalone components replaced them entirely. But you will encounter them in legacy codebases, documentation, and tutorials, so recognizing the pattern is important.

---

## Slide 33: Coming Up — Modern vs Classic (Legacy) Angular

You've learned the modern Angular fundamentals — standalone components, `bootstrapApplication()`, `app.config.ts`, and folder-based organization.

Now let's see how these same concepts looked in **classic (legacy) Angular** — the approach used before Angular 17. You won't write classic code in this course, but you'll encounter it in existing projects and older documentation. Recognizing it makes you a more effective developer.

For each topic: **modern code first** (reinforcing what you just learned), then the **classic (legacy) equivalent** and what it replaced.

---

## Slide 34: Modern — App Entry Point with bootstrapApplication

Here is the modern app entry point you just learned — a single function call:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: []
};
```

**What makes this clean:**

- No classes, no decorators — just a function call with two arguments
- Your root component and a config object — that's the entire bootstrap
- No `BrowserModule` import — `bootstrapApplication` handles it
- The config is a plain object, not a decorated class

Simpler to read, simpler to understand, nothing extra to forget.

---

## Slide 35: Legacy — App Entry Point with bootstrapModule

In Angular versions before 17, the same bootstrap required an **entire NgModule class** just to launch the app.

**Legacy main.ts:**

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

**Legacy app.module.ts — a file that had to exist:**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**The pain:** You needed an entire `AppModule` class with a `@NgModule` decorator, a `declarations` array, an `imports` array, a `providers` array, and a `bootstrap` array — all just to render one root component. Every new Angular project started with this boilerplate. If you forgot `BrowserModule` in imports, the app would not start. If you forgot `AppComponent` in declarations, the app would not start.

---

## Slide 36: Modern — Component Registration with Standalone imports

Here is the modern component registration you just learned — each component declares its own dependencies:

```typescript
// header.component.ts — modern
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent { }
```

```typescript
// app.component.ts — modern
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
```

**What makes this clean:**

- No central `declarations` array to manage
- Each component imports exactly what its own template needs — nothing more
- No shared modules needed — just import the component directly
- Adding or removing a dependency is a local change in one file, not a change in a distant NgModule

---

## Slide 37: Legacy — Component Registration with NgModule declarations

In the legacy pattern, every component had to be registered in an NgModule's `declarations` array. The component itself had no way to declare its own dependencies.

```typescript
// app.module.ts — legacy
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProductCardComponent,
    // every new component must be added here
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**The pain points:**

- Every time you created a new component, you had to remember to add it to the correct NgModule's `declarations` array — forget and you get the "not a known element" error with no clear fix
- A component could only be declared in **one** NgModule — if two modules needed it, you had to create a *shared* module and import that
- As applications grew to 50+ components, the `declarations` array became enormous and hard to manage
- Deleting a component meant finding it in the declarations array too — miss it and the build breaks

---

## Slide 38: Modern — App Config with app.config.ts

Here is the modern app configuration you just learned — a clean config object with `provide*` functions:

```typescript
// app.config.ts — modern
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

**What makes this clean:**

- No `HttpClientModule` or `RouterModule` — replaced by `provideHttpClient()` and `provideRouter()` functions
- Each provider function clearly states what it provides — no ambiguity
- Interceptors are plain functions, not classes with verbose configuration
- The config is a flat list of provider functions, not a mix of modules and providers

---

## Slide 39: Legacy — App Config with Providers in NgModule

In the legacy pattern, application-wide services and features were registered in the `AppModule`'s `providers` and `imports` arrays.

```typescript
// app.module.ts — legacy
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**The pain:** The `imports` array mixed Angular modules (`BrowserModule`), feature modules (`HttpClientModule`), and routing configuration (`RouterModule.forRoot(routes)`) all in one list. It was not always clear which items were "modules providing features" vs "modules providing components." The `providers` array used verbose object syntax for interceptors.

---

## Slide 40: Modern — Feature Grouping by Folder

Here is the modern approach to organizing features — by folder structure:

```
src/app/
├── products/
│   ├── product-list/
│   │   ├── product-list.component.ts
│   │   ├── product-list.component.html
│   │   └── product-list.component.css
│   ├── product-card/
│   │   ├── product-card.component.ts
│   │   ├── product-card.component.html
│   │   └── product-card.component.css
│   └── product-detail/
│       ├── product-detail.component.ts
│       ├── product-detail.component.html
│       └── product-detail.component.css
```

**What makes this clean:**

- No module files — the folder **is** the grouping
- Each component imports what it needs directly — no middleman module
- Sharing a component means importing it — no export/import module dance
- Deleting a feature means deleting the folder — no module registration to clean up
- The file system tells you how the code is organized, not a decorator on a class

This is simpler, more intuitive, and matches how most developers already think about code organization.

---

## Slide 41: Legacy — Feature Grouping with NgModule per Feature

In large legacy applications, components were grouped into **feature modules** — each feature area had its own NgModule.

```typescript
// products.module.ts — legacy
@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ProductFilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ],
  exports: [ProductCardComponent]
})
export class ProductsModule { }
```

**The pain:** Every feature needed its own module file with declarations, imports, and exports arrays. If another feature needed `ProductCardComponent`, you had to export it from `ProductsModule` and import `ProductsModule` (or a shared module) into the other feature module. Adding a new component to a feature meant editing the module file — not just creating the component files. This indirect "registration" step was the most common source of errors in large codebases.

---

## Slide 42: Key Takeaways

**Key takeaways from this section:**

- Angular is a component-based framework that gives you routing, forms, HTTP, DI, and testing out of the box — no extra libraries needed
- Every Angular app starts with `bootstrapApplication()` in `main.ts`, which renders your root `AppComponent` inside `index.html`
- Standalone components are self-contained — they declare their own dependencies in their `imports` array, replacing the old NgModule system entirely
- The "not a known element" error means you forgot to add a component to the `imports` array — always check there first
