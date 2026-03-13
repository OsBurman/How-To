# Day 4B — Forms

---

## Slide 1: Day 4B — Angular Forms

**Day 4 · Part B**

### Forms: Template-Driven, Reactive, and Signal-Powered

By the end of this session you will have built and validated real-world forms using both Angular form systems, wired live form data into signals, and understood exactly when to reach for each approach.

---

## Slide 2: What You'll Be Able to Do

- Build template-driven forms with HTML5 validation and user-friendly error messages
- Build reactive forms using `FormGroup`, `FormControl`, and `FormBuilder`
- Create dynamic lists of form fields with `FormArray`
- Write custom synchronous and asynchronous validators
- Convert live form data into signals using `toSignal(form.valueChanges)`
- Derive computed state — like a password-strength indicator — directly from form signals

---

## Slide 3: Two Form Systems in Angular

Angular ships **two completely separate** form systems.

They do not mix. You pick one per form.

| | Template-Driven | Reactive |
|---|---|---|
| Logic lives in | The HTML template | The TypeScript class |
| Import needed | `FormsModule` | `ReactiveFormsModule` |
| Best for | Simple, short forms | Complex, dynamic forms |
| Testability | Harder | Easier |
| Dynamic fields | Painful | Built-in (`FormArray`) |

Both systems are fully supported in Angular 17–21.

---

## Slide 4: When to Use Each System

**Reach for template-driven when:**
- The form is short (login, contact, newsletter signup)
- You don't need to add/remove fields at runtime
- You want to write less TypeScript and more HTML

**Reach for reactive when:**
- Fields appear and disappear based on user actions
- You need cross-field validation (password ≠ confirm password)
- You want to subscribe to value changes as an Observable
- You need to test form logic in isolation

> Most real apps use **reactive forms** for anything non-trivial. Learn both; default to reactive.

---

## Slide 5: What Template-Driven Forms Are

In a template-driven form, the **template does the heavy lifting**.

- You add directives (`ngModel`, `required`, `minlength`) directly to HTML elements
- Angular reads those directives and builds a form model behind the scenes
- Your TypeScript class holds simple properties — not form objects
- The form's validity, touched state, and errors all live on template references (`#email="ngModel"`)

This feels natural for small forms. It becomes unwieldy fast when forms get complex.

---

## Slide 6: `ngModel` — Binding an Input

`ngModel` creates a **two-way binding** between an `<input>` and a component property.

```typescript
// contact-form.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // required for ngModel

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule], // must be in imports array
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  email = ''; // plain property — no signal, no FormControl
}
```

```html
<!-- contact-form.component.html -->
<!-- [(ngModel)] = two-way binding: reads and writes this.email -->
<input [(ngModel)]="email" name="email" type="email" />
<p>You typed: {{ email }}</p>
```

> `name="email"` is **required** when `ngModel` is used inside a `<form>` tag. Angular uses it as the key in the form model. If you forget it, Angular silently fails to register the control — the overall form validity will be wrong and your submit handler will see incomplete data. No error is thrown, which makes it hard to track down.

---

## Slide 7: `ngForm` — The Form Directive

When you add a `<form>` tag, Angular **automatically** attaches the `NgForm` directive to it.

`NgForm` tracks the overall form's validity, dirty state, and submitted state.

```html
<!-- Angular applies NgForm to every <form> tag automatically when FormsModule is imported -->
<!-- #myForm="ngForm" gives you a reference to that NgForm instance -->
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">

  <input [(ngModel)]="email" name="email" required />

  <!-- myForm.valid is false until ALL controls inside are valid -->
  <button type="submit" [disabled]="!myForm.valid">Send</button>

</form>
```

```typescript
// Access the NgForm object in your handler
onSubmit(form: NgForm): void {
  console.log(form.value);   // { email: 'user@example.com' }
  console.log(form.valid);   // true / false
}
```

---

## Slide 8: `#field` Template References

Give a template reference to each field using `#fieldName="ngModel"`.
This exposes the field's validity, touched state, and errors.

```html
<!-- #email="ngModel" captures this specific control's state -->
<input
  [(ngModel)]="email"
  name="email"
  type="email"
  required
  #email="ngModel"
/>

<!-- touched = user focused then left the field -->
<!-- invalid = current value fails at least one validator -->
<div *ngIf="false"> <!-- never rendered, just showing the properties available -->
  email.valid      → {{ email.valid }}
  email.invalid    → {{ email.invalid }}
  email.touched    → {{ email.touched }}
  email.dirty      → {{ email.dirty }}
  email.errors     → {{ email.errors | json }}
</div>
```

