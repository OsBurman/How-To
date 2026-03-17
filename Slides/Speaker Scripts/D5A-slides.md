## Slide 1: Angular Testing — Day 5 Part A

**Day 5 Part A — Angular Testing**

*Write tests that actually catch bugs — using TestBed, ComponentFixture, signal inputs, HTTP mocking, and service fakes to build a complete testing toolkit in modern Angular.*

---

## Slide 2: What You'll Be Able to Do

- **Configure** a TestBed module for standalone components with the minimal setup needed
- **Trigger and verify** change detection so your tests reflect the real DOM state
- **Test @Input, @Output, and signal inputs** using the correct API for each
- **Mock services and HTTP** to isolate the unit under test from real dependencies
- **Test pipes, lifecycle hooks, and computed signals** with confidence
- **Choose** between NO_ERRORS_SCHEMA unit tests and real-import integration tests

---

## Slide 3: What Angular Uses for Testing

Angular ships with a built-in testing stack — you don't need to configure it yourself.

- **Jasmine** is the test framework: it provides `describe`, `it`, `expect`, and `beforeEach`
- **Karma** is the test runner: it opens a browser, executes your specs, and reports results
- Both are pre-configured when you run `ng new` — zero setup required

```typescript
// A bare-minimum Jasmine spec — this is the shape of every test you'll write
describe('MyComponent', () => {
  it('should render a title', () => {
    // arrange → act → assert
    expect(true).toBe(true); // placeholder
  });
});
```

---

## Slide 4: Jest as an Alternative

- **Jest** is a popular alternative to Jasmine + Karma — faster, no browser required
- Jest runs in Node using jsdom to simulate the DOM
- Many teams prefer it for speed; you'll see it in open-source Angular projects
- **This course uses Jasmine + Karma** — it's the Angular default and what you need to know first
- The concepts (TestBed, ComponentFixture, detectChanges) are identical across both — switching later is straightforward

---

## Slide 5: Running Tests with ng test

```bash
# Start the test runner in watch mode
ng test

# Run once and exit (useful in CI)
ng test --watch=false

# Run a single spec file
ng test --include="**/my-component.spec.ts"
```

**What you'll see in the terminal:**

```
Chrome 120 SUMMARY:
  12 specs, 0 failures
```

Karma opens a browser window — the browser is actually executing your tests. Leave it open during development; tests re-run on every save.

---

## Slide 6: The Building Blocks — describe() and it()

Before writing any Angular-specific tests, you need to understand the vocabulary of Jasmine — the test framework Angular ships with.

Every test file is built from two nested functions: `describe` and `it`.

**`describe()`** is a container. It groups related tests together and gives them a label that shows up in test output. You can nest `describe` blocks inside each other to organize tests into logical groups — for example, one group for inputs, another for outputs, another for error handling.

**`it()`** is a single test. Each `it` block represents one specific behavior you want to verify. The string you pass to `it` should read like a sentence: *"it should display the user's name"*. If the test fails, that string appears in the error output — so make it descriptive.

The pattern inside every `it` block follows three steps: **Arrange** (set up the state), **Act** (do the thing), and **Assert** (verify the result).

```typescript
describe('UserCardComponent', () => {
  // All tests related to UserCardComponent live here

  describe('when a name is provided', () => {
    // A nested group for a specific scenario

    it('should display the name in a heading', () => {
      // Arrange → Act → Assert
      expect(true).toBe(true);
    });

    it('should update the heading when the name changes', () => {
      expect(true).toBe(true);
    });
  });
});
```

---

## Slide 7: beforeEach() and afterEach()

Most tests in a suite need the same starting conditions — a freshly created component, a clean mock, a reset state. Writing that setup code inside every `it` block would be repetitive and hard to maintain. That's what `beforeEach` and `afterEach` solve.

**`beforeEach()`** runs before *every single `it()` block* in its enclosing `describe`. Use it to create components, configure TestBed, and set up mocks. Every test starts from exactly the same baseline.

**`afterEach()`** runs after every `it()` block. Use it to clean up — verifying no unexpected HTTP calls were made, unsubscribing, or resetting global state.

The important implication: **no state carries between tests**. If one `it` block sets a value on a component, the next `it` block doesn't see it. `beforeEach` re-runs and everything is fresh.

```typescript
describe('CounterComponent', () => {
  let component: CounterComponent;

  beforeEach(() => {
    // Runs fresh before EVERY it() block below
    component = new CounterComponent();
    component.count = 0;
  });

  afterEach(() => {
    // Runs after EVERY it() block — cleanup goes here
  });

  it('should start at zero', () => {
    expect(component.count).toBe(0);  // always true — beforeEach reset it
  });

  it('should increment', () => {
    component.count++;
    expect(component.count).toBe(1);  // the previous test's state is gone
  });
});
```

---

## Slide 8: expect() and Matchers

**`expect()`** is how you make assertions. You pass the **actual value** (what your code produced) to `expect()`, then chain a **matcher** to describe what you expect that value to be. If the matcher condition is false, the test fails and Jasmine reports both the expected and actual values.

```typescript
// Equality
expect(component.title).toBe('Hello');          // strict equality (===)
expect(component.user).toEqual({ id: 1 });      // deep equality — compares object contents

// Truthiness
expect(component.isLoaded).toBeTrue();
expect(component.hasError).toBeFalse();
expect(fixture.nativeElement.querySelector('h1')).toBeTruthy();  // not null/undefined/0/''
expect(fixture.nativeElement.querySelector('.hidden')).toBeFalsy();

// Numbers
expect(component.count).toBeGreaterThan(0);
expect(component.total).toBeLessThanOrEqualTo(100);

// Strings and arrays
expect(element.textContent).toContain('Alice');   // substring check
expect(component.items.length).toBe(3);

// Spy assertions — covered in detail later
expect(mockService.load).toHaveBeenCalled();
expect(mockService.save).toHaveBeenCalledWith({ id: 1 });
expect(mockService.load).toHaveBeenCalledTimes(1);

// Negation — chain .not before any matcher
expect(component.error).not.toBeTruthy();
expect(element.textContent).not.toContain('Error');
```

