# Day 1 Part A — Code Walkthrough Speaker Script

## Introduction

Alright, welcome back. Now we're going to look at actual code. We have two complete Angular projects — a modern one and a legacy one — that demonstrate everything we just covered in the slides. I'm going to walk through the modern project first, file by file, so you can see all those concepts working together in real code. Then we'll switch to the legacy project and I'll show you the same app built the old way so you can see exactly what changed and why the modern approach is better.

Both projects do the same thing: they render a page with a header component, some main content, and a footer component. Same result, very different organization. Let's start with the modern code.

---

# Part 1: Modern Sample Code (SampleCode/)

---

## Modern — index.html

Let's start at the very beginning. Open up `src/index.html`. This is the single HTML page for our entire application. And look how simple it is.

We've got a standard HTML5 doctype, a head section with charset, a title, a base href, and a viewport meta tag. Normal HTML boilerplate. The important part is in the body — one tag: `<app-root></app-root>`.

That's it. That's the only thing in the body. This is the placeholder where Angular is going to render our root component. When the application starts up, Angular finds this `<app-root>` tag and replaces it with whatever `AppComponent`'s template contains.

Remember from the slides — Angular is a single-page application framework. There's only one HTML file. Everything else is rendered dynamically by Angular components.

---

## Modern — styles.css

Before we get into the TypeScript, let's quickly look at `src/styles.css`. This is the global stylesheet — styles here apply to the entire application, not scoped to any one component.

You can see we have a CSS reset — margins and padding set to zero on everything, `box-sizing: border-box` so padding doesn't break our layouts. Then a body style setting the font family, background color, and text color.

This is the place for universal things like resets, fonts, and body backgrounds. Component-specific styles go in each component's own `.css` file, which we'll see in a minute. The key distinction: `styles.css` is global, component CSS files are scoped.

---

## Modern — main.ts

Now the real entry point. Open `src/main.ts`. This is the very first TypeScript file that Angular executes when the app starts.

At the top we have three imports. We import `bootstrapApplication` from `@angular/platform-browser` — that's the function that starts the whole application. We import `AppComponent` from `./app/app.component` — that's our root component, the first thing that renders. And we import `appConfig` from `./app/app.config` — that's our application-wide configuration.

Then the one line that matters: `bootstrapApplication(AppComponent, appConfig)`. Two arguments — the root component and the config object. That's what launches Angular. When this runs, Angular finds `<app-root>` in `index.html`, creates an instance of `AppComponent`, and renders its template inside that tag.

And we've got `.catch((err) => console.error(err))` at the end to log any startup errors to the console. Simple error handling.

This entire file is about five lines of meaningful code. Compare that to the legacy version we'll see in a minute. Remember this simplicity.

---

## Modern — app.config.ts

Next, open `src/app/app.config.ts`. This is the configuration object — the second argument to `bootstrapApplication`.

We import `ApplicationConfig` from `@angular/core` — that's the TypeScript type for this config object. Then we export a constant called `appConfig` that matches that type. It has one property: `providers`, which is an array.

Right now the `providers` array is empty. That's fine — Day 1 is all about components. We don't need routing or HTTP yet. But this is the exact spot where you'll add `provideHttpClient()` on Day 3 and `provideRouter(routes)` on Day 4. The infrastructure is already here waiting.

Think of this file as the settings panel for your application. Each thing you add to the `providers` array activates a feature. No providers, no extra features — just components. That's what we need right now.

---

## Modern — app.component.ts

Now the root component itself. Open `src/app/app.component.ts`. This is where things get interesting.

At the top we have our imports. `Component` from `@angular/core` — we need that for the `@Component` decorator. Then `HeaderComponent` from `./header/header.component` and `FooterComponent` from `./footer/footer.component`. These are the two child components we want to use in our template.

Now look at the `@Component` decorator. The `selector` is `'app-root'` — that matches the `<app-root>` tag in `index.html`. That's how Angular knows to render this component there.

`standalone: true` — this component manages its own dependencies. No NgModule involved.

The `imports` array — this is the critical one. We have `HeaderComponent` and `FooterComponent` listed here. This tells Angular: "this component's template is allowed to use `<app-header>` and `<app-footer>`." If we removed `HeaderComponent` from this array but kept `<app-header>` in the template, we'd get that "not a known element" error we talked about in the slides.