> You will use `#email.invalid && #email.touched` constantly for showing error messages.

---

## Slide 9: HTML5 Validators

Angular understands native HTML5 validation attributes and wires them into the form model automatically.

```html
<!-- required — field must have a value -->
<input [(ngModel)]="name" name="name" required #name="ngModel" />

<!-- minlength / maxlength — character count bounds -->
<input [(ngModel)]="username" name="username"
       minlength="3" maxlength="20" #username="ngModel" />

<!-- email — must match email format -->
<input [(ngModel)]="email" name="email" type="email"
       email #email="ngModel" />

<!-- pattern — must match a regex -->
<input [(ngModel)]="zip" name="zip"
       pattern="[0-9]{5}" #zip="ngModel" />
```

Each attribute maps to a key in `field.errors`:
`required`, `minlength`, `maxlength`, `email`, `pattern`

---

## Slide 10: Showing Error Messages

Only show errors **after the user has touched the field** — never on first load.

```html
<input
  [(ngModel)]="email"
  name="email"
  type="email"
  required
  email
  #emailField="ngModel"
/>

<!-- Condition: field has been touched AND has an error -->
@if (emailField.invalid && emailField.touched) {
  <div class="errors">
    <!-- Check specific error keys -->
    @if (emailField.errors?.['required']) {
      <span>Email is required.</span>
    }
    @if (emailField.errors?.['email']) {
      <span>Please enter a valid email address.</span>
    }
  </div>
}
```

> `emailField.errors?.['required']` uses optional chaining because `errors` is `null` when the field is valid.

---

## Slide 11: Template-Driven Form — Full Class

```typescript
// contact-form.component.ts
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  name = '';
  email = '';
  message = '';

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Submitted:', form.value); // { name, email, message }
      form.reset(); // clears values and resets validation state
    }
  }
}
```

---

## Slide 12: Template-Driven Form — Template

```html
<!-- contact-form.component.html -->
<form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">

  <label>Name
    <input [(ngModel)]="name" name="name" required minlength="2" #nameField="ngModel" />
    @if (nameField.invalid && nameField.touched) {
      <span>Name must be at least 2 characters.</span>
    }
  </label>

  <label>Email
    <input [(ngModel)]="email" name="email" type="email" required email #emailField="ngModel" />
    @if (emailField.invalid && emailField.touched) {
      <span>Valid email required.</span>
    }
  </label>

  <label>Message
    <textarea [(ngModel)]="message" name="message" required minlength="10" #msgField="ngModel"></textarea>
    @if (msgField.invalid && msgField.touched) {
      <span>Message must be at least 10 characters.</span>
    }
  </label>

  <!-- Disabled until every control is valid -->
  <button type="submit" [disabled]="!contactForm.valid">Send</button>

</form>
```

---

## Slide 13: What Reactive Forms Are

In reactive forms, the **TypeScript class owns the form model**.

- You create `FormGroup` and `FormControl` objects in your class
- The template connects to those objects using directives (`formGroup`, `formControlName`)
- You can manipulate the form programmatically: set values, add controls, subscribe to changes
- Validators are plain functions — easy to unit test

The template becomes thin. The logic is all in TypeScript where it belongs.

---

## Slide 14: `FormGroup` — Grouping Controls

A `FormGroup` holds a **collection of named controls** and treats them as one unit. The group has its own `valid`, `invalid`, `touched`, and `value` properties that reflect the combined state of all its children.

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  // FormGroup created in the class body — no constructor needed
  readonly form = new FormGroup({
    username: new FormControl(''), // key must match formControlName in template
    email:    new FormControl(''),
    password: new FormControl(''),
  });

  logState(): void {
    console.log(this.form.value);               // { username: '', email: '', password: '' }
    console.log(this.form.valid);               // true if all child controls are valid
    console.log(this.form.get('email')?.value); // '' — access a single control by key
  }
}
```

> The **key** you give each control in `FormGroup` must match the `formControlName` you use in the template. A mismatch causes a runtime error.

---

## Slide 15: `FormControl` — A Single Field

A `FormControl` tracks one field's **value**, **validity**, and **state**.

```typescript
// Creating a FormControl with an initial value and validators
const emailControl = new FormControl('', [
  Validators.required,       // must not be empty
  Validators.email,          // must be valid email format
]);