---

## Slide 9: The .spec.ts File Convention

Angular test files follow a strict naming convention: the spec file lives next to the file it tests and adds `.spec` before the `.ts` extension.

```
src/app/user-card/
  user-card.component.ts
  user-card.component.spec.ts    <- tests for user-card.component.ts
  user-card.component.html
  user-card.component.scss
```

When you generate a component with the CLI, the spec file is created automatically:

```bash
ng generate component user-card
# Creates: user-card.component.ts
#          user-card.component.html
#          user-card.component.scss
#          user-card.component.spec.ts  <- generated skeleton included
```

The generated skeleton gives you a working `beforeEach` and a single smoke test to build from:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

The `ng test` command automatically finds every file ending in `.spec.ts` — you don't need to register them anywhere.

---

## Slide 10: Unit Testing vs Integration Testing

Before diving into TestBed, it's worth establishing the two types of tests you'll write in Angular — because the approach you choose affects how you configure your test environment.

**Unit testing** means testing one thing in complete isolation. You test a single component, pipe, or service and replace all of its dependencies with fakes. If the test fails, you know the problem is in that one component. Unit tests are fast, focused, and easy to maintain.

**Integration testing** means testing how two or more pieces work together. You render a parent component alongside real child components, or test a service alongside a real HTTP layer. Integration tests are slower and more fragile, but they catch bugs that only appear when components interact — things like a child component expecting an input the parent isn't providing.

In Angular, both test types use the same tools (TestBed, ComponentFixture). The difference is entirely in what you import and whether you replace dependencies with mocks or use the real ones.

**A practical rule of thumb:**
- Write unit tests for logic, data transformation, and component behavior in isolation
- Write integration tests to verify that components compose correctly and pass data to each other as expected
- Run unit tests constantly during development; run integration tests before merging

---

## Slide 11: What TestBed Is

TestBed is Angular's dedicated testing utility — a **mini Angular runtime that exists only inside your test file**.

Think of it this way: normally, Angular bootstraps your entire application when the browser loads `main.ts`. TestBed does something much smaller — it spins up just enough of the Angular machinery to compile, render, and run one component in isolation. No routing, no app shell, no other modules — just the component you're testing and whatever dependencies you declare.

Key behaviors to understand:

- **It creates a real (but minimal) Angular module** — components declared inside TestBed can use Angular's DI, change detection, and template compilation exactly as they do in production
- **It resets completely before every `it()` block** — the component instance, injected services, and DOM from the previous test are all discarded; each test starts from a clean slate
- **Without TestBed, you can't render a component** — you could instantiate the class, but there would be no template compilation, no DI, and no DOM to assert against

This is why all component tests follow the same pattern: configure TestBed in `beforeEach`, create the component, and then write assertions in `it` blocks.

```typescript
// TestBed is the entry point for all component tests
import { TestBed } from '@angular/core/testing';
```

---

## Slide 12: async and await in Tests

Some setup in Angular tests is asynchronous — most notably, **template compilation**. Angular needs to fetch and parse `templateUrl` and `styleUrl` files before it can render a component. That process is asynchronous, so `configureTestingModule` returns a Promise.

**`async`** on a `beforeEach` (or `it`) function tells Jasmine: *"this function contains async operations — wait for them to finish before moving on."*

**`await`** pauses execution at that line until the Promise resolves. Without it, Jasmine would move on to the next test before the component is fully compiled, and you'd get cryptic errors about components not being found.

The rule is simple: **if you call `compileComponents()`, always mark the function `async` and `await` the whole `configureTestingModule` chain.**

```typescript
// [WRONG] — not awaited
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [UserCardComponent]
  }).compileComponents();  // returns a Promise — nothing is waiting for it
  // This runs immediately, before templates are compiled
  fixture = TestBed.createComponent(UserCardComponent);
});

// [CORRECT] — awaited
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [UserCardComponent]
  }).compileComponents();  // waits for full compilation before continuing
  fixture = TestBed.createComponent(UserCardComponent);  // safe — templates are ready
});
```

---

## Slide 13: TestBed.configureTestingModule

`configureTestingModule` is where you describe your test environment — what component you're testing, and what its dependencies should be replaced with.

Think of it as writing a tiny `NgModule` or `ApplicationConfig` just for this test suite. You tell Angular: *"here's the component I'm testing, and here's what to inject when it asks for a service."* Angular uses that configuration to compile the component and wire up DI before any test runs.

The three things you configure most often:

- **`imports`** — for standalone components, list the component itself here (it brings its own template dependencies)
- **`providers`** — list any services the component injects, and provide mocked versions instead of the real ones
- **`compileComponents()`** — tells Angular to resolve and compile all external templates and stylesheets; always `await` this

```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [UserCardComponent],  // standalone component — just import it directly
    providers: [
      { provide: UserService, useValue: mockUserService }  // swap real service for a fake
    ]
  }).compileComponents();
});
```

---

## Slide 14: ComponentFixture

Once TestBed is configured, you use it to create a **ComponentFixture** — the object that gives you access to everything about the component under test.

A fixture is a wrapper that holds three things at once: the component class instance, the compiled DOM, and Angular's change detection controls. Rather than interacting with any one of these directly, you go through the fixture so Angular can keep them all in sync.

The fixture itself has two ways to access the DOM:
- **`nativeElement`** gives you the raw browser DOM node — use this for straightforward `querySelector` calls
- **`debugElement`** is Angular's typed wrapper over the DOM — use this when you need to query by directive or component type, not just CSS

```typescript
let fixture: ComponentFixture<UserCardComponent>;
let component: UserCardComponent;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [UserCardComponent]
  }).compileComponents();

  fixture = TestBed.createComponent(UserCardComponent);  // creates the component + its DOM
  component = fixture.componentInstance;                  // the actual component class instance
});
```

