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
✅ 12 specs, 0 failures
```

Karma opens a browser window — the browser is actually executing your tests. Leave it open during development; tests re-run on every save.

---

## Slide 6: What TestBed Is

TestBed is a **mini Angular runtime that exists only inside your test file**.

- It spins up a real (but tiny) Angular module for each test suite
- Components declared inside TestBed can use Angular's DI, change detection, and template compilation
- Without TestBed, you can't render a component or inject services the Angular way
- **TestBed resets completely before every `it()` block** — each test gets a clean slate; variables, state, and component instances from the previous test are gone; this is why you put setup in `beforeEach` and not outside it
- Think of it as: *"Angular, but just enough to run this one component in isolation — rebuilt fresh for every test"*

```typescript
// TestBed is the entry point for all component tests
import { TestBed } from '@angular/core/testing';
```

---

## Slide 7: TestBed.configureTestingModule

```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [UserCardComponent],  // standalone component — just import it directly
    providers: [
      { provide: UserService, useValue: mockUserService }  // swap real service for a fake
    ]
  }).compileComponents();  // compiles templates and styles
});
```

**Key points:**
- `imports` — for standalone components, put the component itself here
- `providers` — override any injected services with mocks
- `compileComponents()` — required when using `templateUrl` (async template compilation)
- Always `await` this call — template compilation is asynchronous

---

## Slide 8: ComponentFixture

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

- `fixture` is the **wrapper** — it gives you access to both the component and its DOM
- `fixture.componentInstance` — the component class instance; set inputs and call methods here
- `fixture.nativeElement` — the **raw browser DOM node**; use for straightforward `querySelector` calls
- `fixture.debugElement` — Angular's **typed wrapper** over the DOM; use when you need to query by directive or component type, not just CSS

The short version: use `nativeElement` for simple DOM lookups, `debugElement` when you need Angular-aware querying.

---

## Slide 9: debugElement — Querying the DOM

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

## Slide 10: detectChanges() — Triggering the Update

Angular's change detection **does not run automatically** inside tests.

```typescript
it('should update the DOM when input changes', () => {
  component.title = 'Hello World';

  // Without this, the template is still showing the initial state
  fixture.detectChanges();  // NOW Angular runs change detection and updates the DOM

  const el = fixture.nativeElement.querySelector('h1');
  expect(el.textContent).toBe('Hello World');
});
```

- Call `detectChanges()` **after** every state change that should affect the template
- `detectChanges()` also triggers `ngOnInit` on the first call — this is intentional
- You control when detection runs; this makes tests predictable

---

## Slide 11: ⚠️ WARNING — Forgetting detectChanges()

This is the **#1 cause of Angular tests that always pass even when they shouldn't.**

```typescript
it('should show the error message', () => {
  component.errorMessage = 'Something went wrong';
  // ❌ MISSING: fixture.detectChanges()

  const el = fixture.nativeElement.querySelector('.error');
  expect(el.textContent).toContain('Something went wrong');
  // 🚨 This PASSES even if your template is completely broken
  // because the DOM still reflects the previous state — Angular never re-rendered
});
```

**The rule:** After every state change, call `detectChanges()` before asserting anything about the DOM.

If your test passes but you suspect it shouldn't — missing `detectChanges()` is the first thing to check.

---

## Slide 12: Testing Standalone Components — imports Array

Standalone components are **self-describing** — they declare their own dependencies.

```typescript
// user-card.component.ts — the component under test
@Component({
  standalone: true,
  selector: 'app-user-card',
  imports: [CommonModule],  // the component manages its own imports
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  readonly name = input<string>('');
}
```

```typescript
// user-card.component.spec.ts
await TestBed.configureTestingModule({
  imports: [UserCardComponent]  // ✅ just the component — no module boilerplate needed
}).compileComponents();
```

No `declarations`, no `BrowserModule`, no `NgModule` — that's the payoff of standalone.

---

## Slide 13: Test Suite Structure

A well-organized test suite reads like documentation. Here's how describe, beforeEach, and it fit together:

```typescript
describe('UserCardComponent', () => {  // outer describe — names the thing being tested
  let fixture: ComponentFixture<UserCardComponent>;
  let component: UserCardComponent;

  // beforeEach runs before EVERY single it() block — not once per file
  // TestBed tears down and rebuilds before each test — no state carries over
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // initial render + triggers ngOnInit
  });

  describe('inputs', () => {           // nested describe — group related tests
    it('should display the name', () => { /* ... */ });
    it('should update when name changes', () => { /* ... */ });
  });

  describe('outputs', () => {
    it('should emit when the button is clicked', () => { /* ... */ });
  });
});
```

Nested `describe` blocks are optional but make large test files much easier to navigate.

---

## Slide 14: Creating the Fixture

```typescript
describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent]
    }).compileComponents();

    // createComponent() builds the component and attaches it to a test host DOM
    fixture = TestBed.createComponent(UserCardComponent);

    // detectChanges() on creation triggers ngOnInit and renders the initial template
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();  // basic smoke test
  });
});
```

`createComponent()` does NOT trigger change detection on its own — you must call `detectChanges()` to initialize the component.

---

## Slide 15: Accessing the Component Instance

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

`fixture.componentInstance` is just the class instance — you can read properties, set them, and call methods exactly as you would in normal TypeScript code.

---

## Slide 16: Testing @Input

Set the input on the component instance, call `detectChanges()`, then assert the DOM — not the property. You're testing that the **binding works**, not just that you set a value.

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
  fixture.detectChanges();   // sync again

  // If the template binding is broken, this assertion catches it even though the property was set
  expect(fixture.nativeElement.querySelector('h1').textContent)
    .toBe('Hello, Alice');
});
```