// Reading state
emailControl.value;          // current string value
emailControl.valid;          // true if no errors
emailControl.invalid;        // true if any error
emailControl.touched;        // true if user has focused + left the field
emailControl.dirty;          // true if value has changed since init
emailControl.errors;         // null | { required: true } | { email: true } etc.

// Programmatic control
emailControl.setValue('hello@example.com');
emailControl.reset();        // back to initial value + pristine/untouched
emailControl.disable();      // greys out the field
```

---

## Slide 16: `FormBuilder` — The Shorthand

`FormBuilder` does the same thing as `new FormGroup(new FormControl(...))` but with less noise.

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  // inject() — no constructor needed
  private readonly fb = inject(FormBuilder);

  // fb.group() instead of new FormGroup({ key: new FormControl(...) })
  readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
}
```

> `fb.group({ key: [initialValue, validators] })` is the pattern you'll use everywhere. Much cleaner than chaining `new FormControl()` calls.

---

## Slide 17: Built-In `Validators`

Angular's `Validators` object contains the most common validation functions.

```typescript
import { Validators } from '@angular/forms';

this.fb.group({
  name:     ['', Validators.required],                    // single validator
  username: ['', [Validators.required,
                  Validators.minLength(3),               // min character count
                  Validators.maxLength(20)]],            // max character count
  email:    ['', [Validators.required, Validators.email]],
  age:      ['', [Validators.required,
                  Validators.min(18),                   // numeric minimum
                  Validators.max(120)]],                 // numeric maximum
  zip:      ['', Validators.pattern(/^\d{5}$/)],        // regex
});

// Accessing errors in the template:
// form.get('username')?.errors?.['minlength']?.requiredLength  → 3
// form.get('username')?.errors?.['minlength']?.actualLength    → 1
```

---

## Slide 18: `valueChanges` — The Form as an Observable

Every `FormGroup` and `FormControl` exposes `valueChanges` — an Observable that emits on every keystroke.

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

export class SearchComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.group({ query: [''] });

  ngOnInit(): void {
    // Emits the full form value object every time any field changes
    this.form.valueChanges.subscribe(value => {
      console.log(value); // { query: 'ang...' }
    });

    // Or watch a single control
    this.form.get('query')?.valueChanges.subscribe(q => {
      console.log('Query changed to:', q);
    });
  }
}
```

> You'll use `toSignal(form.valueChanges)` later in this session to convert this into a signal — no manual subscription or cleanup needed.

---

## Slide 19: Reactive Form — Wiring the Template

Use `[formGroup]` on the `<form>` and `formControlName` on each input.

```html
<!-- register.component.html -->

<!-- [formGroup] connects the template to your TypeScript FormGroup -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">

  <label>Username
    <!-- formControlName must match the key you used in fb.group() -->
    <input formControlName="username" type="text" />
  </label>

  <label>Email
    <input formControlName="email" type="email" />
  </label>

  <button type="submit" [disabled]="!form.valid">Register</button>

</form>
```

> Notice there are no `name=""` attributes and no `#ref="ngModel"` template references. In a reactive form, the TypeScript class is the source of truth — not template references.

---

## Slide 20: Reactive Form — Showing Errors

In a reactive form you access error state through the `FormGroup`, not a template reference.
The pattern is `form.get('fieldName')?.errors?.['errorKey']`.

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">

  <label>Username
    <input formControlName="username" type="text" />

    <!-- form.get() retrieves the control by key — optional chaining because it can be null -->
    <!-- touched: user has focused and left the field -->
    @if (form.get('username')?.invalid && form.get('username')?.touched) {
      <div class="errors">
        <!-- Check each error key individually -->
        @if (form.get('username')?.errors?.['required']) {
          <span>Username is required.</span>
        }
        @if (form.get('username')?.errors?.['minlength']) {
          <!-- minlength error carries extra data: requiredLength and actualLength -->
          <span>
            Must be at least
            {{ form.get('username')?.errors?.['minlength']?.requiredLength }}
            characters.
          </span>
        }
      </div>
    }
  </label>

</form>
```

> Compare with template-driven: there you used `#usernameField="ngModel"` and then `usernameField.errors`. In reactive forms the control is always accessed through the group: `form.get('username')`.