- `fixture.componentInstance` — set inputs and call methods here
- `fixture.nativeElement` — use for `querySelector` and DOM assertions
- `fixture.debugElement` — use when you need Angular-aware querying (by directive, by component type)

---

## Slide 15: debugElement — Querying the DOM

`debugElement` is Angular's wrapper over the DOM — it lets you query by CSS, directive, or component type, not just raw selectors.

```typescript
import { By } from '@angular/platform-browser';

it('should display the user name', () => {
  component.name = 'Alice';
  fixture.detectChanges();

  // By.css() — works like querySelector but returns a DebugElement wrapper
  const heading = fixture.debugElement.query(By.css('h2'));

  // .nativeElement accesses the underlying DOM node from the DebugElement
  expect(heading.nativeElement.textContent).toContain('Alice');

  // By.directive() — finds elements that have a specific directive applied
  // const inputs = fixture.debugElement.queryAll(By.directive(NgModel));
});
```

- `fixture.debugElement.query(By.css(...))` — find first match; returns a `DebugElement`
- `fixture.debugElement.queryAll(By.css(...))` — find all matches; returns `DebugElement[]`
- `fixture.nativeElement.querySelector(...)` works too — pick whichever is clearest for the test

---

## Slide 16: detectChanges() — What It Is and Why It's Manual

In a running Angular application, change detection is automatic — Angular watches for events, timers, and Observable completions and re-renders the DOM whenever state changes.

In tests, that automatic triggering is turned off. Angular does this deliberately: if change detection ran automatically during a test, you wouldn't be able to set up state, call methods, and make assertions without the DOM updating between steps and producing unpredictable results.

Instead, you call `fixture.detectChanges()` yourself — at exactly the moment you want Angular to sync the DOM with the current state. This makes tests deterministic: the DOM only changes when *you* say it should.

One additional behavior to know: **the first call to `detectChanges()` also triggers `ngOnInit`**. This is intentional — in a real app, `ngOnInit` runs right after the component renders for the first time, so the first change detection call mirrors that behavior.

```typescript
it('should update the DOM when input changes', () => {
  component.title = 'Hello World';

  // Without this, the template is still showing the initial state
  fixture.detectChanges();  // NOW Angular runs change detection and updates the DOM

  const el = fixture.nativeElement.querySelector('h1');
  expect(el.textContent).toBe('Hello World');
});
```

---

## Slide 17: detectChanges() — In beforeEach vs In Each Test

You'll see `detectChanges()` called in two different places across test files, and it can be confusing to know which is right. The answer depends on what you're testing.

**Calling it in `beforeEach`** triggers the initial render and `ngOnInit` as part of setup. This is the right choice when most of your tests don't care about pre-init state and just want the component already running.

**Calling it inside each `it` block** gives you control over when the first render happens. This is the right choice when some tests need to change inputs or providers *before* `ngOnInit` runs, or when you want to verify the component's state before and after initialization.

```typescript
// Pattern A — detectChanges() in beforeEach
// Use when: all tests start from an already-initialized component
beforeEach(async () => {
  // ... TestBed setup ...
  fixture = TestBed.createComponent(UserCardComponent);
  fixture.detectChanges();  // ngOnInit runs here, before any it() block
});

it('should display the default title', () => {
  // Component is already initialized — just assert
  expect(fixture.nativeElement.querySelector('h1').textContent).toBe('Default');
});
```

```typescript
// Pattern B — detectChanges() inside each it()
// Use when: some tests need to configure state BEFORE ngOnInit runs
beforeEach(async () => {
  // ... TestBed setup ...
  fixture = TestBed.createComponent(UserCardComponent);
  // No detectChanges() here — component is created but not yet initialized
});

it('should respond to input set before init', () => {
  fixture.componentRef.setInput('userId', 42);  // set input BEFORE ngOnInit
  fixture.detectChanges();                       // ngOnInit runs NOW, sees userId = 42
  expect(fixture.nativeElement.querySelector('h2').textContent).toContain('42');
});
```

The generated skeleton calls `detectChanges()` in `beforeEach` — that's the right default for most tests.

---

## Slide 18: [WARNING] — Forgetting detectChanges()

This is the **#1 cause of Angular tests that always pass even when they shouldn't.**

If you set a value on the component but forget to call `detectChanges()`, the DOM still reflects the *previous* state. Your assertion is checking stale DOM — and if the previous state happened to match what you're looking for, the test passes even though the template binding may be completely broken.

```typescript
it('should show the error message', () => {
  component.errorMessage = 'Something went wrong';

  // [MISSING] fixture.detectChanges() — the DOM has not updated yet

  const el = fixture.nativeElement.querySelector('.error');
  expect(el.textContent).toContain('Something went wrong');
  // This can PASS even if your template is completely broken,
  // because Angular never re-rendered after the state change.
});
```

**The rule:** After every state change, call `detectChanges()` before asserting anything about the DOM.

If your test passes but you suspect it shouldn't — missing `detectChanges()` is the first thing to check.

---

## Slide 19: Testing Standalone Components — imports Array

Standalone components are **self-describing** — they declare their own template dependencies. This changes how you set up their tests.

In older Angular (NgModule-based), you had to import every module the component's template used into your test module. If the template used `*ngIf`, you had to import `CommonModule`. If it used a child component, you had to import that child's module. Getting this wrong produced cryptic template compilation errors.

With standalone components, the component itself already declares what it needs. Your test only needs to import the component — it brings its own template dependencies along.

This means test setup is almost always just one line in `imports`, regardless of how complex the component's template is.

```typescript
// user-card.component.ts
@Component({
  standalone: true,
  selector: 'app-user-card',
  imports: [CommonModule],  // the component manages its own template dependencies
  templateUrl: './user-card.component.html'
})
export class UserCardComponent {
  readonly name = input<string>('');
}
```

```typescript
// user-card.component.spec.ts
await TestBed.configureTestingModule({
  imports: [UserCardComponent]  // just the component — it brings its own dependencies
}).compileComponents();
```