---

## Slide 17: Testing @Output — Subscribing to the Emitter

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

  // Subscribe to the EventEmitter before triggering the action
  component.liked.subscribe((val: number) => {
    emittedValue = val;  // capture what was emitted
  });

  fixture.nativeElement.querySelector('button').click();  // trigger via DOM

  expect(emittedValue).toBe(1);
});
```

---

## Slide 18: Testing @Output — Method Call and Multiple Emissions

You don't always need the DOM to trigger an output. Calling the component method directly is cleaner when you're testing emission logic in isolation — and it's the only option when there's no button wired to the output:

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

  expect(emittedValues).toEqual([1, 2, 3]);  // three calls → three emissions in order
});
```

EventEmitters fire synchronously — no `detectChanges()` needed to capture emissions.

---

## Slide 19: Testing Signal Inputs — Why You Can't Set Them Directly

Signal inputs created with `input()` are **readonly from outside the component**. This isn't a testing limitation — it's intentional design. On Day 2B you learned that a signal input is *owned by the parent*; the child component can only read it. The test environment is no different — you're not the parent, so direct assignment is blocked.

```typescript
@Component({
  standalone: true,
  selector: 'app-profile',
  template: `<p>{{ username() }}</p>`,
})
export class ProfileComponent {
  readonly username = input<string>('');  // signal input — the parent owns this value
}
```

```typescript
// ❌ WRONG — TypeScript error: cannot assign to a readonly property
component.username = signal('Alice');

// ❌ ALSO WRONG — bypasses the signal contract; Angular's reactive tracking won't update correctly
(component.username as any).set('Alice');
```

Angular provides an official API designed exactly for this situation.

---

## Slide 20: fixture.componentRef.setInput()

```typescript
it('should display the signal input value', () => {
  // ✅ CORRECT — setInput() acts as the parent, delivering the value through Angular's signal system
  fixture.componentRef.setInput('username', 'Alice');

  fixture.detectChanges();  // sync the template after the input change

  const p = fixture.nativeElement.querySelector('p');
  expect(p.textContent).toBe('Alice');
});
```

- `fixture.componentRef.setInput(name, value)` is the **official API** for setting signal inputs in tests
- The first argument is the input name as a string — must exactly match the `input()` property name
- This respects Angular's signal contract; the component receives it exactly as it would from a real parent template
- Always call `detectChanges()` afterward to sync the template

---

## Slide 21: setInput() Full Example

```typescript
describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();  // initial render
  });

  it('should update the template when signal input changes', () => {
    fixture.componentRef.setInput('username', 'Bob');  // set via official API
    fixture.detectChanges();                           // sync to template

    expect(fixture.nativeElement.querySelector('p').textContent).toBe('Bob');

    fixture.componentRef.setInput('username', 'Charlie');  // change it again
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p').textContent).toBe('Charlie');
  });
});
```

---

## Slide 22: Testing computed() Signals