---

## Slide 21: Reactive Form — Full Class Example

```typescript
// register.component.ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb     = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value); // { username, email, password }
      this.router.navigate(['/dashboard']);
    }
  }
}
```

---

## Slide 22: `setValue()` and `patchValue()` — Pre-Populating Fields

When you load an edit form, you need to populate the fields with existing data from an API.
`FormGroup` gives you two methods for this.

```typescript
// After fetching a user record from your API:
const user = { username: 'alice', email: 'alice@example.com', password: '' };

// setValue() — sets EVERY field at once. Throws an error if you miss a key.
this.form.setValue({
  username: user.username,  // all three keys required — no partial updates
  email:    user.email,
  password: user.password,
});

// patchValue() — updates ONLY the fields you provide. Ignores missing keys.
this.form.patchValue({
  username: user.username,  // email and password stay exactly as they are
});
```

**Rule of thumb:**
- Use `setValue()` when you have a complete object that matches the form shape exactly
- Use `patchValue()` when you only want to update some fields, or when the API response has extra keys you don't need

> A common pattern in create/edit forms: `ngOnInit` fetches the record by ID from a service, then calls `this.form.patchValue(record)` to populate the fields without worrying about extra API fields.

---

## Slide 23: What `FormArray` Is

A `FormArray` is an **ordered list of controls** that can grow or shrink at runtime.

Use it when users can add or remove items — like multiple phone numbers, email addresses, or promo codes.

```typescript
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { inject } from '@angular/core';

private readonly fb = inject(FormBuilder);

readonly form = this.fb.group({
  name:   ['', Validators.required],
  // fb.array() creates a FormArray — starts with one empty control
  phones: this.fb.array([
    new FormControl('', Validators.required) // initial row
  ]),
});

// Typed getter — gives direct access to the array without casting everywhere.
// TypeScript infers form.get('phones') as AbstractControl | null, which doesn't
// have push() or removeAt(). This getter does the cast once so the rest of the
// class can call this.phones.push() and this.phones.removeAt() cleanly.
get phones(): FormArray {
  return this.form.get('phones') as FormArray;
}
```

> `FormArray` acts just like a regular JavaScript array: it has `.length`, `.push()`, `.removeAt()`, and `.at()`.

---

## Slide 24: `FormArray.push()` — Adding Controls

```typescript
// Add a new empty phone number field when the user clicks "Add phone"
addPhone(): void {
  // push() appends a new FormControl to the end of the array
  this.phones.push(new FormControl('', Validators.required));
}
```

```html
<!-- Trigger the add -->
<button type="button" (click)="addPhone()">+ Add phone number</button>
```

> Always use `type="button"` on add/remove buttons inside a `<form>`. Browsers treat any `<button>` without an explicit type as `type="submit"` by default, which would trigger form submission instead of adding a row.

---

## Slide 25: `FormArray.removeAt()` — Removing Controls

```typescript
// Remove the control at a specific index
removePhone(index: number): void {
  // removeAt() splices out the control at position `index`
  this.phones.removeAt(index);
}
```

```html
<!-- Show a remove button next to each phone field -->
@for (phone of phones.controls; track $index) {
  <div>
    <input [formControlName]="$index" type="tel" placeholder="Phone number" />
    <!-- Pass $index to know which control to remove -->
    <button type="button" (click)="removePhone($index)">Remove</button>
  </div>
}
```

> Use `$index` as the `track` expression for `FormArray` loops. The controls are positional — there's no stable unique ID to track by.

---

## Slide 26: Iterating a `FormArray` in the Template

You must use `formArrayName` on the container and `[formControlName]="$index"` on each input.

```html
<!-- form = your top-level FormGroup -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">

  <input formControlName="name" placeholder="Your name" />

  <!-- formArrayName must match the key in your FormGroup -->
  <div formArrayName="phones">

    @for (control of phones.controls; track $index) {
      <div>
        <!-- [formControlName]="$index" connects this input to array position -->
        <input [formControlName]="$index" type="tel" placeholder="Phone number" />

        @if (control.invalid && control.touched) {
          <span>Phone number is required.</span>
        }

        <button type="button" (click)="removePhone($index)">✕</button>
      </div>
    }

  </div>

  <button type="button" (click)="addPhone()">+ Add phone</button>
  <button type="submit" [disabled]="!form.valid">Save</button>

</form>
```