No `declarations`, no `BrowserModule`, no `NgModule` — that's the payoff of standalone.

---

## Slide 20: Test Suite Structure

A well-organized test suite reads like documentation. Here's how `describe`, `beforeEach`, and `it` fit together in a complete spec file:

```typescript
describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;
  let component: UserCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // initial render + triggers ngOnInit
  });

  describe('inputs', () => {
    it('should display the name', () => { /* ... */ });
    it('should update when name changes', () => { /* ... */ });
  });

  describe('outputs', () => {
    it('should emit when the button is clicked', () => { /* ... */ });
  });
});
```

Nested `describe` blocks are optional but make large test files much easier to navigate — they create labeled groups in the test output and let you share a `beforeEach` that only applies to one group of tests.

---

## Slide 21: Creating the Fixture

`TestBed.createComponent()` builds the component and attaches it to a test host DOM. This is the step that gives you back the `ComponentFixture`. Note that it does **not** trigger change detection on its own — you must call `detectChanges()` explicitly to initialize the component and run `ngOnInit`.

```typescript
describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    fixture.detectChanges();  // triggers ngOnInit and renders the initial template
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();  // basic smoke test
  });
});
```

---

## Slide 22: Accessing the Component Instance

`fixture.componentInstance` is just the class instance — you can read properties, set them, and call methods exactly as you would in normal TypeScript code. Any changes you make to the instance don't show up in the DOM until you call `detectChanges()`.

```typescript
it('should expose the component instance', () => {
  const component = fixture.componentInstance;

  // Read component properties directly
  console.log(component.name);

  // Call component methods directly
  component.resetForm();

  // Set component properties (for @Input()-based components)
  component.userId = 42;

  fixture.detectChanges();  // sync the template after any state change

  expect(fixture.nativeElement.querySelector('h2').textContent)
    .toContain('42');
});
```

---

## Slide 23: Testing @Input

Set the input on the component instance, call `detectChanges()`, then assert the DOM — not the property. You're testing that the **binding works**, not just that you set a value. An assertion on `component.name` would pass even if the template binding `{{ name }}` was deleted.

```typescript
@Component({
  standalone: true,
  selector: 'app-greeting',
  template: `<h1>Hello, {{ name }}</h1>`,
})
export class GreetingComponent {
  @Input() name = '';  // classic decorator-based input — writable from outside
}
```

```typescript
it('should display the input name and update when it changes', () => {
  const component = fixture.componentInstance;

  component.name = 'Bob';    // set the @Input directly on the instance
  fixture.detectChanges();   // sync to template

  expect(fixture.nativeElement.querySelector('h1').textContent)
    .toBe('Hello, Bob');

  component.name = 'Alice';  // change the input again
  fixture.detectChanges();

  expect(fixture.nativeElement.querySelector('h1').textContent)
    .toBe('Hello, Alice');
});
```

---

## Slide 24: Testing @Output — Subscribing to the Emitter

To test an `@Output`, subscribe to the `EventEmitter` before triggering the action, then assert on what was captured. EventEmitters fire synchronously — no `detectChanges()` is needed to receive the emission.

```typescript
@Component({
  standalone: true,
  selector: 'app-like-button',
  template: `<button (click)="onLike()">Like</button>`,
})
export class LikeButtonComponent {
  @Output() liked = new EventEmitter<number>();

  private count = 0;
  onLike(): void { this.liked.emit(++this.count); }
}
```

```typescript
it('should emit the like count when the button is clicked', () => {
  const component = fixture.componentInstance;
  let emittedValue: number | undefined;

  // Subscribe before triggering the action
  component.liked.subscribe((val: number) => {
    emittedValue = val;
  });

  fixture.nativeElement.querySelector('button').click();

  expect(emittedValue).toBe(1);
});
```

---

## Slide 25: Testing @Output — Method Call and Multiple Emissions

You don't always need the DOM to trigger an output. Calling the component method directly is cleaner when you're testing emission logic in isolation:

```typescript
it('should emit when the method is called directly', () => {
  const component = fixture.componentInstance;
  let emittedValue: number | undefined;

  component.liked.subscribe((val: number) => { emittedValue = val; });

  component.onLike();  // call the method directly — no DOM interaction needed

  expect(emittedValue).toBe(1);
});
```

```typescript
it('should increment the count on each emission', () => {
  const component = fixture.componentInstance;
  const emittedValues: number[] = [];

  component.liked.subscribe((val: number) => emittedValues.push(val));

  component.onLike();
  component.onLike();
  component.onLike();

  expect(emittedValues).toEqual([1, 2, 3]);
});
```

---

## Slide 26: Testing Signal Inputs — Why You Can't Set Them Directly

Signal inputs created with `input()` are **readonly from outside the component**. This isn't a testing limitation — it's intentional design. A signal input is *owned by the parent*; the child component can only read it. The test environment is no different — you're not the parent, so direct assignment is blocked.

You might wonder: *"but I can call `.set()` on a regular `signal()` inside the component — why not here?"* The answer is that `input()` returns a different type than `signal()`. A writable signal (`signal()`) is owned by the component itself and exposes `.set()`. A signal input (`input()`) is owned by the parent and intentionally does not expose `.set()` — even inside the component, the value can only be read, never written.

```typescript
export class ProfileComponent {
  readonly username = input<string>('');  // InputSignal — read-only by design
}
```

**WRONG — These approaches will not work:**

```typescript
// TypeScript error: cannot assign to a readonly property
component.username = signal('Alice');

// Unsafe cast — bypasses the signal contract; reactive tracking won't update correctly
(component.username as any).set('Alice');
```

Angular provides an official API designed exactly for this situation.

---

## Slide 27: fixture.componentRef.setInput()

`fixture.componentRef.setInput()` is the official API for delivering a value to a signal input in tests. It acts as the parent component would — passing the value through Angular's signal system so reactive tracking, computed signals, and effects all update correctly.