`computed()` derives its value from one or more source signals. In tests: change the source with `.set()`, then read the computed result. For DOM assertions, you need `detectChanges()`. For direct signal reads, you don't — signals are synchronous.

```typescript
@Component({
  standalone: true,
  selector: 'app-cart',
  template: `<p>Total: {{ total() }}</p>`,
})
export class CartComponent {
  readonly quantity = signal(0);
  readonly price = signal(10);
  readonly total = computed(() => this.quantity() * this.price());  // recalculates when either source changes
}
```

```typescript
it('should compute the correct total', () => {
  const component = fixture.componentInstance;

  component.quantity.set(5);
  component.price.set(20);

  // Read the computed signal directly — no detectChanges() needed for signal-only assertions
  expect(component.total()).toBe(100);  // 5 * 20

  // For DOM assertions, detectChanges() is still required
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('p').textContent).toContain('100');
});
```

---

## Slide 23: Testing computed() — Verifying Reactivity

Test that the computed value **updates when any dependency changes** — not just the first one you set. This proves the entire reactive graph is wired correctly:

```typescript
it('should re-derive when either source signal changes', () => {
  const component = fixture.componentInstance;

  component.quantity.set(2);
  component.price.set(15);
  expect(component.total()).toBe(30);   // 2 * 15

  // Change just price — total should respond
  component.price.set(25);
  expect(component.total()).toBe(50);   // 2 * 25

  // Change just quantity — total should respond again
  component.quantity.set(4);
  expect(component.total()).toBe(100);  // 4 * 25
});
```

If only the first assertion passes and the others fail, one of your signal dependencies isn't being tracked correctly in the `computed()` expression.

---

## Slide 24: Unit Testing a Service — jasmine.createSpyObj

When testing a component that depends on a service, you don't want the real service — you want a controlled fake:

```typescript
import { of } from 'rxjs';  // of() wraps a plain value in an Observable — from RxJS Day 3

// Create a mock with the same shape as UserService
// Every listed method becomes a Jasmine spy — a fake function that records calls
const mockUserService = jasmine.createSpyObj<UserService>(
  'UserService',            // name used in error messages when a spy assertion fails
  ['loadUser', 'saveUser']  // methods to create spies for
);

// Configure what each spy returns when the component calls it
mockUserService.loadUser.and.returnValue(of({ id: 1, name: 'Alice' }));  // wraps the value in an Observable
mockUserService.saveUser.and.returnValue(of(true));
```

- Spies record calls so you can assert: *"was this method called? With what args?"*
- `.and.returnValue()` controls what the spy returns — here, an Observable the component can subscribe to

---

## Slide 25: Providing the Mock in TestBed