`templateUrl` points to `./app.component.html` — the external template file. And `styleUrl` points to `./app.component.css` — the external styles file. We always use separate files. Never inline.

Below the decorator, the class itself is simple. One property: `readonly appTitle: string = 'My Angular App'`. This is the data that gets passed down to `HeaderComponent` through property binding. We'll see that connection in the template.

Notice how you can look at this one file and understand everything about this component — what it's called, what it depends on, where its template and styles are. That's the power of standalone. Everything is right here in one place.

---

## Modern — app.component.html

Now open `src/app/app.component.html` to see the template — the HTML that this component renders.

At the top we have a `<div class="app-container">` wrapping everything. Inside that, three sections.

First: `<app-header [title]="appTitle"></app-header>`. This renders the `HeaderComponent`. And look at `[title]="appTitle"` — those square brackets are property binding. We're taking the `appTitle` property from `AppComponent` and passing it into `HeaderComponent`'s `title` input. Data flows from parent to child. We'll see the `@Input()` decorator on the receiving end when we look at `HeaderComponent` in a minute.

Second: a `<main>` section with some static content — a heading, a couple of paragraphs. This is just placeholder content for Day 1. In a real app, this is where your page content or a router outlet would go.

Third: `<app-footer></app-footer>`. This renders the `FooterComponent`. Notice there are no square brackets, no data being passed in. The footer manages its own data internally. Not every component needs to receive data from its parent.

The key thing to notice here is how clean and readable this is. You can look at this template and immediately see the page structure: header at the top, content in the middle, footer at the bottom. The custom element tags — `<app-header>`, `<app-footer>` — read almost like a table of contents for the page.

---

## Modern — app.component.css

Let's quickly look at `src/app/app.component.css`. These styles are scoped to `AppComponent` only, thanks to Angular's ViewEncapsulation.

We've got a flex column layout on `.app-container` with `min-height: 100vh` so the page fills the full viewport. The `.main-content` section has `flex: 1` which makes it grow to fill the space between the header and footer — that's what pushes the footer to the bottom.

Then some heading and paragraph styles for the main content area. These styles will not affect any `h2` or `p` inside `HeaderComponent` or `FooterComponent`. That's encapsulation at work. Each component is its own isolated world of styles.

---

## Modern — header/header.component.ts

Now let's look at our first child component. Open `src/app/header/header.component.ts`.

Imports first: `Component`, `Input`, and `ViewEncapsulation` from `@angular/core`. We need `Component` for the decorator, `Input` for the `@Input()` decorator, and `ViewEncapsulation` because we're setting it explicitly.

In the `@Component` decorator: `selector` is `'app-header'` — that's the tag we used in `AppComponent`'s template. `standalone: true`. The `imports` array is empty because this component's template doesn't use any other Angular components or directives.

`templateUrl` and `styleUrl` point to the companion HTML and CSS files. And we've set `encapsulation: ViewEncapsulation.Emulated` explicitly. This is actually the default, so you don't have to set it. We did it here so you can see it in the code and connect it to what we covered in the slides. Emulated means Angular adds unique attributes to scope the styles. It's what keeps this component's CSS from leaking out.

In the class, we have one property: `@Input() title: string = 'Default Title'`. The `@Input()` decorator is what makes this property receivable from a parent component. When `AppComponent`'s template writes `<app-header [title]="appTitle">`, Angular takes the value of `appTitle` and sets it as this component's `title` property. Data flows one direction: parent to child.

The default value `'Default Title'` is a safety net — if someone uses `<app-header>` without binding a title, it won't be blank.

---

## Modern — header/header.component.html

Open the header's template: `src/app/header/header.component.html`.

We've got a `<header>` element with class `app-header`. Inside, an `<h1>` tag with `{{ title }}` — that's interpolation. Angular reads the `title` property from the component class and renders its value as text. Whatever `AppComponent` passes in through the property binding, that's what shows up here.

Below that, a `<nav>` with a couple of span elements as placeholder navigation links. These are static for Day 1 — on Day 4 when we learn routing, these would become real links.