```typescript
it('should display the signal input value', () => {
  // setInput() acts as the parent, delivering the value through Angular's signal system
  fixture.componentRef.setInput('username', 'Alice');

  fixture.detectChanges();  // sync the template after the input change

  const p = fixture.nativeElement.querySelector('p');
  expect(p.textContent).toBe('Alice');
});
```

- The first argument is the input name as a **string** — must exactly match the `input()` property name
- The component receives the value exactly as it would from a real parent template
- Always call `detectChanges()` afterward to sync the template

---

## Slide 28: setInput() Full Example

```typescript
describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
  });

  it('should update the template when signal input changes', () => {
    fixture.componentRef.setInput('username', 'Bob');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p').textContent).toBe('Bob');

    fixture.componentRef.setInput('username', 'Charlie');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p').textContent).toBe('Charlie');
  });
});
```

---

## Slide 29: Testing computed() Signals

`computed()` derives its value from one or more source signals. When you change a source signal with `.set()`, the computed value updates immediately — signals are synchronous, so you can read the result directly without `detectChanges()`. However, if you want to assert the DOM reflects the updated value, `detectChanges()` is still required.

Test that the computed updates when **any** dependency changes, not just the first one — this proves the entire reactive graph is wired correctly.

```typescript
export class CartComponent {
  readonly quantity = signal(0);
  readonly price = signal(10);
  readonly total = computed(() => this.quantity() * this.price());
}
```

```typescript
it('should re-derive when either source signal changes', () => {
  const component = fixture.componentInstance;

  component.quantity.set(2);
  component.price.set(15);
  expect(component.total()).toBe(30);   // direct signal read — no detectChanges needed

  component.price.set(25);
  expect(component.total()).toBe(50);   // changed price → total updates

  component.quantity.set(4);
  expect(component.total()).toBe(100);  // changed quantity → total updates again

  // For DOM assertions, detectChanges() is still required
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('p').textContent).toContain('100');
});
```

If only the first assertion passes and the others fail, one of your signal dependencies isn't being tracked correctly in the `computed()` expression.

---

## Slide 30: Mocks and Spies — What They Are and Why You Need Them

When you test a component, you want to test *that component's logic* — not the logic of every service it depends on. If your test calls the real `UserService`, which makes a real HTTP request to a real server, a failing test could mean the component is broken, the service is broken, the server is down, or the network has an issue. You can't tell which.

**A mock** is a substitute for a real dependency. It has the same shape (same method names, same properties) but its behavior is completely controlled by your test. You decide what it returns, whether it throws, and what data it produces. This isolates the component so that when a test fails, you know exactly where the problem is.

**A spy** is a specific kind of mock — one that also *records how it was called*. A spy lets you assert not just *what* the component rendered, but *whether it called a method*, *how many times*, and *with what arguments*.

There are two ways to create spies in Jasmine:

- **`jasmine.createSpyObj()`** — creates an entire mock object with multiple spy methods at once; used when you need to replace a whole service
- **`spyOn()`** — wraps a single method on an existing object with a spy; used when you only need to intercept one method, or when you need to spy on something like `window.clearInterval`

---

## Slide 31: spyOn() — Spying on Existing Methods

`spyOn()` takes an existing object and a method name, replaces that method with a spy for the duration of the test, and restores the original afterward. Unlike `createSpyObj`, you're not creating a whole fake object — you're just intercepting one method on something that already exists.

```typescript
it('should call console.warn when the input is invalid', () => {
  // Spy on an existing method — the original is replaced for this test only
  spyOn(console, 'warn');

  component.submitForm({ value: '' });  // trigger the validation path

  expect(console.warn).toHaveBeenCalled();
});
```

```typescript
it('should cancel the timer on destroy', () => {
  fixture.detectChanges();

  // .and.callThrough() lets the original function still execute
  // — useful when you want to verify the call happened but also want the real behavior
  spyOn(window, 'clearInterval').and.callThrough();

  fixture.destroy();

  expect(window.clearInterval).toHaveBeenCalled();
});
```

- `spyOn(obj, 'method')` — replaces the method with a spy that records calls but does nothing by default
- `.and.callThrough()` — records the call AND runs the original implementation
- `.and.returnValue(x)` — records the call and returns `x` instead of running the original

---

## Slide 32: Mocking a Service Dependency — jasmine.createSpyObj

When a component depends on a service, use `jasmine.createSpyObj` to create a fake with the same method names. Every listed method becomes a spy — a fake function that records calls and returns whatever you configure.

```typescript
import { of } from 'rxjs';  // of() wraps a plain value in an Observable

const mockUserService = jasmine.createSpyObj<UserService>(
  'UserService',            // name shown in error messages when a spy assertion fails
  ['loadUser', 'saveUser']  // methods to create spies for
);

// Configure what each spy returns when called
mockUserService.loadUser.and.returnValue(of({ id: 1, name: 'Alice' }));
mockUserService.saveUser.and.returnValue(of(true));
```

- `.and.returnValue()` controls what the spy returns — here, Observables the component can subscribe to
- After the test runs, you can assert: *"was this method called? With what args?"*

```typescript
expect(mockUserService.loadUser).toHaveBeenCalled();
expect(mockUserService.saveUser).toHaveBeenCalledWith({ id: 1, name: 'Alice' });
```

---

## Slide 33: Providing the Mock in TestBed

```typescript
beforeEach(async () => {
  const mockUserService = jasmine.createSpyObj<UserService>(
    'UserService',
    ['loadUser', 'saveUser']
  );
  mockUserService.loadUser.and.returnValue(of({ id: 1, name: 'Alice' }));

  await TestBed.configureTestingModule({
    imports: [UserCardComponent],
    providers: [
      // Angular's DI will hand back mockUserService whenever UserService is requested
      { provide: UserService, useValue: mockUserService }
    ]
  }).compileComponents();
});
```

Angular's DI sees `UserService` being requested and hands back `mockUserService` instead. The component never knows it's talking to a fake.

