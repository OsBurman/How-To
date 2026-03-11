# Day 1 Part A — Slides Speaker Script

## Day 1 Part A — What is Angular & Getting Started

Welcome, everyone. This is Day 1, Part A of our five-day Angular course. My name is [instructor name], and I'm really glad you're here.

Let me set the stage for what we're going to accomplish in this first session. By the time we're done today, you will have a running Angular application with multiple components displayed on screen — built entirely from scratch using the command line. That's not a metaphor. You are going to create a project, understand every file in it, build components, and see them render in the browser.

We're going to start from zero. I'm assuming you know JavaScript fundamentals — variables, functions, classes, arrow functions, destructuring, basic async/await — but I'm assuming you have never touched Angular before. If that's you, you're in the right place. If you've played around with Angular before, this will give you a solid, clean foundation with the modern patterns.

Let's get into it.

---

## What You'll Be Able to Do

Here's specifically what you'll be able to do by the end of this session.

First, you'll be able to explain what Angular is, why it exists, and how it's different from writing vanilla JavaScript. Not just "it's a framework" — you'll understand the actual problems it solves.

Second, you'll be able to install the Angular CLI and create a brand new project from scratch using `ng new`.

Third, you'll be able to navigate the generated file structure and understand what every file does. When something breaks, you'll know where to look.

Fourth, you'll build standalone components using the `@Component` decorator with `templateUrl` and `styleUrl` pointing to separate files.

Fifth, you'll fix the most common error beginners hit — the "not a known element" error — by managing the `imports` array correctly.

And sixth, you'll use the Angular CLI commands to serve your app, generate components, build for production, and run tests.

That's the destination. Let's start walking.

---

## What Is Angular?

So, what is Angular? Angular is a component-based framework for building web applications. It's maintained by Google and has been in active development since 2016.

Now, the word "framework" is important here. A framework is not just one tool — it's a complete platform. When you start an Angular project, you get a built-in solution for structuring your UI, handling user interaction, fetching data from servers, navigating between pages, and testing your code. You don't need to hunt around the internet finding separate libraries for each of those things. It's all included.

And the building blocks of an Angular application are components — self-contained pieces of UI that each own their own HTML template, CSS styles, and TypeScript logic. You build an application by nesting components inside each other, like building blocks. A page might have a header component, a sidebar component, and a content component. The content component might contain a list component, which contains card components. Everything is components all the way down.

That's the big picture. Now let's talk about why Angular needs to exist in the first place.

---

## Why Angular Exists

Before frameworks like Angular, developers built web applications by writing vanilla JavaScript that directly manipulated the DOM — the browser's internal representation of your HTML.

And that works fine for small things. But it creates real problems at scale.

First, there's no enforced structure. As an app grows, vanilla JS code becomes a tangled mess of event listeners, DOM queries, and state management scattered across files with no organization. Nobody agrees on where anything goes.

Second, you're stuck doing manual DOM updates. Every time data changes, you have to manually find the right elements and update their text, their attributes, their visibility. And if you forget to update one element, the UI falls out of sync with the data. Now you have a bug that's invisible until a user reports it.

Third, there's no built-in way to create reusable pieces of UI. If you want the same card layout in three places, you end up copying and pasting HTML and JavaScript. Then when you need to change it, you have to remember to change it in all three places.

And fourth — scaling. A 10-page app might be manageable with vanilla JS. A 100-page app with dozens of developers? Nearly impossible without conventions and tooling.

Angular solves all of these problems. It gives you a structured, opinionated way to build applications where the framework handles DOM updates, enforces component-based architecture, and includes tooling for every common need. You focus on building features. Angular handles the plumbing.

---

## Framework vs Library

Let me draw a clear line between a framework and a library, because this matters.

A library gives you one tool and lets you decide how to use it. A framework gives you an entire workshop — tools, workbenches, and a blueprint for how to build.

Angular is a framework. When you install Angular, you get all of the following out of the box, no extra installation needed: a component system for building your UI from reusable pieces, routing for navigating between pages, a forms module with validation and error messages, an HTTP client for talking to APIs, dependency injection for sharing services across components, and testing utilities for writing unit tests.

Compare that to something like React, which is a library. React gives you the component layer and that's it. You have to go find and install your own router, your own form library, your own HTTP client, your own state management. Angular makes those choices for you so you can focus on building features instead of evaluating npm packages.