---

## Slide 27: What a `ValidatorFn` Is

A custom validator is just **a function with a specific signature**.

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// The contract:
// - Receives the control being validated
// - Returns null if valid
// - Returns an object like { errorKey: true } if invalid
const myValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const value = control.value as string;

  if (!value || value.includes('@')) {
    return null; // valid — return null
  }

  // invalid — return an object; the key is what you'll look up in the template
  return { noAtSign: true };
};
```

> The error key you pick (`noAtSign`, `passwordMismatch`, `usernameTaken`, etc.) becomes `control.errors?.['yourKey']` in the template.

---

## Slide 28: The Validator Contract

The single most important rule:

| Return value | Meaning |
|---|---|
| `null` | ✅ Control is **valid** |
| `{ errorKey: true }` | ❌ Control is **invalid** |

```typescript
// Valid — field passes
return null;

// Invalid — simple flag
return { required: true };
return { passwordMismatch: true };

// Invalid — with extra data attached to the error object
return { minAge: { required: 18, actual: 16 } };
// Access the extra data in the template:
// form.get('age')?.errors?.['minAge']?.required  → 18
// form.get('age')?.errors?.['minAge']?.actual    → 16
// Useful when your error message needs to show the expected value
```

```html
<!-- In the template, check the key you returned -->
@if (form.errors?.['passwordMismatch']) {
  <span>Passwords do not match.</span>
}
```

> You can attach a validator to a `FormControl` (validates one field) **or** to a `FormGroup` (can compare multiple fields to each other). The right placement depends on how many fields the validator needs to read — more on that next.

---

## Slide 29: Password Match Validator

A cross-field validator must sit on the **`FormGroup`**, not on an individual control — because it needs to read two fields.

```typescript
// password-match.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Returns a ValidatorFn — a function that returns a function
export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {

    // group is the FormGroup this validator is attached to
    const password        = group.get('password')?.value as string;
    const confirmPassword = group.get('confirmPassword')?.value as string;

    // Values match — valid
    if (password === confirmPassword) {
      return null;
    }

    // Values differ — invalid
    return { passwordMismatch: true };
  };
}
```

---

## Slide 30: Attaching a Custom Validator

**Where you attach a validator depends on how many fields it reads.**

- **One field** → attach to the `FormControl` in its validators array
- **Multiple fields** → attach to the `FormGroup` in the options object

```typescript
import { passwordMatchValidator } from './password-match.validator';

readonly form = this.fb.group(
  {
    password:        ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  },
  // Group-level validator: needs to read both password and confirmPassword
  { validators: passwordMatchValidator() }
);

// For a single-field custom validator, attach it to the control instead:
// username: ['', [Validators.required, myControlLevelValidator]]
// ↑ no factory call needed if the validator IS the function (not a function returning a function)
```

```html
<!-- Group-level errors live on form.errors, not on a child control -->
@if (form.errors?.['passwordMismatch'] && form.get('confirmPassword')?.touched) {
  <span>Passwords do not match.</span>
}
```

---

## Slide 31: What an `AsyncValidatorFn` Is

An async validator is like a sync validator, but it returns a **`Promise` or `Observable`** instead of a value directly.

Use it when validation requires a server round-trip — like checking if a username is already taken.

```typescript
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, delay, map } from 'rxjs';

const usernameAvailable: AsyncValidatorFn =
  (control: AbstractControl): Observable<ValidationErrors | null> => {

    // In a real app, swap of().pipe(delay()) for an actual HttpClient call:
    // return this.http.get<{ taken: boolean }>(`/api/check-username/${control.value}`).pipe(
    //   map(res => res.taken ? { usernameTaken: true } : null)
    // );
    // The return type is the same — Angular doesn't care if it's a mock or real HTTP

    // Simulate an HTTP call with a delay
    return of(control.value).pipe(
      delay(500),  // wait 500ms (simulating real HTTP latency)
      map((username: string) =>
        username === 'admin'
          ? { usernameTaken: true }  // invalid — name is taken
          : null                     // valid — name is available
      )
    );
  };