---

## Slide 34: Testing BehaviorSubject State

When a service exposes Observable properties alongside methods, pass them as the **third argument** to `createSpyObj`. This sets them as direct properties on the mock object — no unsafe `any` casting required.

```typescript
describe('DashboardComponent', () => {
  let stateSubject: BehaviorSubject<AuthState>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    stateSubject = new BehaviorSubject<AuthState>({ loggedIn: false });

    mockAuthService = jasmine.createSpyObj<AuthService>(
      'AuthService',
      ['login', 'logout'],                        // methods → spies
      { state$: stateSubject.asObservable() }     // properties → set directly on the mock
    );

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();
  });

  it('should show the user menu when logged in', () => {
    stateSubject.next({ loggedIn: true });  // push a new state value into the stream
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.user-menu')).toBeTruthy();

    stateSubject.next({ loggedIn: false });  // simulate a logout
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.user-menu')).toBeFalsy();
  });
});
```

---

## Slide 35: Testing the error$ Stream

`Subject` emits values on demand and has no initial value — unlike `BehaviorSubject`, it won't emit anything until you call `.next()`. Use it when you want full control over exactly when the stream fires in a test.

```typescript
describe('UserListComponent', () => {
  let errorSubject: Subject<string>;

  beforeEach(async () => {
    errorSubject = new Subject<string>();

    mockUserService = jasmine.createSpyObj<UserService>(
      'UserService',
      ['loadUsers'],
      { error$: errorSubject.asObservable() }
    );
    // ... TestBed setup ...
  });

  it('should display an error banner when the error stream emits', () => {
    fixture.detectChanges();  // initial render — error$ hasn't emitted yet

    expect(fixture.nativeElement.querySelector('.error-banner')).toBeFalsy();

    errorSubject.next('User not found');  // trigger the error
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.error-banner');
    expect(banner.textContent).toContain('User not found');

    errorSubject.next('');  // clear the error
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.error-banner')).toBeFalsy();
  });
});
```

---

## Slide 36: Testing a Service Directly

Services that don't depend on Angular's rendering machinery don't need TestBed at all. If a service has no component dependencies — just injected dependencies and methods — you can instantiate it directly, pass in mocked dependencies, and call its methods like any TypeScript class.

This is the simplest and fastest kind of Angular test.

```typescript
@Injectable({ providedIn: 'root' })
export class CalculatorService {
  add(a: number, b: number): number { return a + b; }
  multiply(a: number, b: number): number { return a * b; }
}
```

```typescript
describe('CalculatorService', () => {
  // No TestBed — just instantiate directly
  let service: CalculatorService;

  beforeEach(() => {
    service = new CalculatorService();
  });

  it('should add two numbers', () => {
    expect(service.add(2, 3)).toBe(5);
  });

  it('should multiply two numbers', () => {
    expect(service.multiply(4, 5)).toBe(20);
  });
});
```

If the service does have injected dependencies, pass mock versions into the constructor directly. Reserve `TestBed.inject()` for services that are too entangled with Angular's DI to instantiate any other way.

---

## Slide 37: Testing HTTP — provideHttpClientTesting()

```typescript
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [UserListComponent],
    providers: [
      provideHttpClient(),         // registers HttpClient in DI
      provideHttpClientTesting()   // replaces real HTTP with a testing controller
    ]
  }).compileComponents();
});
```

- `provideHttpClientTesting()` intercepts all outgoing HTTP requests — nothing actually hits the network
- You control what gets returned for each request
- Always pair `provideHttpClient()` + `provideHttpClientTesting()` together

---

## Slide 38: HttpTestingController

`HttpTestingController` is your control panel for HTTP in tests. You inject it from DI after setting up the providers, then use it to intercept pending requests and respond with fake data. The key method is `verify()` in `afterEach` — it asserts that every HTTP request your component made was explicitly handled in the test. Without it, extra or unexpected requests are silently ignored.

```typescript
import { HttpTestingController } from '@angular/common/http/testing';

let httpMock: HttpTestingController;

beforeEach(() => {
  httpMock = TestBed.inject(HttpTestingController);
});

afterEach(() => {
  // Fails if any request was made but not handled with expectOne()
  httpMock.verify();
});
```

---

## Slide 39: expectOne() — Assert the Right Request

`expectOne()` does two things at once: it asserts that exactly one request was made to the given URL (throwing if zero or more than one matched), and it returns that pending request so you can inspect and respond to it.

```typescript
it('should load users from the API', () => {
  fixture.detectChanges();  // triggers ngOnInit, which fires the HTTP call

  const req = httpMock.expectOne('https://api.example.com/users');

  expect(req.request.method).toBe('GET');

  // Provide the fake response — triggers the component's .subscribe() handler
  req.flush([{ id: 1, name: 'Alice' }]);

  fixture.detectChanges();  // re-render with the loaded data

  const items = fixture.nativeElement.querySelectorAll('li');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toContain('Alice');
});
```

---

## Slide 40: flush() — Send a Fake Response

`flush()` is how you "respond" to an intercepted request. It triggers whatever `.subscribe()` handlers or RxJS operators are waiting on the response, as if a real HTTP response had arrived.

```typescript
// Flush a successful array response
req.flush([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);

// Flush a single object
req.flush({ id: 42, name: 'Charlie' });

// Flush an empty response
req.flush(null);

// Flush with custom HTTP headers
req.flush({ data: [] }, {
  headers: { 'X-Total-Count': '100' }
});
```

---

## Slide 41: Simulating HttpErrorResponse

Testing your error handling code is just as important as testing the happy path. Pass a second argument to `flush()` with a non-2xx status to trigger the error branch.

```typescript
it('should show an error message when the API returns 404', () => {
  fixture.detectChanges();

  const req = httpMock.expectOne('https://api.example.com/users/999');

  req.flush(
    { message: 'User not found' },           // error body — what catchError receives
    { status: 404, statusText: 'Not Found' } // status code — tests status-specific branches
  );

  fixture.detectChanges();

  const error = fixture.nativeElement.querySelector('.error');
  expect(error.textContent).toContain('User not found');
});
```