Neither approach is "better" — they're different philosophies. But in this course, we're learning Angular, and one of its biggest strengths is that everything works together out of the box.

---

## Prerequisites — Node.js and npm

Before we can use Angular, we need two things installed on our machines: Node.js and npm.

Node.js is a JavaScript runtime that lets you run JavaScript outside of a browser. Angular's development tools — the CLI, the compiler, the dev server — they all run on Node.js. You need it.

npm stands for Node Package Manager. It's the tool that installs JavaScript packages from the npm registry. It comes bundled with Node.js — you don't install it separately. Angular itself and all of its dependencies are npm packages.

To verify you have both installed, open a terminal and run `node -v`. You should see a version number like `v20.11.0`. Any LTS version 18 or higher will work.

Then run `npm -v`. You should see something like `10.2.4`.

If either command is not recognized — if the terminal says "command not found" — then go to nodejs.org, download the LTS version, and install it. npm comes included automatically. Once you've done that, run those version checks again and make sure they work before moving on.

---

## Installing the Angular CLI

Now that we have Node.js and npm, we can install the Angular CLI. CLI stands for Command Line Interface. This is the tool you're going to use every single day when working with Angular.

The CLI creates projects, generates components, runs the dev server, builds for production, and runs tests. It does a lot. And it's all controlled through one command: `ng`.

To install it globally, run `npm install -g @angular/cli`. The `-g` flag means global — it installs the CLI as a system-wide command, not just in one project folder. You run this once and you can use `ng` from anywhere.

After installation, verify it worked by running `ng version`. This prints the Angular CLI version, your Node.js version, and your operating system. If you see output with version numbers, you're good to go.

Every Angular CLI command starts with `ng` followed by a verb. `ng new` creates projects. `ng serve` runs the dev server. `ng generate` creates components. `ng build` creates production bundles. `ng test` runs your tests. You'll use all of these by the end of today.

---

## Creating a New Project with ng new

Now the exciting part. Let's create our first Angular project.

Run `ng new my-first-app`. That's it. One command.

The CLI will ask you a couple of prompts. First, it'll ask which stylesheet format you want. Choose CSS. There are other options like SCSS and Sass, but CSS keeps things simple while you're learning.

Second, it'll ask if you want Server-Side Rendering. Choose No. SSR is an advanced deployment topic we don't need right now.

After you answer those prompts, the CLI does a bunch of work for you. It creates a full project folder, generates all the configuration files, generates all the source files, and then runs `npm install` to download every dependency. This takes a minute or two depending on your internet speed.

Once it's done, `cd my-first-app` to move into the project folder.

And here's a nice bonus — `ng new` also initializes a Git repository in the project folder and creates an initial commit with all the generated files. You don't need to run `git init` yourself. It's already done.

At this point, you have a complete, runnable Angular application. You haven't written a single line of code, and you already have a working app. That's the power of the CLI.

---

## What ng new Generates

Let's look at what `ng new` actually created. When you open the project folder, you'll see a structure like this.

At the top level, there's a `node_modules` folder — that's where all the npm packages live. Don't edit anything in there.

Then there's the `src` folder, and this is where your application source code lives. Inside `src`, you have an `app` folder where your components and application logic go, an `index.html` file which is the single HTML page, a `main.ts` file which is the entry point that boots Angular, and a `styles.css` file for global styles.

At the root level alongside `src`, you have `angular.json` for the CLI's workspace configuration, `package.json` for project dependencies and scripts, `tsconfig.json` for base TypeScript settings, and `tsconfig.app.json` for app-specific TypeScript settings.

Here's the key takeaway: Angular is a single-page application framework. There is only one HTML file — `index.html`. Angular takes over that page and dynamically renders components inside it. When you "navigate" to different pages, Angular swaps out components without the browser actually reloading. This is a fundamentally different mental model from building separate HTML pages. One page, many components.

---

## Root Config Files

Let me quickly walk through the three configuration files at the project root. You rarely edit these directly, but understanding what they control will save you time when something goes wrong.

`package.json` lists every npm package your project depends on and defines scripts you can run. The three most important scripts are `npm start` which runs `ng serve` and starts the dev server, `npm run build` which creates a production bundle, and `npm test` which runs your unit tests.