```

---

## Slide 32: Async Validator — Usage

Pass the async validator as the **third argument** to `FormControl` or `fb.group()`.

```typescript
readonly form = this.fb.group({
  username: [
    '',                                    // initial value (1st arg)
    [Validators.required,                  // sync validators (2nd arg)
     Validators.minLength(3)],
    [usernameAvailable]                    // async validators (3rd arg)
    // usernameAvailable is already a validator function — no () needed here.
    // Compare: passwordMatchValidator() on the previous slide IS a factory —
    // you call it to get the validator. usernameAvailable IS the validator itself.
  ],
  email: ['', [Validators.required, Validators.email]],
});
```

```html
<input formControlName="username" />

@if (form.get('username')?.status === 'PENDING') {
  <span>Checking availability…</span>
}
@if (form.get('username')?.errors?.['usernameTaken']) {
  <span>That username is taken. Please choose another.</span>
}
```

---

## Slide 33: Pending State — Loading Indicator

Angular sets a control's `status` to `'PENDING'` while an async validator is running.
Use this to show a spinner so users know something is happening.

```html
<div class="field">
  <input formControlName="username" placeholder="Choose a username" />

  <!-- status === 'PENDING' → async validator is still running -->
  @if (form.get('username')?.status === 'PENDING') {
    <span class="spinner">Checking…</span>
  }

  @if (form.get('username')?.errors?.['usernameTaken'] &&
       form.get('username')?.status !== 'PENDING') {
    <span class="error">Username is already taken.</span>
  }

  @if (form.get('username')?.valid) {
    <span class="success">✓ Available</span>
  }
</div>
```

> Angular runs async validators **only after all sync validators pass first**. If the field is empty and `required` fails, the HTTP call is skipped entirely — no unnecessary requests fired while the user is still typing.

---

## Slide 34: Disabling Submit Until Valid

The simplest UX improvement you can make: disable the button until the form is valid.

```html
<!-- [disabled] evaluates to true → button is greyed out and non-clickable -->
<button type="submit" [disabled]="!form.valid">Submit</button>
```

For async validators, also check that nothing is still pending:

```html
<!-- Disable while invalid OR while an async validator is still running -->
<button
  type="submit"
  [disabled]="!form.valid || form.status === 'PENDING'"
>
  Register
</button>
```

> This is a UX enhancement, not a security measure. Always validate on the server. A user can remove the `disabled` attribute in DevTools.

---

## Slide 35: `markAllAsTouched()` — Revealing All Errors at Once

Disabling the submit button is one approach. Another common pattern is to keep the button always enabled and **reveal all validation errors at once** when the user clicks submit.

```typescript
onSubmit(): void {
  if (this.form.invalid) {
    // Mark every control as touched — triggers error messages for every
    // field the user skipped, even if they never focused it
    this.form.markAllAsTouched();
    return; // stop here — don't submit
  }

  // form is valid — proceed with submission
  this.userService.register(this.form.value).subscribe({ ... });
}
```

```html
<!-- Button is always clickable — errors appear on first submit attempt -->
<button type="submit">Register</button>
```

> Use **`[disabled]="!form.valid"`** when you want to block submission silently.
> Use **`markAllAsTouched()`** when you want to show the user exactly what needs fixing.
> Pick one approach per form — mixing both on the same form is confusing.

---

## Slide 36: `(ngSubmit)` and the Submission Flow

`(ngSubmit)` fires when the user submits the form (Enter key or submit button click).

```html
<!-- (ngSubmit) calls your handler method — prefer it over (click) on the button -->
<!-- (ngSubmit) handles keyboard submission and is the idiomatic Angular approach -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  ...
  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

The full submission lifecycle:

```
1. User clicks Submit (or presses Enter)
2. (ngSubmit) fires → onSubmit() is called
3. Guard: if form.invalid → markAllAsTouched() and return early
4. Read form.value → build request payload
5. Call service method → sends HTTP POST/PUT
6. On success → router.navigate(['/success'])
7. On error → show error message; keep form values so user can fix and retry
```

---

## Slide 37: Reading Form Values

`form.value` gives you a **plain JavaScript object** shaped like your `FormGroup`.

```typescript
readonly form = this.fb.group({
  username: ['alice'],
  email:    ['alice@example.com'],
  address: this.fb.group({   // nested FormGroup
    street: ['123 Main St'],
    city:   ['Springfield'],
  }),
});

// form.value produces a plain object matching the FormGroup structure:
// {
//   username: 'alice',
//   email: 'alice@example.com',
//   address: {
//     street: '123 Main St',
//     city: 'Springfield'
//   }
// }

// Get a single value
this.form.get('username')?.value;         // 'alice'
this.form.get('address.city')?.value;     // 'Springfield' — dot notation for nested
```