The key concept here is the connection: `AppComponent` has `appTitle = 'My Angular App'`, the template binds it with `[title]="appTitle"`, `HeaderComponent` receives it through `@Input() title`, and the template displays it with `{{ title }}`. That's the full data flow from parent property to child template. Property binding in, interpolation out.

---

## Modern — header/header.component.css

Quickly look at the header's CSS. These styles are scoped to this component only.

The `.app-header` class creates a dark navy bar with flexbox — title on the left, nav on the right. The `.header-title` sets the font size and color to white. The `.nav-link` styles give us light gray links with a teal hover effect.

The important thing: these styles target generic class names and even set colors on `h1` elements. But they only affect elements inside `HeaderComponent`. If `AppComponent` or `FooterComponent` has an `h1`, it won't turn white. Encapsulation keeps everything isolated. You can use simple, descriptive class names without worrying about collisions across components.

---

## Modern — footer/footer.component.ts

Now the footer. Open `src/app/footer/footer.component.ts`.

This is deliberately simpler than the header. Same structure — `@Component` decorator with `selector: 'app-footer'`, `standalone: true`, empty `imports` array, `templateUrl` and `styleUrl`.

But look at the class: no `@Input()` here. Just one property — `readonly currentYear: number = new Date().getFullYear()`. This component generates its own data. It doesn't need anything from a parent. Not every component communicates with its parent, and that's perfectly fine.

The `readonly` keyword is a TypeScript best practice. It means this value is set once when the component is created and can never be reassigned. The current year shouldn't change during a user's session, so `readonly` makes that intent clear.

In vanilla JavaScript, you'd probably write `document.getElementById('year').textContent = new Date().getFullYear()`. In Angular, you define it as a class property and let the template handle displaying it.

---

## Modern — footer/footer.component.html

The footer's template. Simple: a `<footer>` element with two paragraphs.

The first paragraph uses interpolation: `© {{ currentYear }} My Angular App. All rights reserved.` Angular evaluates `currentYear` from the component class and inserts the year as text.

The second paragraph is a static tagline. No data binding, just plain text.

---

## Modern — footer/footer.component.css

And the footer's CSS — a dark blue bar, muted gray text, centered alignment. Scoped to this component only, just like the header's styles are scoped to the header. Both components use dark backgrounds with light text, but they don't interfere with each other at all because each component's styles live in their own encapsulated world.

---

## Modern — Summary

That's the entire modern project. Let me recap the file structure: `main.ts` bootstraps the app, `app.config.ts` holds the configuration, `AppComponent` is the root with its template, styles, and child imports. `HeaderComponent` and `FooterComponent` each live in their own subfolder with their own `.ts`, `.html`, and `.css` files.

Every component is standalone. Every component declares its own dependencies. You can look at any single component file and understand exactly what it does and what it depends on. There's no distant module file you need to find. No declarations array to manage. Everything is local and self-contained.

Hold that picture in your mind, because now we're going to see the same app built the legacy way.

---

# Part 2: Legacy Sample Code (LegacySampleCode/)

---

## Transition to Legacy

Alright, now let's switch to the legacy project. Same app — header, content, footer. Same visual result. But the underlying structure is fundamentally different.

As you look at these files, I want you to notice three things. First, how many extra files exist that don't exist in the modern version. Second, how you have to jump between files to understand what's happening. And third, how much boilerplate code exists that does nothing except satisfy the framework's registration requirements.

Let's go file by file.

---

## Legacy — main.ts

Open the legacy `src/main.ts`. Compare this to the modern version we just saw.

Instead of importing `bootstrapApplication`, we're importing `platformBrowserDynamic` from `@angular/platform-browser-dynamic`. That's a completely different package. And instead of importing `AppComponent` and `appConfig`, we're importing `AppModule`.

The bootstrap call is `platformBrowserDynamic().bootstrapModule(AppModule)`. Notice the difference — we're not bootstrapping a component, we're bootstrapping an entire module. Angular has to load the module, read its `declarations` array to discover which components exist, read its `imports` array to discover other modules, and then — eventually — find the `bootstrap` array to figure out which component to actually render first.

The modern version says "start with this component." The legacy version says "start with this module, and the module will tell you which component to start." It's an extra layer of indirection right from line one.