`tsconfig.json` is the base TypeScript compiler configuration. This controls how TypeScript is compiled to JavaScript — strict type checking, module resolution, target JavaScript version. The setting `"strict": true` is enabled by default, and that's important. It catches bugs at compile time before they ever reach the browser.

And `angular.json` is the CLI's workspace configuration. It tells the CLI where your source code lives, what to include in builds, which stylesheets to load globally, and how to configure the dev server. If you ever need to add a global CSS file or change the build output folder, this is where you do it.

You don't need to memorize any of these files. Just know they exist and what they're for, so when you see them referenced in error messages or documentation, you know where to look.

---

## The src/ Folder

Let's go deeper into the `src` folder, because this is where your actual application lives.

`index.html` is the single HTML page for your entire application. And the important thing in it is this one special tag inside the body: `<app-root></app-root>`. That's where Angular renders your root component. You almost never edit `index.html` directly. Angular components generate all the visible HTML.

`main.ts` is the TypeScript entry point — the very first file that runs when your application starts. It calls `bootstrapApplication()` to launch Angular with your root component. We'll look at this in detail in a moment.

And `styles.css` is for global styles that apply to every component in the application. Styles you write here are not scoped to any one component — they affect the entire page. This is good for base resets, fonts, and layout rules that should be universal.

---

## The src/app/ Folder

Now the `src/app/` folder. This is where you're going to spend most of your time. This is where all your components, services, and application logic live.

Out of the box, `ng new` generates four files in here. `app.component.ts` is the root component's TypeScript class and `@Component` decorator. This is the component that `<app-root>` in `index.html` renders. Then there's `app.component.html` for the root component's HTML template, `app.component.css` for its scoped styles, and `app.config.ts` for application-wide configuration — the providers array where you'll register services, the router, and the HTTP client later in the course.

As you build your app, you'll create subfolders inside `src/app/` for each new component. A `HeaderComponent` goes in `src/app/header/` with its own `.ts`, `.html`, and `.css` files. A `FooterComponent` goes in `src/app/footer/`. This keeps each component's files together and makes the project easy to navigate. You never have to dig through one giant folder to find what you're looking for.

---

## What main.ts Does

Let's look at `main.ts` more closely, because understanding this file is understanding how Angular starts.

`main.ts` is the very first file that executes when your application starts. Its job is simple — tell Angular which component to render and what configuration to use.

It does three things. First, it imports the `bootstrapApplication` function from Angular's platform-browser package. Second, it imports your root component — `AppComponent` — and your app configuration — `appConfig`. Third, it calls `bootstrapApplication()` with those two arguments.

That's it. That's the entire file. When the browser loads `index.html`, Angular's bundler executes `main.ts`, which calls `bootstrapApplication()`. Angular then finds the `<app-root>` tag in `index.html`, creates an instance of `AppComponent`, and renders its template inside that tag.

So the flow is: browser loads `index.html`, `main.ts` runs, `bootstrapApplication` is called, Angular renders `AppComponent` into `<app-root>`, and you see your app in the browser.

---

## bootstrapApplication() — The Two Arguments

Let's zoom in on `bootstrapApplication()` and its two arguments, because this is worth understanding clearly.

The first argument is the root component. This is the top-level component that Angular renders first. It's almost always `AppComponent`. Every other component in your application — the header, the footer, the sidebar, the product list — they're all children, or grandchildren, or great-grandchildren of this root component.

The second argument is the application configuration. This is an object containing a `providers` array. Providers are application-wide services and features that Angular makes available everywhere. Right now this array is empty or nearly empty. On Day 3 you'll add `provideHttpClient()` for API calls, and on Day 4 you'll add `provideRouter(routes)` for navigation.

And that's it. `bootstrapApplication(AppComponent, appConfig)`. One function call, two arguments, your app is running.

This is the modern way to start an Angular application. It replaced the older `bootstrapModule(AppModule)` approach, which required a whole separate NgModule class just to get the app running. We'll see that legacy approach in the contrast slides at the end of this section. But for now, just know this is cleaner and simpler.

---

## app.config.ts — The Providers Array

Let's look at `app.config.ts`, which is that second argument we just talked about.

This file exports an `ApplicationConfig` object with a `providers` array. Right now the providers array is empty because Day 1 focuses on components only. We don't need routing or HTTP yet.