---

## Slide 38: Form Submission — Complete Example

```typescript
// register.component.ts
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb          = inject(FormBuilder);
  private readonly router      = inject(Router);
  private readonly userService = inject(UserService);

  readonly errorMessage = signal('');  // surface API errors to the template

  readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // reveal all errors before returning
      return;
    }

    this.userService.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err: Error) => this.errorMessage.set(err.message),
    });
  }
}
```

---

## Slide 39: `toSignal(form.valueChanges)` — Live Form Preview

You already used `toSignal()` to convert HTTP observables into signals (Day 3A).
`form.valueChanges` is just another Observable — the same pattern applies.

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({ username: [''], email: [''], password: [''] });

  // Converts valueChanges Observable → Signal
  // initialValue gives the signal a starting value (the form's current state at init)
  // Angular cleans up the subscription automatically when the component is destroyed
  readonly formValues = toSignal(this.form.valueChanges, {
    initialValue: this.form.value,
  });
}
```

```html
<!-- formValues() reacts to every keystroke — no subscription, no cleanup needed -->
<section class="preview">
  <p>Username: {{ formValues().username }}</p>
  <p>Email: {{ formValues().email }}</p>
</section>
```

---

## Slide 40: `computed()` Derived from Form Signals

Because `formValues` is a signal, you can derive other signals from it using `computed()`.

```typescript
import { computed } from '@angular/core';

// formValues is a Signal produced by toSignal(form.valueChanges)
readonly formValues = toSignal(this.form.valueChanges, {
  initialValue: this.form.value,
});

// computed() re-runs automatically whenever formValues() changes
readonly filledFieldCount = computed(() => {
  const values = Object.values(this.formValues() ?? {});
  // Count fields that have a non-empty value
  return values.filter(v => v !== '' && v != null).length;
});

readonly totalFields = 3;

// Derived from filledFieldCount, which derives from formValues,
// which derives from form.valueChanges — the whole chain is reactive
readonly completionPercent = computed(() =>
  Math.round((this.filledFieldCount() / this.totalFields) * 100)
);
```

```html
<div class="progress-bar">
  <div [style.width.%]="completionPercent()"></div>
  <span>{{ completionPercent() }}% complete</span>
</div>
```

---

## Slide 41: Password Strength with `computed()`

A practical example: a password-strength meter that reacts to the password field in real time.

The full reactive chain: `form` → `valueChanges` Observable → `toSignal()` → `formValues` signal → `computed()` → `passwordStrength` signal. Each layer derives automatically from the one before it — no subscriptions anywhere.

```typescript
readonly passwordStrength = computed((): 'weak' | 'medium' | 'strong' => {
  // formValues() is the signal produced by toSignal(form.valueChanges)
  const password = this.formValues()?.password ?? '';

  const hasLength   = password.length >= 8;
  const hasUpper    = /[A-Z]/.test(password);
  const hasNumber   = /\d/.test(password);
  const hasSpecial  = /[!@#$%^&*]/.test(password);

  // Count how many conditions are met
  const score = [hasLength, hasUpper, hasNumber, hasSpecial]
    .filter(Boolean).length;

  if (score <= 1) return 'weak';
  if (score <= 3) return 'medium';
  return 'strong';
});
```

```html
<!-- Reacts to every keystroke — no subscription, no manual wiring -->
<div [class]="'strength-' + passwordStrength()">
  Password strength: {{ passwordStrength() }}
</div>
```

---

## Slide 42: ⚠️ WARNING — `ngModel` Inside a Reactive Form

This is one of the most common mistakes beginners make when learning both form systems at once.

**The error:**
```
Error: If ngModel is used within a form tag, either the name attribute must be set
or the form control must be defined as 'standalone' in ngModelOptions.
```
Or, in stricter Angular versions:
```
NG0303: No value accessor for form control name: 'email'
```

**What causes it:**
```html
<!-- ❌ WRONG — mixing reactive form with ngModel -->
<form [formGroup]="form">
  <input [(ngModel)]="email" name="email" />  <!-- ngModel inside formGroup -->
</form>
```

**The fix — use `formControlName` instead:**
```html
<!-- ✅ CORRECT — reactive form uses formControlName -->
<form [formGroup]="form">
  <input formControlName="email" />
</form>
```

> Inside a `[formGroup]`, **every input must use `formControlName`**. Never mix `ngModel` into a reactive form.

---

## Slide 43: Coming Up — Modern vs Classic Angular

You've just written everything in modern Angular.

Before moving on, let's take a quick look at how the same form concepts looked in **classic (legacy) Angular** — the style you'll see in older codebases, Stack Overflow answers, and tutorials written before Angular 17.

**You should write modern code.**
The legacy slides exist so you can **recognize** classic patterns when you encounter them — and know how to upgrade them.

---

## Slide 44: `FormsModule` — Modern vs Legacy

**Modern (standalone component):**
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule], // ✅ scoped to this component only — explicit, traceable
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent { email = ''; }
```

---

**Legacy (NgModule — global import):**
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ContactFormComponent],
  imports: [BrowserModule, FormsModule], // available to ALL declared components
  bootstrap: [AppComponent],
})
export class AppModule {}
```

> The pain: if `FormsModule` was missing here, `ngModel` silently did nothing in every component. No error — just broken two-way binding that was very hard to trace.

---

## Slide 45: `ReactiveFormsModule` — Modern vs Legacy

**Modern (standalone component):**
```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule], // ✅ scoped to this component
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder); // inject() — no constructor needed
  readonly form = this.fb.group({ username: ['', Validators.required] });
}
```

---

**Legacy (NgModule + constructor injection):**
```typescript
// app.module.ts — ReactiveFormsModule registered globally
imports: [BrowserModule, ReactiveFormsModule],