---

## Slide 42: Testing a Pipe — Why It's Simple

A pipe is just a class with a `transform()` method. No DOM, no TestBed, no async needed — it's the simplest kind of Angular test you'll write.

Because a pipe is a pure function (same input always produces same output), you don't need to spin up a component environment. You instantiate the pipe directly, call `transform()`, and assert the result. The test is completely isolated from Angular's rendering machinery.

```typescript
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (!value || value.length <= limit) return value;
    return value.slice(0, limit) + '...';
  }
}
```

```typescript
describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('should truncate text longer than the limit', () => {
    expect(pipe.transform('Hello World', 5)).toBe('Hello...');
  });
});
```

---

## Slide 43: Pipe Test — Full Example

```typescript
describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('should truncate text that exceeds the limit', () => {
    expect(pipe.transform('Angular Testing', 7)).toBe('Angular...');
  });

  it('should not truncate text within the limit', () => {
    expect(pipe.transform('Hi', 10)).toBe('Hi');
  });

  it('should handle text exactly at the limit', () => {
    expect(pipe.transform('exact', 5)).toBe('exact');  // boundary value — no truncation
  });

  it('should return an empty string for empty input', () => {
    expect(pipe.transform('', 5)).toBe('');
  });

  it('should handle a limit of zero', () => {
    expect(pipe.transform('anything', 0)).toBe('...');
  });
});
```

---

## Slide 44: Testing Edge Cases in Pipes

Boundary values — exactly at the limit, one over, one under — catch most off-by-one bugs:

```typescript
// Null/undefined inputs
expect(pipe.transform(null as any, 5)).toBe(null);
expect(pipe.transform(undefined as any, 5)).toBe(undefined);

// Limit equals string length exactly — should NOT truncate
expect(pipe.transform('hello', 5)).toBe('hello');

// Limit is one less — SHOULD truncate
expect(pipe.transform('hello', 4)).toBe('hell...');

// Unicode characters — worth testing explicitly
// JavaScript's .length counts UTF-16 code units, not visible characters
// Some characters (certain emoji, accented forms) occupy 2 code units —
// this can cause .slice() to cut mid-character or produce unexpected length counts
expect(pipe.transform('café', 3)).toBe('caf...');
```

---

## Slide 45: Testing ngOnInit

`detectChanges()` triggers `ngOnInit` on its first call. To test what `ngOnInit` does, configure your mocks before calling `detectChanges()`, then assert the results after.

```typescript
@Component({ standalone: true, selector: 'app-dashboard', templateUrl: './dashboard.component.html' })
export class DashboardComponent implements OnInit {
  private readonly userService = inject(UserService);
  users: User[] = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => { this.users = users; });
  }
}
```

```typescript
it('should load users on init', () => {
  mockUserService.getUsers.and.returnValue(of([{ id: 1, name: 'Alice' }]));

  fixture.detectChanges();  // triggers ngOnInit

  expect(component.users.length).toBe(1);
  expect(mockUserService.getUsers).toHaveBeenCalledTimes(1);
});
```

---

## Slide 46: Testing ngOnDestroy

`fixture.destroy()` calls the component's `ngOnDestroy` — exactly what Angular does when the component leaves the DOM. Use it to verify that your component cleans up subscriptions, timers, and any other resources it holds.

```typescript
it('should cancel the timer on destroy', () => {
  fixture.detectChanges();
  spyOn(window, 'clearInterval').and.callThrough();

  fixture.destroy();

  expect(window.clearInterval).toHaveBeenCalled();
});
```

```typescript
it('should unsubscribe from observables on destroy', () => {
  fixture.detectChanges();
  const sub = (component as any).subscription as Subscription;

  fixture.destroy();

  expect(sub.closed).toBeTrue();  // a closed subscription won't leak memory
});
```

---

## Slide 47: Unit vs Integration — NO_ERRORS_SCHEMA

Angular validates your templates against a schema — a registry of known HTML elements and Angular components. If a template contains `<app-header>` and Angular hasn't been told what that component is, it throws. `NO_ERRORS_SCHEMA` disables that validation entirely, letting you test a parent component without importing any of its children.

```typescript
import { NO_ERRORS_SCHEMA } from '@angular/core';

await TestBed.configureTestingModule({
  imports: [ParentComponent],  // only the component under test
  schemas: [NO_ERRORS_SCHEMA]  // unknown child elements are silently ignored
}).compileComponents();
```

**What this gives you:**
- Fast, focused tests — no need to import every child component
- Tests that only break when the parent component's own logic breaks

**What you lose:**
- You won't catch it if a child component's selector changes, gets removed, or requires a missing input

---

## Slide 48: Unit vs Integration — Real Child Imports

```typescript
await TestBed.configureTestingModule({
  imports: [
    ParentComponent,
    HeaderComponent,    // real child — will render for real
    SidebarComponent,
    FooterComponent
  ]
}).compileComponents();
```

**What this gives you:**
- Tests that catch broken child components, mismatched selectors, and missing required inputs
- Confidence the components work together

**What it costs:**
- Slower test setup
- Transitive dependency chains — you may need to import child-of-child components too
- One broken child breaks all parent tests

---

## Slide 49: When to Use Each Approach

| | NO_ERRORS_SCHEMA (Unit) | Real Imports (Integration) |
|---|---|---|
| **Speed** | Fast | Slower |
| **Isolation** | Full — only tests parent logic | Partial — child behavior affects results |
| **Catches** | Parent bugs | Integration bugs between components |
| **Best for** | Logic, inputs, outputs, services | Layout and composition tests |

**The practical rule:**

- Default to `NO_ERRORS_SCHEMA` for unit tests of logic, inputs, outputs, and services
- Use real imports for a smaller number of integration tests that verify components work together
- Keep them in separate files so CI can run them independently