But as the course progresses, you'll add things here. On Day 3, you'll add `provideHttpClient()` to enable the HTTP client for making API calls. On Day 4, you'll add `provideRouter(routes)` to enable client-side routing between pages.

Think of `providers` as the list of "batteries" you plug into your app. Angular includes many features, but you only activate the ones you need. If your app doesn't need routing, you don't include `provideRouter`. If it doesn't need HTTP, you don't include `provideHttpClient`. This keeps your application lean — you never ship code for features you don't use.

For now, just know this file exists and that it's where application-wide features get registered. We'll come back to it.

---

## How Angular Starts Up — The Full Picture

Alright, now that we've seen each file individually, let me put the whole startup sequence together so you have the full picture.

Step one: the browser loads `index.html`. That's the only HTML page. Inside the body, it finds `<app-root></app-root>`.

Step two: Angular's bundler executes `main.ts`. That's the entry point.

Step three: `main.ts` calls `bootstrapApplication(AppComponent, appConfig)`.

Step four: `appConfig` from `app.config.ts` provides any application-wide services.

Step five: Angular creates an instance of `AppComponent`.

Step six: `AppComponent`'s template renders inside `<app-root>`.

Step seven: you see your app in the browser.

Here's the key insight: `index.html` is the shell, `main.ts` is the ignition, `app.config.ts` is the settings, and `AppComponent` is the first thing that actually appears on screen. Every Angular app follows this exact startup sequence. No exceptions.

And when something goes wrong at launch — when you get a blank white screen or a confusing error — trace through these four files in order. The problem is always in one of them.

---

## The @Component Decorator

Now let's talk about how components are actually built. Every Angular component is a TypeScript class with a decorator on top: `@Component()`. The decorator is what turns a plain class into an Angular component.

A decorator is a special function prefixed with `@` that attaches metadata to a class. When Angular sees `@Component()`, it knows this class is a component and reads the metadata inside to understand how to create, render, and manage it.

This is important: without the `@Component()` decorator, your class is just a regular TypeScript class. Angular has no idea it exists and will never render it. The decorator is what makes it an Angular component.

The decorator always goes directly above the `export class` line. And the metadata is an object passed as an argument to `@Component()`. Let's go through each property of that metadata object now.

---

## Component Metadata — selector

The first property is `selector`. The selector tells Angular what HTML tag to use when rendering this component in a template.

So if you write `selector: 'app-header'`, then in any parent template, you render this component by writing `<app-header></app-header>`. It works exactly like a custom HTML element.

There's a naming convention you should follow: always prefix your selectors with `app-` or whatever your project's prefix is. This prevents conflicts with native HTML elements and third-party libraries. `app-header` is clearly your component. Just `header` could be confused with the native `<header>` element. Keep that `app-` prefix and you'll never have a collision.

---

## Component Metadata — standalone, imports, templateUrl, styleUrl

Now let's look at the rest of the metadata properties. There are four more that you'll use on every component.

`standalone: true` — this means the component is self-contained. It manages its own dependencies. It does not need to be registered in an NgModule. Every single component in this course uses `standalone: true`. This is the modern Angular pattern.

`imports` — this is an array that lists every component, directive, and pipe that this component's template uses. If your template contains `<app-child>`, you must import `ChildComponent` here. If it's not in the array, Angular doesn't know about it.

`templateUrl` — this points to the external HTML file that contains this component's template markup. We always use a separate file. Never inline templates. Separate files are easier to read, easier to maintain, and your editor gives you proper HTML syntax highlighting.

`styleUrl` — this points to the external CSS file that contains this component's scoped styles. Again, we always use a separate file. Never inline styles.

So every component in this course will have these same properties: selector, standalone true, imports, templateUrl, and styleUrl. The pattern is always the same.

---

## What standalone: true Means

Let me spend another minute on `standalone: true` because it's fundamental to how modern Angular works.

Standalone means self-contained. The component declares its own dependencies in its own `imports` array, without needing a central NgModule to register it.

Before standalone components existed — that's Angular 14 and earlier — every component had to be listed in an NgModule's `declarations` array. If you forgot to add a component there, it wouldn't work. If two NgModules both tried to declare the same component, you'd get an error. It was a constant source of pain.