// register.component.ts — FormBuilder via constructor
export class RegisterComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) { // ← constructor injection
    this.form = this.fb.group({ username: ['', Validators.required] });
  }
}
```

> Modern code replaces constructor injection with `inject()` and moves the module import directly onto the component. Two fewer things to hunt down when reading unfamiliar code.

---

## Slide 46: Form Values as Signals — Modern vs Legacy

**Modern — one line, automatic cleanup:**
```typescript
// toSignal() handles the subscription and tears it down when the component is destroyed
// No ngOnInit, no ngOnDestroy, no stored Subscription object
readonly formValues = toSignal(this.form.valueChanges, {
  initialValue: this.form.value,
});
```

---

**Legacy — manual subscription with manual cleanup:**
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class RegisterComponent implements OnInit, OnDestroy {
  formValues: any;
  private sub!: Subscription; // must store it so we can unsubscribe later

  ngOnInit(): void {
    this.sub = this.form.valueChanges.subscribe(values => {
      this.formValues = values; // assign to trigger change detection
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe(); // forget this once → memory leak
  }
}
```

> Two lifecycle hooks, a stored subscription property, and a memory leak if `ngOnDestroy` was ever skipped. `toSignal()` eliminates all of it in one line.

---

## Slide 47: `FormArray` — No Change Between Legacy and Modern

`FormArray`'s API is **identical** in legacy NgModule apps and modern standalone components.

```typescript
// This code works the same in Angular 2 through Angular 21
const phones = this.fb.array([
  new FormControl('', Validators.required),
]);

phones.push(new FormControl(''));
phones.removeAt(0);
phones.at(1).value;
```

What changed in modern Angular:
- `ReactiveFormsModule` is now imported in the component's `imports` array (not in NgModule)
- `FormBuilder` is obtained via `inject(FormBuilder)` (not via constructor)
- The `FormArray` class itself and its methods: **unchanged**

> If you find an old Stack Overflow answer about `FormArray` — the code will almost certainly still work. Just update the module imports and DI style.

---

## Slide 48: Key Takeaways

- **Two form systems, one rule:** template-driven for simple forms, reactive for anything complex or dynamic — never mix them in the same form
- **Reactive forms give you full programmatic control:** `FormGroup`, `FormControl`, `FormArray`, and `FormBuilder` let you build, validate, and mutate forms entirely in TypeScript; use `setValue()` to populate all fields at once and `patchValue()` to update only what you have
- **Custom validators are just functions:** return `null` for valid, return `{ errorKey: true }` for invalid — attach to the control if it reads one field, attach to the group if it reads multiple
- **`toSignal(form.valueChanges)` is the bridge:** it turns your reactive form into Angular's signal world, letting you use `computed()` to derive live state like password strength or form completion percentage without a single manual subscription