```typescript
beforeEach(async () => {
  const mockUserService = jasmine.createSpyObj<UserService>(
    'UserService',
    ['loadUser', 'saveUser']
  );
  mockUserService.loadUser.and.returnValue(of({ id: 1, name: 'Alice' }));  // of() from RxJS

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

## Slide 26: Testing BehaviorSubject State

When a service exposes Observable properties alongside methods, pass them as the **third argument** to `createSpyObj`. This avoids unsafe `any` casts and keeps the mock setup in one place:

```typescript
describe('DashboardComponent', () => {
  let stateSubject: BehaviorSubject<AuthState>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Create the subject in beforeEach scope so each test gets a fresh one
    stateSubject = new BehaviorSubject<AuthState>({ loggedIn: false });

    // Third arg sets Observable properties on the mock — no casting to any required
    mockAuthService = jasmine.createSpyObj<AuthService>(
      'AuthService',
      ['login', 'logout'],                              // methods → spies
      { state$: stateSubject.asObservable() }           // properties → set directly
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

## Slide 27: Testing the error$ Stream

```typescript
describe('UserListComponent', () => {
  let errorSubject: Subject<string>;

  beforeEach(async () => {
    // Subject — emits values on demand; unlike BehaviorSubject, has no initial value
    // Use it when you want full control over exactly when the stream fires in a test
    errorSubject = new Subject<string>();

    mockUserService = jasmine.createSpyObj<UserService>(
      'UserService',
      ['loadUsers'],
      { error$: errorSubject.asObservable() }  // wire the error stream as a property
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

## Slide 28: Testing HTTP — provideHttpClientTesting()

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

## Slide 29: HttpTestingController

`HttpTestingController` is your control panel — use it to intercept pending requests and respond with fake data:

```typescript
import { HttpTestingController } from '@angular/common/http/testing';

let httpMock: HttpTestingController;

beforeEach(() => {
  httpMock = TestBed.inject(HttpTestingController);  // get the controller from DI
});

afterEach(() => {
  // verify() checks that every HTTP request your code made was handled in a test
  // If your component fired a request you didn't call expectOne() on, verify() fails
  // This catches silent bugs where code makes extra requests you weren't aware of
  httpMock.verify();
});
```

Without `verify()` in `afterEach`, a component could fire three HTTP calls and your test could handle only one — and you'd never know. `verify()` makes unhandled requests a test failure.

---

## Slide 30: expectOne() — Assert the Right Request

```typescript
it('should load users from the API', () => {
  fixture.detectChanges();  // triggers ngOnInit, which fires the HTTP call

  // Assert that exactly one request was made to this URL
  // expectOne() throws if zero requests — or more than one — matched
  const req = httpMock.expectOne('https://api.example.com/users');

  // Inspect the intercepted request before responding
  expect(req.request.method).toBe('GET');

  // Provide the fake response — this triggers the component's .subscribe() handler
  req.flush([{ id: 1, name: 'Alice' }]);

  fixture.detectChanges();  // re-render with the loaded data

  const items = fixture.nativeElement.querySelectorAll('li');
  expect(items.length).toBe(1);
  expect(items[0].textContent).toContain('Alice');
});
```

`expectOne()` both asserts and returns the pending request so you can inspect and respond to it.

---

## Slide 31: flush() — Send a Fake Response

```typescript
// Flush a successful array response
req.flush([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);

// Flush a single object
req.flush({ id: 42, name: 'Charlie' });

// Flush an empty response
req.flush(null);

// Flush with custom HTTP headers (rarely needed but possible)
req.flush({ data: [] }, {
  headers: { 'X-Total-Count': '100' }
});
```

`flush()` is how you "respond" to the intercepted request. It triggers whatever `.subscribe()` handlers or RxJS operators are waiting on the response.

---

## Slide 32: Simulating HttpErrorResponse

```typescript
it('should show an error message when the API returns 404', () => {
  fixture.detectChanges();  // triggers the HTTP call

  const req = httpMock.expectOne('https://api.example.com/users/999');

  // Flush a fake error response — second arg sets the HTTP status
  req.flush(
    { message: 'User not found' },           // error body — what catchError receives
    { status: 404, statusText: 'Not Found' } // status code — test status-specific branches here
  );

  fixture.detectChanges();

  const error = fixture.nativeElement.querySelector('.error');
  expect(error.textContent).toContain('User not found');
});
```

This tests your error handling code — the path most developers forget to test until production burns.

---

## Slide 33: Testing a Pipe — Why It's Simple

A pipe is just a class with a `transform()` method. No DOM, no TestBed, no async:

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
  // No TestBed — just instantiate and call transform()
  const pipe = new TruncatePipe();

  it('should truncate text longer than the limit', () => {
    expect(pipe.transform('Hello World', 5)).toBe('Hello...');
  });
});
```

Pipe tests are pure unit tests — input in, output out.

---

## Slide 34: Pipe Test — Full Example

```typescript
describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('should truncate text that exceeds the limit', () => {
    expect(pipe.transform('Angular Testing', 7)).toBe('Angular...');
  });

  it('should not truncate text within the limit', () => {
    expect(pipe.transform('Hi', 10)).toBe('Hi');  // shorter than limit — no truncation
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

## Slide 35: Testing Edge Cases in Pipes

Boundary values — exactly at the limit, one over, one under — catch most off-by-one bugs:

```typescript
// Null/undefined inputs (defensive code paths)
expect(pipe.transform(null as any, 5)).toBe(null);
expect(pipe.transform(undefined as any, 5)).toBe(undefined);

// Limit equals string length exactly — should NOT truncate
expect(pipe.transform('hello', 5)).toBe('hello');

// Limit is one less — SHOULD truncate
expect(pipe.transform('hello', 4)).toBe('hell...');

// Unicode characters — worth testing explicitly
// JavaScript's .length counts UTF-16 code units, not visible characters
// Most ASCII text is fine, but some characters (certain emoji, accented forms in
// some encodings) occupy 2 code units — this can cause .slice() to cut mid-character
// or produce a length count that doesn't match what users see on screen
expect(pipe.transform('café', 3)).toBe('caf...');
```

If your pipe uses `.length` and `.slice()`, Unicode edge cases are where it silently misbehaves.

---

## Slide 36: Testing ngOnInit

`detectChanges()` triggers `ngOnInit` on the first call. Use that:

```typescript
@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
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
  mockUserService.getUsers.and.returnValue(of([{ id: 1, name: 'Alice' }]));  // of() from RxJS

  fixture.detectChanges();  // ← this triggers ngOnInit

  expect(component.users.length).toBe(1);
  expect(mockUserService.getUsers).toHaveBeenCalledTimes(1);  // spy assertion — was it called?
});
```

---

## Slide 37: Testing ngOnDestroy

```typescript
it('should cancel the timer on destroy', () => {
  fixture.detectChanges();  // start the component, which starts any timers

  // Spy on clearInterval to verify it gets called during cleanup
  spyOn(window, 'clearInterval').and.callThrough();

  fixture.destroy();  // triggers ngOnDestroy — same as the component leaving the DOM

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

`fixture.destroy()` calls the component's `ngOnDestroy` — exactly what Angular does when the component leaves the DOM.

---

## Slide 38: Unit vs Integration — NO_ERRORS_SCHEMA

Angular validates your templates against a **schema** — a registry of known HTML elements and Angular components. If a template contains `<app-header>` and Angular hasn't been told what that component is, it throws. `NO_ERRORS_SCHEMA` disables that validation entirely, telling the compiler to accept any element name without complaint:

```typescript
import { NO_ERRORS_SCHEMA } from '@angular/core';

await TestBed.configureTestingModule({
  imports: [ParentComponent],  // only the component under test — no children
  schemas: [NO_ERRORS_SCHEMA]  // skip schema validation — unknown child elements are ignored silently
}).compileComponents();
```

**What this gives you:**
- Fast, focused tests — no need to import every child component
- Tests that only break when the parent component's own logic breaks

**What you lose:**
- You won't catch it if a child component's selector changes, gets removed, or requires a missing input

---

## Slide 39: Unit vs Integration — Real Child Imports

```typescript
await TestBed.configureTestingModule({
  imports: [
    ParentComponent,
    HeaderComponent,    // real child — will render for real
    SidebarComponent,   // real child — includes its own logic and template
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

## Slide 40: When to Use Each Approach

| | NO_ERRORS_SCHEMA | Real Imports |
|---|---|---|
| **Speed** | Fast | Slower |
| **Isolation** | Full — only tests parent logic | Partial — child behavior affects results |
| **Catches** | Parent bugs | Integration bugs between components |
| **Best for** | Logic-heavy components | Layout and composition tests |

**The practical rule:**

- Default to `NO_ERRORS_SCHEMA` for unit tests of logic, inputs, outputs, and services
- Use real imports for a smaller number of integration tests that verify components work together
- Keep them in separate files so CI can run them independently

---

## Slide 41: Running Both — Separate Spec Files

```
src/
  user-card/
    user-card.component.ts
    user-card.component.spec.ts              ← unit test (NO_ERRORS_SCHEMA)
    user-card.component.integration.spec.ts  ← integration test (real imports)
```

```bash
# Run only unit tests
ng test --include="**/*.spec.ts" --exclude="**/*.integration.spec.ts"

# Run only integration tests
ng test --include="**/*.integration.spec.ts"

# Run everything
ng test
```

Keeping them separate means you can run the fast unit tests on every save and only run the slower integration tests in CI or before a merge.

---

## Slide 42: Coming Up — Modern vs Classic (Legacy) Angular

You've been writing modern Angular throughout this session.

Now we're going to look at the **classic (legacy) approach** — the patterns you'll see in older codebases and open-source projects written before Angular 17.

You won't write this code. But you **will encounter it** — and you need to recognize it when you do.

The next few slides follow a consistent format:
**Modern code first (what you write), then legacy code (what you'll recognize).**

---

## Slide 43: Component Test Setup — Modern

Modern standalone components need almost no test module configuration:

```typescript
// ✅ MODERN — standalone component test setup
await TestBed.configureTestingModule({
  imports: [UserCardComponent],  // just the component — it manages its own deps
}).compileComponents();
```

- No `NgModule` anywhere
- No `declarations` array
- No `BrowserModule` or `CommonModule` at the test level
- The component brings its own imports

This is the setup you've been writing all session.

---

## Slide 44: Component Test Setup — Legacy

```typescript
// ⚠️ LEGACY — pre-Angular 17 module-based component test setup
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from '../user/user.module';  // feature module

await TestBed.configureTestingModule({
  declarations: [UserCardComponent],   // component goes in declarations, not imports
  imports: [
    BrowserModule,                     // required for basic Angular directives
    UserModule,                        // had to import the full feature module for deps
    SharedModule,                      // and every shared module the template needed
  ],
  providers: [UserService]             // explicitly provide every service
}).compileComponents();
```

**The pain:** One missing import in the `imports` array caused cryptic errors. Tracking down the right module to import was a regular time-sink.

---

## Slide 45: HTTP Testing — Modern

```typescript
// ✅ MODERN — function-based HTTP testing setup
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

await TestBed.configureTestingModule({
  imports: [UserListComponent],
  providers: [
    provideHttpClient(),         // registers HttpClient
    provideHttpClientTesting()   // replaces it with the testing controller
  ]
}).compileComponents();
```

Concise, explicit, function-based — you can see exactly what's being configured and why.

---

## Slide 46: HTTP Testing — Legacy

```typescript
// ⚠️ LEGACY — module-based HTTP testing setup
import { HttpClientTestingModule } from '@angular/common/http/testing';

await TestBed.configureTestingModule({
  declarations: [UserListComponent],
  imports: [
    HttpClientTestingModule  // a single import that bundled both HttpClient and the mock controller
  ]
}).compileComponents();
```

`HttpClientTestingModule` did both jobs in one import. It worked fine — but the module-in-imports pattern was inconsistent with everything else in testing, and it was deprecated when `HttpClientModule` was replaced by `provideHttpClient()`.

The actual `HttpTestingController` usage (`expectOne`, `flush`, `verify`) **did not change** between legacy and modern.

---

## Slide 47: Signal Input Testing — Modern

```typescript
// ✅ MODERN — setting a signal input in tests
fixture.componentRef.setInput('username', 'Alice');
fixture.detectChanges();

expect(fixture.nativeElement.querySelector('p').textContent).toBe('Alice');
```

- `setInput()` respects Angular's signal contract
- Works correctly with the signal's internal reactive tracking
- The component receives the value exactly as it would from a real parent template

---

## Slide 48: Signal Input Testing — Legacy Equivalent

Before signal inputs, all inputs used `@Input()` decorators. Setting them in tests was simpler — no special API needed, because `@Input()` properties are plain writable class properties:

```typescript
// ⚠️ LEGACY — @Input() decorator, set directly on the instance
@Component({ ... })
export class UserCardComponent {
  @Input() username = '';  // plain property — no signal contract, writable from anywhere
}

// In tests: just assign directly
component.username = 'Alice';  // ✅ worked fine for @Input() decorators
fixture.detectChanges();
```

The complexity only appeared when Angular introduced signal inputs (`input()`), which are readonly by design. If you see a codebase using `@Input()` decorators and direct assignment in tests — that's legacy, but it still works perfectly for those components.

---

## Slide 49: Change Detection — Same in Both

This is the one thing that **did not change** between legacy and modern Angular:

```typescript
// Works identically in both modern and legacy tests
fixture.detectChanges();
```

Change detection has always been manual in tests. `detectChanges()` behaves the same whether you're testing a standalone component or a module-based one.

**What didn't change:**
- `fixture.detectChanges()` still triggers change detection
- `fixture.detectChanges()` still triggers `ngOnInit` on the first call
- `fixture.debugElement.query(By.css(...))` works the same
- `fixture.nativeElement` works the same

When upgrading a codebase from legacy to modern, change detection is the one part you don't need to touch.

---

## Slide 50: Key Takeaways

- **TestBed is your test runtime, rebuilt fresh before every test** — configure it in `beforeEach`; standalone components go in `imports`; each `it()` block starts with a clean slate
- **detectChanges() is not optional** — every DOM assertion requires it after a state change; forgetting it causes false positives that mask broken templates
- **Use the right API for each input type** — `component.prop = value` for `@Input()` decorators, `fixture.componentRef.setInput()` for signal inputs
- **Mock dependencies cleanly at the TestBed level** — `jasmine.createSpyObj` with methods and Observable properties avoids unsafe casts and keeps tests isolated from real services and HTTP