With `standalone: true`, the component imports what it needs directly. No middleman. You can use the component anywhere by importing it into another component's `imports` array. There's no NgModule to manage, no declarations array to maintain. Each component is a self-contained unit you can move, reuse, or delete independently.

This is the modern Angular pattern, and it's all we'll use in this course. You will see the legacy NgModule pattern in the contrast slides at the end of this section so you can recognize it when you encounter it in the wild. But for all new code — standalone all the way.

---

## The Component Class

Below the decorator is the component class itself. This is where you define the data and behavior for your component.

Properties on the class become available in the template through data binding. So if you have a property called `title` with the value `'My Application'`, you can display it in the template using double curly braces: `{{ title }}`. Angular sees that expression, looks up the `title` property on the class, and renders the value.

Methods on the class can be called from the template through event binding. So if you have a method called `onLogoClick()`, you can wire it to a button's click event. We'll cover event binding in Part B today.

And the class is just a regular TypeScript class. You can use typed properties, access modifiers like `readonly`, and all standard TypeScript features. There's nothing magical about it — the magic is in the decorator above, not the class itself.

---

## What the imports Array Does

Let me drive home the `imports` array one more time because this is the single most important concept for beginners to get right.

The `imports` array on a standalone component tells Angular which other components, directives, and pipes this component's template is allowed to use. Think of it as a whitelist. If something isn't listed in `imports`, the template can't use it. Angular will throw an error.

So in our sample code, `AppComponent` has `imports: [HeaderComponent, FooterComponent]`. That means `AppComponent`'s template is allowed to use `<app-header>` and `<app-footer>`. If the template tried to use `<app-sidebar>`, Angular would throw an error because `SidebarComponent` is not in the imports array.

Every component you use in a template must appear in the parent's imports array. No exceptions.

---

## Adding and Removing from imports

When you add a new child component to a template, you need to do two things. Both of them. Every time.

Step 1: import the class at the top of the TypeScript file. That's the standard ES module import. Like: `import { HeaderComponent } from './header/header.component'`.

Step 2: add the class name to the `imports` array inside `@Component()`.

If you do step 1 but forget step 2, Angular can't find the component in the template and throws the "not a known element" error. If you do step 2 but forget step 1, TypeScript itself will give you a compile error because the class name is undefined.

Both steps. Every time. If you remember nothing else from this slide, remember: import at the top, add to the imports array.

And when you remove a component from a template, clean up both places — remove the import statement at the top and remove it from the imports array. Leaving unused imports isn't harmful, but it creates clutter.

---

## ⚠️ The "Not a Known Element" Error

Alright, this is the big one. This is the single most common error beginners encounter in Angular. You will see it many, many times during this course, and I want you to know exactly what it means and how to fix it before it ever surprises you.

When Angular encounters a tag in your template that it doesn't recognize, it throws an error that looks like this:

"'app-header' is not a known element." And then it gives you two options. Option 1 says if it's an Angular component, verify it's in the `@Component.imports`. Option 2 talks about Web Components and CUSTOM_ELEMENTS_SCHEMA.

Ignore option 2. You're not using Web Components. The answer is almost always option 1.

---

## ⚠️ Fixing the "Not a Known Element" Error

So why does this happen? You used a component tag like `<app-header>` in your template, but the `HeaderComponent` class is not listed in this component's `imports` array.

The fix takes two seconds.

Step 1: add the import statement at the top of the TypeScript file. `import { HeaderComponent } from './header/header.component'`.

Step 2: add `HeaderComponent` to the `imports` array in the `@Component` decorator.

Save both changes. The error disappears. Done.

Every time you see "not a known element," check the `imports` array first. It is the cause 99 percent of the time. You'll get this error during the exercises, and now you know exactly how to fix it. Don't panic. Just check the imports array.

---

## ng serve — Starting the Dev Server

Let's shift to the CLI commands you'll use constantly. First up: `ng serve`.

`ng serve` compiles your application and starts a local development server so you can see your app in the browser. Run it in your terminal, wait a few seconds for compilation, and you'll see a message that says the Angular Live Development Server is listening on localhost:4200.

Open your browser to `http://localhost:4200` and there's your running Angular application.