---

## Legacy — app.module.ts

Now open `src/app/app.module.ts`. This file is the big one. This is the file that doesn't exist at all in the modern project, and it's the one that caused the most pain in legacy Angular.

At the top, we import `NgModule` from `@angular/core` and `BrowserModule` from `@angular/platform-browser`. Then we import `AppComponent`. But look at the next two imports — we're importing `HeaderModule` and `FooterModule`. Not the components themselves — the modules that wrap those components.

In the modern version, `AppComponent` imports `HeaderComponent` directly. Here, `AppComponent` can't do that. It has to go through modules.

Now look at the `@NgModule` decorator. The `declarations` array lists only `AppComponent`. That's because `HeaderComponent` and `FooterComponent` are declared in their own feature modules — we'll see those in a second. If we tried to declare `HeaderComponent` here AND in `HeaderModule`, Angular would throw a "declared in 2 modules" error. A component can only belong to one module. That constraint alone caused endless headaches in large apps.

The `imports` array has three items: `BrowserModule`, `HeaderModule`, and `FooterModule`. `BrowserModule` is required in every root module for browser apps — forget it and the app won't start. `HeaderModule` and `FooterModule` make their components available to this module. If you forget to import `HeaderModule` here, `<app-header>` won't work in `AppComponent`'s template, even though you can see the component exists right there in the project.

The `providers` array is empty — same as `app.config.ts` in the modern version. And the `bootstrap` array tells Angular which component to render first.

Count the things you have to get right in this one file: the declarations can't duplicate anything in a feature module, the imports must include every feature module you need plus `BrowserModule`, and the bootstrap must point to the right component. Miss any one of those, and the app either doesn't start or components are invisible. In the modern project, `app.config.ts` has one empty array. That's it.

---

## Legacy — app.component.ts

Now look at the legacy `src/app/app.component.ts`. Compare this to the modern `AppComponent` we just walked through.

The decorator has `selector: 'app-root'`, `templateUrl`, and `styleUrls`. Same basic shape. But look at what's missing — there's no `standalone: true` and there's no `imports` array. This component cannot declare its own dependencies. It has no idea what other components are available to its template. You have to go to `AppModule` to figure that out.

This is the fundamental problem the modern approach solved. In the modern version, you look at `app.component.ts` and you see `imports: [HeaderComponent, FooterComponent]`. You know exactly what this component depends on. In this legacy file? No clue. You have to go find the module it belongs to, check that module's imports, then check those imported modules' exports, to figure out what components are available to this template. For one component it's manageable. For fifty components across a dozen modules, it's a maze.

Also notice `styleUrls` with a plural "s" and an array — `styleUrls: ['./app.component.css']`. The modern version uses `styleUrl` singular with a plain string. Small difference, but it's one of those little things that changed.

The class itself is identical — same `appTitle` property. The component logic doesn't change between legacy and modern. The difference is entirely in the registration and dependency mechanism.

---

## Legacy — app.component.html

The legacy template is almost identical to the modern one. Same `<app-header [title]="appTitle">`, same main content section, same `<app-footer>`. The template syntax doesn't change between legacy and modern Angular.

The only difference is in how Angular resolves those custom tags. In modern Angular, it checks this component's `imports` array. In legacy Angular, it checks the module's `declarations` and the `exports` of all imported modules. Different resolution path, same template syntax.

---

## Legacy — header/header.module.ts

Now here's a file that doesn't exist at all in the modern project. Open `src/app/header/header.module.ts`. This is a feature module — an NgModule whose sole purpose is to wrap `HeaderComponent`.

We import `NgModule` from `@angular/core`, `CommonModule` from `@angular/common`, and `HeaderComponent` from the local component file.

The `@NgModule` decorator has three arrays. `declarations` lists `HeaderComponent` — this tells Angular the component belongs to this module. `imports` includes `CommonModule` — that's required in every feature module because it provides basic directives like `*ngIf` and `*ngFor` and pipes like `uppercase` and `date`. Only the root module gets `BrowserModule`; feature modules use `CommonModule`. And `exports` lists `HeaderComponent` — this is what makes the component visible to other modules.