---

## Slide 50: Running Both — Separate Spec Files

```
src/
  user-card/
    user-card.component.ts
    user-card.component.spec.ts              <- unit test (NO_ERRORS_SCHEMA)
    user-card.component.integration.spec.ts  <- integration test (real imports)
```

```bash
# Run only unit tests
ng test --include="**/*.spec.ts" --exclude="**/*.integration.spec.ts"

# Run only integration tests
ng test --include="**/*.integration.spec.ts"

# Run everything
ng test
```

---

## Slide 51: Coming Up — Modern vs Classic (Legacy) Angular

You've been writing modern Angular throughout this session.

Now we're going to look at the **classic (legacy) approach** — the patterns you'll see in older codebases and open-source projects written before Angular 17.

You won't write this code. But you **will encounter it** — and you need to recognize it when you do.

The next few slides follow a consistent format:
**Modern code first (what you write), then legacy code (what you'll recognize), then an explanation of exactly what changed and why.**

---

## Slide 52: Component Test Setup — Modern vs Legacy

**The core difference:** In modern Angular, standalone components declare their own dependencies. In legacy Angular, components belonged to NgModules — and your test had to manually import every module the component's template used. Getting one wrong produced cryptic compilation errors that were hard to diagnose.

**[MODERN]** — Standalone component test setup

```typescript
await TestBed.configureTestingModule({
  imports: [UserCardComponent],  // just the component — it manages its own deps
}).compileComponents();
```

**[LEGACY]** — Pre-Angular 17 module-based test setup

```typescript
await TestBed.configureTestingModule({
  declarations: [UserCardComponent],   // component goes in declarations, not imports
  imports: [
    BrowserModule,                     // required for basic Angular directives
    UserModule,                        // had to import the full feature module
    SharedModule,                      // and every shared module the template needed
  ],
  providers: [UserService]
}).compileComponents();
```

**What changed:** `declarations` is gone — standalone components go in `imports`. You no longer need to track down which NgModule provides which directive. The component is self-contained, and the test reflects that.

---

## Slide 53: HTTP Testing — Modern vs Legacy

**The core difference:** In modern Angular, HTTP setup uses two explicit function-based providers. In legacy Angular, a single `HttpClientTestingModule` import did both jobs — registering `HttpClient` and swapping it for the testing controller. It was convenient, but it used the older module-in-imports pattern that Angular has since moved away from.

**[MODERN]** — Function-based HTTP testing setup

```typescript
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

await TestBed.configureTestingModule({
  imports: [UserListComponent],
  providers: [
    provideHttpClient(),
    provideHttpClientTesting()
  ]
}).compileComponents();
```

**[LEGACY]** — Module-based HTTP testing setup

```typescript
import { HttpClientTestingModule } from '@angular/common/http/testing';

await TestBed.configureTestingModule({
  declarations: [UserListComponent],
  imports: [HttpClientTestingModule]  // bundled both concerns in one import
}).compileComponents();
```

**What did NOT change:** The actual `HttpTestingController` usage — `expectOne()`, `flush()`, and `verify()` — is identical in both approaches. If you can read one, you can read the other.

---

## Slide 54: Signal Input Testing — Modern vs Legacy

**The core difference:** Before signal inputs existed, all inputs used `@Input()` decorators and were plain writable class properties. You could set them directly in tests with a simple assignment. Signal inputs introduced a readonly contract — the value is owned by the parent and delivered through Angular's signal system — which is why `setInput()` was needed.

**[MODERN]** — Setting a signal input in tests

```typescript
fixture.componentRef.setInput('username', 'Alice');
fixture.detectChanges();

expect(fixture.nativeElement.querySelector('p').textContent).toBe('Alice');
```

**[LEGACY]** — Setting a decorator-based @Input() in tests

```typescript
@Component({ ... })
export class UserCardComponent {
  @Input() username = '';  // plain writable property — no signal contract
}

component.username = 'Alice';  // direct assignment — correct for @Input() decorators
fixture.detectChanges();
```

**Why this matters:** If you're reading tests in an older codebase and see direct property assignment to an input, that's not wrong — it's correct for `@Input()` decorator-based inputs. `setInput()` is only required when the input was defined with `input()`.

---

## Slide 55: Change Detection — Same in Both

This is the one thing that **did not change** between legacy and modern Angular. Change detection has always been manual in tests, and `detectChanges()` behaves identically whether you're testing a standalone component or a module-based one. When upgrading a codebase from legacy to modern, change detection is the one part you don't need to touch.

```typescript
// Works identically in both modern and legacy tests
fixture.detectChanges();
```

**What didn't change:**
- `fixture.detectChanges()` triggers change detection and syncs the DOM
- `fixture.detectChanges()` triggers `ngOnInit` on the first call
- `fixture.debugElement.query(By.css(...))` works the same
- `fixture.nativeElement` works the same

---

## Slide 56: Key Takeaways

- **TestBed is your test runtime, rebuilt fresh before every test** — configure it in `beforeEach`; standalone components go in `imports`; each `it()` block starts with a clean slate
- **detectChanges() is not optional** — every DOM assertion requires it after a state change; forgetting it causes false positives that mask broken templates
- **Use the right API for each input type** — `component.prop = value` for `@Input()` decorators, `fixture.componentRef.setInput()` for signal inputs
- **Spies let you control and observe dependencies** — `jasmine.createSpyObj` for whole service mocks, `spyOn()` for intercepting individual methods on existing objects
- **Mock dependencies cleanly at the TestBed level** — keep tests isolated from real services and HTTP; if a test fails, you should know exactly where the problem is
- **Choose your test type deliberately** — unit tests with `NO_ERRORS_SCHEMA` for logic and isolation, integration tests with real imports for component composition
- **The legacy patterns you'll encounter** — `declarations`, `HttpClientTestingModule`, and direct `@Input()` assignment still work in the codebases that use them; modern Angular replaces them with cleaner, more explicit alternatives