Here's the best part: live reload. While `ng serve` is running, every time you save a file, Angular automatically recompiles and refreshes the browser. You don't need to manually reload. Just save and look at the browser. It's instant feedback and it makes development feel really fast.

To stop the dev server, press `Ctrl+C` in the terminal. And if port 4200 is already in use — maybe you have another Angular app running — you can specify a different port with `ng serve --port 4300`.

---

## ng generate component — Creating Components

Next command: `ng generate component`. This is how you create new components using the CLI.

Run `ng generate component header` — or use the shorthand `ng g c header` — and the CLI creates four files inside a new `src/app/header/` folder. You get `header.component.ts` for the class and decorator, `header.component.html` for the template, `header.component.css` for the styles, and `header.component.spec.ts` for a starter unit test file.

The generated component already has `standalone: true` set, the correct selector — `app-header` — and the `templateUrl` and `styleUrl` pointing to the companion files. You can start writing your template and logic immediately.

But here's the important thing — and this trips people up. After generating a component, you still need to import it into the parent component's `imports` array before the parent can use it in its template. The CLI creates the component files, but it doesn't automatically wire it into a parent. That's still your job. Generate the component, then import it where you need it.

---

## ng build and ng test

Two more commands that round out the core CLI workflow.

`ng build` compiles your application into a set of static files — HTML, CSS, JavaScript bundles — optimized for production. The output goes into a `dist/` folder. You use this when you're ready to deploy your app to a web server. The production build is minified, tree-shaken — meaning unused code is removed — and optimized for fast loading.

`ng test` runs your unit tests using the Karma test runner and the Jasmine testing framework. You'll use this on Day 5 when we learn about testing. It opens a browser window that runs your tests and shows results. And just like `ng serve`, tests re-run automatically when you save changes.

For now, just know these commands exist. You'll use `ng serve` constantly starting today, `ng build` when you deploy, and `ng test` on Day 5.

---

## What Angular DevTools Is

One more tool I want you to know about: Angular DevTools.

Angular DevTools is a free Chrome browser extension built by the Angular team. It adds new tabs to Chrome's Developer Tools that let you inspect your Angular application's component structure and performance.

It has two main tabs. The Components tab shows the full tree of components in your application. You can click on any component to see its properties, inputs, outputs, and current state. This is incredibly useful for debugging — you can verify that data is flowing correctly between parent and child components without adding `console.log` statements everywhere.

The Profiler tab records and visualizes change detection cycles. It shows you which components were checked, how long each check took, and what triggered the cycle. This becomes more relevant when you learn about performance optimization later in the course.

Angular DevTools only works on Angular applications. It won't activate on non-Angular websites.

---

## Installing Angular DevTools

Installing it is easy. Open the Chrome Web Store, search for "Angular DevTools," and click "Add to Chrome."

After installation, navigate to your Angular app running on localhost:4200, open Chrome DevTools — F12 on Windows, Cmd+Option+I on Mac — and look for the new "Angular" tab in the DevTools panel.

If the Angular tab doesn't appear, make sure your app is running in development mode, which is the default when using `ng serve`. Angular DevTools doesn't work on production builds.

You don't need Angular DevTools for the exercises in this course, but having it installed now means you can explore your components visually as you build them throughout the week. I'd recommend installing it during the break.

---

## ViewEncapsulation — How Component Styles Are Scoped

One more concept before we move into the legacy contrast: ViewEncapsulation.

When you write CSS in a component's `.css` file, those styles only apply to that component's template. They don't leak out to the rest of the application. Angular calls this ViewEncapsulation.

Here's how it works. Angular's default mode is Emulated. It adds unique, auto-generated attributes — things like `_ngcontent-abc123` — to every element in a component's template. Then your CSS rules are rewritten behind the scenes to include those attributes. So if you write `h1 { color: blue; }` in your header component's CSS, Angular actually applies it as `h1[_ngcontent-abc123] { color: blue; }`. That means the rule only matches elements inside that specific component. If you have an `h1` in your footer component, it's unaffected.

This all happens automatically. You don't have to do anything.

There are three modes total. Emulated is the default, and it's what you want 99 percent of the time. None turns off scoping entirely, making styles global — use that sparingly. ShadowDom uses the browser's native Shadow DOM for true isolation, but it's rarely used because of compatibility issues with third-party CSS.