Here's the gotcha: if you forget the `exports` array, `AppModule` can import `HeaderModule` and Angular won't complain. But `<app-header>` still won't work in `AppComponent`'s template because the component isn't exported. The error you'd get is the same "not a known element" error, but the fix is completely different — you'd need to add it to `exports`, not to `declarations`. That mismatch between the error message and the fix was a constant source of confusion.

And the class body? Completely empty. `export class HeaderModule { }`. This entire file — the imports, the decorator, the three arrays — exists only to satisfy Angular's module system. It adds no functionality. It's pure boilerplate.

In the modern project, this file simply doesn't exist. `HeaderComponent` has `standalone: true` and manages itself.

---

## Legacy — header/header.component.ts

The legacy `HeaderComponent` itself looks almost identical to the modern one. Same selector, same `templateUrl`, same `ViewEncapsulation.Emulated`, same `@Input() title` property.

But compare the decorator. No `standalone: true`. No `imports: []`. This component is not self-contained. It's owned by `HeaderModule`, which declares it, and it depends on `HeaderModule` to provide any Angular features it might need in its template.

And `styleUrls` is plural with an array, instead of `styleUrl` singular.

That's the subtle difference you'll spot when reading legacy code: missing `standalone` and `imports` in the decorator means this component belongs to a module somewhere. You just have to go find it.

---

## Legacy — header/header.component.html

The template is identical to the modern version. Same `<header>` element, same `{{ title }}` interpolation, same nav links. Templates don't change between legacy and modern Angular. The rendering engine is the same — it's only the organizational layer above it that changed.

---

## Legacy — footer/footer.module.ts

Same pattern as `HeaderModule`. Open `src/app/footer/footer.module.ts`. It declares `FooterComponent`, imports `CommonModule`, and exports `FooterComponent`. Same three arrays, same empty class body, same pure boilerplate.

In a real legacy application with thirty components, you'd have roughly thirty of these module files — or at least one per feature area, each listing all the components in that feature. Every time you created a new component, you'd have to either create a new module file or open an existing one and add the component to its `declarations` array. And if it needed to be used outside its own module, you'd add it to `exports` too. Every single time. For every single component.

The modern project has zero module files. Zero.

---

## Legacy — footer/footer.component.ts

The legacy `FooterComponent` — same `selector`, same `readonly currentYear` property. No `standalone: true`, no `imports` array. Uses `styleUrls` instead of `styleUrl`. Component logic is identical to modern. Registration mechanism is completely different.

---

## Legacy — footer/footer.component.html

Identical template with interpolation. Same `{{ currentYear }}`. Legacy, modern — the template doesn't care. It works the same way.

---

## Legacy vs Modern — Side-by-Side Summary

Let me put the comparison in sharp focus.

In the modern project, we have the following source files in `src/app/`: `app.config.ts`, `app.component.ts` with its `.html` and `.css`, `header/header.component.ts` with its `.html` and `.css`, and `footer/footer.component.ts` with its `.html` and `.css`. That's ten files. Every component is standalone and self-contained.

In the legacy project, we have the same ten files — plus `app.module.ts`, `header/header.module.ts`, and `footer/footer.module.ts`. Three extra files. And for just three components. In a real application with fifty components organized into ten feature areas, you'd have at least ten extra module files, each with their own `declarations`, `imports`, and `exports` arrays that all have to stay in sync.

But the file count isn't the real problem. The real problem is the indirection. In the modern project, you open `app.component.ts` and you see `imports: [HeaderComponent, FooterComponent]`. Done. You know everything.

In the legacy project, you open `app.component.ts` and you see... nothing about dependencies. So you go to `app.module.ts` and you see `imports: [HeaderModule, FooterModule]`. Okay, so those modules provide something. You open `header.module.ts` and you see `exports: [HeaderComponent]`. Now you finally know that `<app-header>` is available. Three files just to trace one dependency. Multiply that by fifty components, and you can see why developers were so excited when standalone components arrived.

That's the code walkthrough for Day 1 Part A. You've seen both projects, you understand the structural differences, and you know why the modern approach exists. When you sit down to do the exercises, you'll be writing modern standalone code — no modules, no declarations arrays, just self-contained components that import what they need. Let's take a few minutes for questions before we move on.