To override the default, you import `ViewEncapsulation` from `@angular/core` and set the `encapsulation` property in the decorator. But most of the time, just leave it out entirely. The default is what you want. The key takeaway here is that your component styles are scoped automatically, and now you know the mechanism behind it.

---

## What Are NgModules?

Alright, before we compare modern and classic Angular side by side, I need to introduce you to a concept from the classic era: NgModules.

An NgModule is a class decorated with `@NgModule()` that serves as a container for organizing an Angular application. It groups related components, directives, pipes, and services together and tells Angular how the pieces of your app fit together.

Every classic Angular application had at least one NgModule — the root module, typically called `AppModule`. Larger applications had dozens of them: one per feature area, shared modules for reusable components, routing modules for navigation.

An NgModule has several arrays inside its decorator. `declarations` tells Angular which components, directives, and pipes belong to this module. `imports` lists which other modules this module depends on. `exports` controls which components, pipes, and directives this module makes available to other modules. `providers` registers services for dependency injection. And `bootstrap` — only in the root module — tells Angular which component to launch first.

Now, you don't need to write NgModules in modern Angular. Standalone components replaced them entirely. But you will encounter NgModules in legacy codebases, in documentation, and in tutorials. Recognizing the pattern is important so you're not confused when you see it.

---

## Coming Up — Modern vs Classic (Legacy) Angular

You've now learned the modern Angular fundamentals — standalone components, `bootstrapApplication()`, `app.config.ts`, and folder-based organization. All the patterns you'll actually write in this course.

Now let's look at how these same concepts were done in classic, or legacy, Angular — the approach used before Angular 17. You won't write classic code in this course, but you will encounter it in existing projects, in Stack Overflow answers, and in older documentation. Recognizing it makes you a more effective developer.

For each topic, I'm going to show you the modern code first to reinforce what you just learned, and then the classic legacy equivalent so you can see what it replaced and why the modern way is better.

---

## Modern — App Entry Point with bootstrapApplication

Let's start with the app entry point. Here's the modern approach you just learned.

`main.ts` imports `bootstrapApplication` from Angular's platform-browser package, imports `AppComponent` and `appConfig`, and calls `bootstrapApplication(AppComponent, appConfig)`. That's it.

And `app.config.ts` exports a simple `ApplicationConfig` object with a `providers` array. No classes. No decorators. Just a function call with two arguments and a plain configuration object.

What makes this clean? No extra classes, no boilerplate decorators — just a function call. Your root component and a config object is the entire bootstrap. No `BrowserModule` import needed because `bootstrapApplication` handles it. The config is a plain object, not a decorated class. Simpler to read, simpler to understand, nothing extra to forget.

---

## Legacy — App Entry Point with bootstrapModule

Now here's how the same bootstrap looked in legacy Angular.

In the legacy `main.ts`, you imported `platformBrowserDynamic` from `@angular/platform-browser-dynamic` and called `platformBrowserDynamic().bootstrapModule(AppModule)`.

But here's the thing — `AppModule` had to exist. And it was an entire class. You had to create `app.module.ts` with an `@NgModule` decorator containing a `declarations` array listing `AppComponent`, an `imports` array with `BrowserModule`, a `providers` array, and a `bootstrap` array with `AppComponent`.

That's a lot of ceremony just to render one root component. Every new Angular project started with this boilerplate. If you forgot `BrowserModule` in the imports, the app wouldn't start. If you forgot `AppComponent` in declarations, the app wouldn't start. Both were easy mistakes to make and the error messages weren't always helpful.

Compare that to the modern approach: `bootstrapApplication(AppComponent, appConfig)`. One line. Done.

---

## Modern — Component Registration with Standalone imports

Next, let's look at component registration. In modern Angular, each component declares its own dependencies right there in the component file.

The header component has `standalone: true` and its own `imports` array. If it needed to use other components in its template, they'd go in that array. And `AppComponent` imports `HeaderComponent` and `FooterComponent` directly in its own `imports` array. Everything a component needs is declared in that one file.

What makes this clean? No central `declarations` array to manage. Each component imports exactly what its own template needs, nothing more. No shared modules needed — you just import the component directly. And adding or removing a dependency is a local change in one file, not a change in some distant NgModule that might be three directories away.

---

## Legacy — Component Registration with NgModule declarations

In the legacy pattern, components couldn't declare their own dependencies at all. Every component had to be registered in an NgModule's `declarations` array.

So `AppModule` had a `declarations` array listing `AppComponent`, `HeaderComponent`, `FooterComponent`, `SidebarComponent`, `ProductCardComponent` — every single component in that feature area. And this list just kept growing.

The pain was real. Every time you created a new component, you had to remember to add it to the correct NgModule's declarations array. Forget, and you get the "not a known element" error with no clear indication that the fix is in a completely different file.

A component could only be declared in one NgModule. If two modules needed the same component, you had to create a shared module, declare the component there, export it, and then import the shared module wherever you needed it. It was this indirect dance that added complexity to every single sharing scenario.

And as applications grew to 50 or more components, the declarations array became enormous and hard to manage. Deleting a component meant finding it in the declarations array too — miss it and the build breaks.

Standalone components eliminated all of this.

---

## Modern — App Config with app.config.ts

Let's look at application-wide configuration. In modern Angular, you have `app.config.ts` with a clean config object and `provide*` functions.

You'll see this in more detail on Days 3 and 4, but here's a preview. `provideRouter(routes)` enables routing. `provideHttpClient(withInterceptors([authInterceptor]))` enables the HTTP client with interceptors. Each function clearly states what it provides. Interceptors are plain functions. The config is a flat list of provider functions. No ambiguity about what does what.

---

## Legacy — App Config with Providers in NgModule

In legacy Angular, application-wide services and features were all crammed into `AppModule`'s `imports` and `providers` arrays.

The `imports` array mixed Angular modules like `BrowserModule`, feature modules like `HttpClientModule`, and routing configuration like `RouterModule.forRoot(routes)` — all in one list. It wasn't always clear which items were "modules providing features" versus "modules providing components." They all looked the same in the array.

And interceptors? They used this verbose object syntax: `{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }`. You had to remember that `multi: true` flag. Forget it, and you'd silently overwrite any other interceptors instead of adding to them. It was a classic gotcha.

The modern `provide*` functions are much cleaner and harder to get wrong.

---

## Modern — Feature Grouping by Folder

Finally, let's look at how features are organized. In modern Angular, you organize by folder structure. That's it.

Your `src/app/products/` folder contains `product-list/`, `product-card/`, and `product-detail/` subfolders, each with their `.ts`, `.html`, and `.css` files. No module files. The folder is the grouping.

Each component imports what it needs directly. Sharing a component means importing it. Deleting a feature means deleting the folder. The file system tells you how the code is organized, not a decorator on a class. It's simpler, more intuitive, and matches how most developers already think about code.

---

## Legacy — Feature Grouping with NgModule per Feature

In large legacy applications, components were grouped into feature modules — each feature area had its own NgModule class in its own file.

So you'd have `products.module.ts` with `@NgModule` containing a `declarations` array listing all the product components, an `imports` array pulling in `CommonModule`, `SharedModule`, `ProductRoutingModule`, and an `exports` array for any component other features needed.

Every feature needed its own module file with declarations, imports, and exports arrays. If another feature needed `ProductCardComponent`, you had to export it from `ProductsModule`, then import `ProductsModule` into the other feature's module. Adding a new component to a feature meant editing the module file — not just creating the component files. This indirect registration step was the most common source of errors and confusion in large Angular codebases.

Standalone components and folder-based organization made all of that unnecessary.

---

## Key Takeaways

Let's wrap up this section with the key things I want you to take away.

First: Angular is a component-based framework that gives you routing, forms, HTTP, dependency injection, and testing out of the box. No extra libraries needed.

Second: every Angular app starts with `bootstrapApplication()` in `main.ts`, which renders your root `AppComponent` inside `index.html`. That's the startup sequence — `index.html` to `main.ts` to `bootstrapApplication` to `AppComponent`.

Third: standalone components are self-contained. They declare their own dependencies in their `imports` array, replacing the old NgModule system entirely. This is the only pattern you need for new Angular code.

And fourth: the "not a known element" error means you forgot to add a component to the `imports` array. Always check there first. Two steps — import at the top of the file, add to the imports array. That's the fix.

These are the foundations everything else in this course builds on. Great work getting through this first section. Let's take a short break, and then we'll dive into the sample code walkthrough where you'll see all of these concepts working together in a real project.
