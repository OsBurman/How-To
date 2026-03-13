Slide 1: Title Slide
Alright, welcome to Day 4 Part B. This session is all about forms.
Forms are everywhere. Login screens, registration flows, checkout pages, search filters, settings panels — if a user is typing something and submitting it, there's a form involved. Angular has two completely separate systems for building them, and today you're going to learn both.
By the end of this session you'll be able to build a form from scratch, validate it, handle submission, and wire live form data directly into signals. That last part is where things get really interesting — you'll see how everything we learned about signals on Day 2 applies directly to forms.
Let's get into it.

Slide 2: What You'll Be Able to Do
Here's what you're walking away with today.
You'll build template-driven forms — the simpler system, where the HTML does most of the work. You'll build reactive forms — the more powerful system, where your TypeScript class owns the form logic. You'll create dynamic form fields with FormArray, which lets users add and remove rows at runtime. You'll write custom validators, both sync and async. And you'll connect a reactive form to signals using toSignal, which means you can derive things like a password strength meter or a completion percentage using computed() — without a single manual subscription.
A lot of ground to cover. Let's start from the top.

Slide 3: Two Form Systems in Angular
The very first thing you need to understand about Angular forms is that there are two completely separate systems, and they do not mix.
This is not like choosing between two slightly different APIs. These are two distinct mental models. You pick one per form and you stay in that system for the entire form.
The first system is template-driven. In template-driven forms, the logic lives mostly in your HTML template. You add directives like ngModel and required directly to your inputs, and Angular builds a form model behind the scenes. It requires FormsModule.
The second is reactive. In reactive forms, the logic lives in your TypeScript class. You build form objects in code — FormGroup, FormControl — and the template connects to them. It requires ReactiveFormsModule.
The tradeoffs are in this table. Reactive forms are harder to set up but much more testable and much better at handling dynamic fields. Template-driven is quicker for simple stuff but gets messy fast.
Both are fully supported in Angular 17 through 21. You need to know both.

Slide 4: When to Use Each System
So when do you actually reach for each one?
Template-driven is the right call when your form is short and simple. A login form, a newsletter signup, a contact form — three or four fields, nothing dynamic. You don't need to add or remove fields at runtime. You just want to write a little HTML and get it working quickly.
Reactive is the right call for basically everything else. If fields need to appear and disappear based on what the user does — reactive. If you need to compare two fields against each other, like a password and confirm password — reactive. If you want to watch the form's values as a stream of data — reactive. If you want to unit test your form logic — reactive.
Here's the honest advice: most real production apps use reactive forms for anything non-trivial. Learn template-driven because you'll encounter it, and it's quick for small things. But reactive is where you'll spend most of your time. When in doubt, use reactive.

Slide 5: What Template-Driven Forms Are
Let's start with template-driven.
The key idea here is that the template does the heavy lifting. You're not writing form objects in TypeScript. You're adding Angular directives to your HTML elements, and Angular reads those directives and constructs a form model automatically in the background.
Your TypeScript class is basically just a bag of properties. name = '', email = ''. Simple strings. No FormControl, no FormGroup.
The form's validity state, whether fields have been touched, error information — all of that lives on template references. You'll get to #email="ngModel" in a moment, and that's where you access all of that state from the template.
This feels very natural when you first see it, especially if you've used other frameworks. For small forms it's genuinely quick and clean. The problem is that it doesn't scale well. Once your form has conditional logic, cross-field validation, or dynamic fields, the template becomes a mess. That's exactly what reactive forms solve — but we'll get there.

Slide 6: ngModel — Binding an Input
ngModel is the core directive of template-driven forms. It creates a two-way binding between an input element and a property on your component.
Look at the component class. There's nothing special here — just email = ''. A plain string property. And in the imports array, you need FormsModule. That's the module that provides ngModel. If you forget to add it, nothing will break loudly — Angular just won't know what ngModel means and the binding silently won't work.
In the template, [(ngModel)]="email" is the two-way binding syntax. The square brackets bind the value down from the property to the input. The parentheses bind events up from the input back to the property. Together, [()] means both directions at once. As you type, this.email updates. If you programmatically change this.email, the input updates too.
Now the important note about name="email". This is required whenever ngModel is used inside a <form> tag. Angular uses the name attribute as the key to register this control with the form's model. If you forget it, Angular silently fails to register the control. The form won't track it. Your overall form validity will be wrong. Your submit handler will see incomplete data. And no error is thrown, which makes it genuinely hard to track down. So remember: name attribute, always.

Slide 7: ngForm — The Form Directive
Here's something that happens automatically that you should be aware of. The moment you add a <form> tag and FormsModule is imported, Angular automatically attaches a directive called NgForm to that form element.
NgForm tracks the validity, dirty state, and submitted state of the entire form — as one unit.
To get a reference to it, you use a template reference variable: #myForm="ngForm". That gives you the NgForm instance. Then in your (ngSubmit) handler, you can pass it in: onSubmit(myForm).
In the submit handler, form.value gives you a plain object with all the field values. form.valid tells you if every control inside is currently valid.
And [disabled]="!myForm.valid" on the button is the simplest way to prevent submission of an invalid form — we'll come back to this pattern.

Slide 8: #field Template References
This is the mechanism that gives you access to individual field state in a template-driven form.
When you write #email="ngModel" on an input, you're creating a template reference variable called email that holds the NgModel instance for that specific control. That instance knows everything about the field: is it valid? Has the user touched it? What errors are currently failing?
Look at the properties shown here. valid and invalid are opposites — one is true when the other is false. touched means the user focused the field and then left it — clicked somewhere else or tabbed away. dirty means the value has changed from its initial value at some point. And errors is either null when valid, or an object containing the names of failing validators as keys.
You're going to use this combination — #field.invalid && #field.touched — constantly. We'll see it in practice on the next slide.

Slide 9: HTML5 Validators
Angular understands standard HTML5 validation attributes and wires them into the form model for you automatically.
required — the field must have a value. minlength and maxlength — character count bounds. email — the value must look like a valid email address. pattern — the value must match a regex you provide.
Each of these attributes, when Angular processes them, adds a corresponding key to field.errors. So when required fails, field.errors will contain { required: true }. When minlength fails, you'll get { minlength: { requiredLength: 3, actualLength: 1 } } — it carries extra data about what was expected versus what was actually provided.
This is what you'll check in your error messages. You don't have to do anything special — just add the attribute, and Angular handles the rest.

Slide 10: Showing Error Messages
This is the pattern you'll use in every template-driven form to display validation messages.
The outer condition is: emailField.invalid && emailField.touched. Both conditions must be true before you show any error. invalid alone isn't enough — the field starts invalid when it's empty, and you don't want to show "Email is required" the moment the page loads before the user has done anything. The touched condition means the user has at least interacted with the field and left it. That's the right moment to give feedback.
Inside that outer @if, you check specific error keys. emailField.errors?.['required'] — the optional chaining is necessary because errors is null when the field is valid, and trying to access a property on null would throw. The optional chaining safely returns undefined instead, which is falsy, so the message stays hidden.
Each specific error gets its own message. You don't show one generic "Invalid" message — you tell the user exactly what's wrong.

Slide 11: Template-Driven Form — Full Class
Here's the full component class for a template-driven contact form.
Notice how thin this is. Three properties — name, email, message — all plain strings. No form objects, no validators in code.
The submit handler receives the NgForm instance, checks form.valid as a safety guard, logs form.value which gives you a plain object with all the field values, and calls form.reset() on success. reset() clears all values and resets the validation state — touched, dirty, everything goes back to initial.
This is the full TypeScript side of a template-driven form. Everything else lives in the template.

Slide 12: Template-Driven Form — Template
And here's the template that goes with it.
#contactForm="ngForm" captures the NgForm instance. (ngSubmit)="onSubmit(contactForm)" calls the handler and passes it in.
Each field follows the same pattern: [(ngModel)] for the two-way binding, a name attribute, HTML5 validator attributes, a #ref="ngModel" template reference, and then error messages below gated on ref.invalid && ref.touched.
The submit button uses [disabled]="!contactForm.valid" — disabled until every control in the form passes its validators.
Take a look at how this all fits together. The template is doing a lot of work here. For a three-field form, this is manageable. Imagine this with ten fields and cross-field validation. That's when you want reactive forms.

Slide 13: What Reactive Forms Are
Let's switch to reactive forms. The core idea is the opposite of template-driven: in reactive forms, the TypeScript class owns the form model.
You create FormGroup and FormControl objects in your class. Those objects hold the values, the validators, and the state. The template's job is just to connect to those objects using directives.
Because the form logic is in TypeScript, you can manipulate it programmatically. Set a value, add a control, reset the whole form, subscribe to changes — all from code. You can also unit test it without a DOM, which is a significant advantage.
The template becomes thinner. The logic stays where it belongs — in the class, where it's readable and testable.

Slide 14: FormGroup — Grouping Controls
A FormGroup is a collection of named controls treated as a single unit. It has its own valid, invalid, touched, and value properties — but those properties reflect the combined state of all its children. The group is valid only when every control inside it is valid.
Look at how it's created. In the component class body, new FormGroup({...}) with a key for each field. The key you give a control here — username, email, password — must exactly match the formControlName you use in the template. A mismatch causes a runtime error.
Then in logState(), you can see how you access the group. this.form.value gives you a plain object. this.form.valid is true or false. this.form.get('email')?.value accesses a single control by its key, using optional chaining because get() can return null.
We're showing the manual new FormGroup() syntax here so you understand what's actually happening. In practice, you'll almost always use FormBuilder instead — it's much shorter. That's the next slide.

Slide 15: FormControl — A Single Field
A FormControl is the atomic unit of a reactive form. It tracks one field's value, validity state, and interaction state.
Look at all the properties it exposes. value is the current value. valid and invalid are the validation state. touched means the user focused and left. dirty means the value has changed. errors is either null or an object of failing validator keys.
You also have programmatic methods. setValue() sets a specific value. reset() clears the value and resets touched and dirty back to pristine. disable() greys out the field and Angular stops validating it while it's disabled.
You'll interact with FormControl instances constantly through this.form.get('fieldName') — that returns the control, and then you call these properties on it.

Slide 16: FormBuilder — The Shorthand
FormBuilder is a service that creates FormGroup and FormControl objects for you with less boilerplate.
Instead of new FormGroup({ username: new FormControl('', [...validators]) }), you write fb.group({ username: ['', [...validators]] }). The array syntax — [initialValue, validators] — is much cleaner.
You get FormBuilder using inject(FormBuilder) in the class body. No constructor needed. This is the same inject() function you've been using for services since Day 3.
The pattern fb.group({ key: [initialValue, validators] }) is what you'll write for every reactive form from here on. Get familiar with it.

Slide 17: Built-In Validators
Angular's Validators object is where your standard validation functions live.
You've already seen required and email. Here's the full set you'll use most often.
Validators.minLength(3) and Validators.maxLength(20) — character count bounds. Validators.min(18) and Validators.max(120) — numeric bounds, for number inputs. Validators.pattern(/^\d{5}$/) — a regex the value must match.
When you pass multiple validators, wrap them in an array. When it's just one, you can pass it directly without an array.
The bottom of the slide shows how to read specific error data. minlength doesn't just tell you the field failed — it tells you what length was required and what length was actually provided. You can use that in your error message.

Slide 18: valueChanges — The Form as an Observable
Every FormGroup and every individual FormControl exposes a property called valueChanges. It's an Observable that emits a new value every time any field in the form changes — on every single keystroke.
This is one of the most powerful things about reactive forms. Your form data is a stream. You can treat it like any other Observable — pipe it, debounce it, switch-map it, feed it into a search, whatever you need.
Here you can see subscribing manually in ngOnInit. The group-level valueChanges emits the whole form value object. A single control's valueChanges emits just that field's value.
This manual subscription approach is shown here for understanding. In real code, you almost always want toSignal(form.valueChanges) instead — which you'll see later in this session. No manual subscription, no cleanup, same result.

Slide 19: Reactive Form — Wiring the Template
Here's how you connect a reactive form's TypeScript model to your HTML template.
Two directives do the work. [formGroup]="form" on the <form> element tells Angular which FormGroup this form maps to. formControlName="username" on each input tells Angular which control inside that group this input corresponds to.
Notice what's missing compared to template-driven. No [(ngModel)]. No name="" attributes. No #ref="ngModel" template references. In a reactive form, the TypeScript class is the source of truth. The template is just a view layer that connects to it.
The formControlName value must exactly match the key you used in fb.group(). Case-sensitive, no spaces. A mismatch gives you a runtime error.

Slide 20: Reactive Form — Showing Errors
In a reactive form you don't have #usernameField="ngModel" to lean on. Instead, you access the control through the form group: form.get('username').
The outer condition is the same as template-driven — invalid && touched. You don't want to show errors before the user has interacted with the field.
form.get('username') returns the FormControl or null if the key doesn't exist — which is why you always need optional chaining with ?.. Then .errors?.['required'] checks for that specific error key.
For minlength, notice you can access the extra data it carries. errors?.['minlength']?.requiredLength gives you the number that was required — so you can write the message "Must be at least 3 characters" dynamically rather than hardcoding the number.
This is the key difference from template-driven. In template-driven, error state lived on #ref.errors. In reactive, it lives on form.get('fieldName')?.errors. Different syntax, same concept.

Slide 21: Reactive Form — Full Class Example
Here's the complete reactive form component class. This is the pattern you'll write dozens of times.
inject(FormBuilder) and inject(Router) — no constructor, just inject(). The form is defined as a readonly class field using fb.group(). Three fields, each with an array of validators.
The submit handler does a quick validity guard, logs the form value, and navigates. Form values come out as a plain object matching the structure of your FormGroup — { username, email, password }.
Simple, clean, everything in one place. The template just connects to it.

Slide 22: setValue() and patchValue() — Pre-Populating Fields
You'll need this the moment you build an edit form — which is probably the most common form pattern in real apps. User clicks "Edit", you fetch the existing record from your API, and you need to populate the form fields with that data.
setValue() sets every field at once. It requires a complete object that matches the form shape exactly. If you pass it an object with a missing key, it throws. Use this when your API response matches your form structure perfectly.
patchValue() only updates the fields you provide. It ignores anything missing. Use this when you have a partial update, or when your API response has extra fields you don't need to put in the form.
In practice, patchValue() is safer and more forgiving, so most developers reach for it by default. The common pattern is: ngOnInit fetches the record by ID, then calls this.form.patchValue(record). The form populates, the user edits, you submit.

Slide 23: What FormArray Is
FormArray solves a specific problem: what do you do when the user can add or remove fields at runtime?
Think about a form where the user can add multiple phone numbers. Or tag a post with multiple topics. Or add line items to an invoice. Each of those is a list of controls that grows and shrinks as the user interacts. That's exactly what FormArray is for.
You create it with fb.array([...]) and pass in an initial array of controls — usually just one to start.
Look at the getter method at the bottom. get phones(): FormArray. This exists purely to solve a TypeScript problem. When you call this.form.get('phones'), TypeScript infers the return type as AbstractControl | null. AbstractControl doesn't have push() or removeAt() — those are specific to FormArray. So the getter does the cast once: return this.form.get('phones') as FormArray. Now everywhere else in the class, this.phones.push() and this.phones.removeAt() just work, without you having to cast every time.

Slide 24: FormArray.push() — Adding Controls
Adding a field is one line: this.phones.push(new FormControl('', Validators.required)).
push() appends a new FormControl to the end of the array. The form re-renders, the template shows a new input. Angular handles the rest.
The button note is important: always use type="button" on add and remove buttons inside a form. Browsers treat any <button> without an explicit type attribute as type="submit" by default. Without type="button", clicking "Add phone" would trigger form submission instead of adding a row. This trips people up constantly. Make it a habit.

Slide 25: FormArray.removeAt() — Removing Controls
Removing is equally simple: this.phones.removeAt(index). Pass in the position of the control you want to remove, and it's gone. The form updates, the template re-renders.
In the template, you're looping over phones.controls using @for and $index. Each remove button passes $index to the handler so it knows which position to remove.
About the track $index note — FormArray controls are positional. There's no unique ID on each control. So $index is the only sensible thing to track by here. Normally you'd track by a stable ID, but for a FormArray of simple string controls, position is all you have.

Slide 26: Iterating a FormArray in the Template
Here's the full template wiring for a FormArray.
Two things to notice. First, formArrayName="phones" on the container div — this tells Angular that this section maps to the phones array in your FormGroup. The value must match the key you used in fb.group().
Second, [formControlName]="$index" on each input. This is the reactive equivalent of giving each input a name — the position in the array is the identifier. Notice it's a property binding [formControlName] not a plain attribute formControlName, because the value is dynamic — it's the loop index, not a literal string.
Everything else should look familiar. Error checking on control.invalid && control.touched. Remove button with type="button". Add button outside the loop with type="button". Submit button at the bottom.

Slide 27: What a ValidatorFn Is
A custom validator is just a function. That's the whole secret. Angular doesn't need a class, a decorator, or anything special. Just a function with the right signature.
The signature is: takes an AbstractControl, returns ValidationErrors | null. AbstractControl is the base type that FormControl and FormGroup both extend — so your validator works on either.
The body is entirely yours. Inspect the value, run whatever logic you need, and return the result. return null means valid. return { someErrorKey: true } means invalid.
The key name in that return object — noAtSign, passwordMismatch, whatever you call it — becomes the key you check in the template. control.errors?.['noAtSign']. You invent the key, you use the key.

Slide 28: The Validator Contract
This is the single rule that everything else in custom validation flows from. Burn it in.
null means valid. An object means invalid.
The table is the whole story. When your validator function returns null, Angular treats the control as valid. When it returns an object, Angular treats it as invalid and puts that object into control.errors.
The third example on the slide — { minAge: { required: 18, actual: 16 } } — shows that you're not limited to { key: true }. You can attach any data you want to the error object. Angular just puts whatever you return into errors. Then in the template you access it like errors?.['minAge']?.required to get the required value, or errors?.['minAge']?.actual to get what was actually provided. Useful when your error message needs to be specific about the numbers involved.
The note at the bottom: you can attach a validator to a FormControl or to a FormGroup. The right choice depends on how many fields it needs to read. If it reads one field, attach to the control. If it needs to compare two fields — like password and confirm password — it has to go on the group. That's next.

Slide 29: Password Match Validator
Here's the cross-field validator example. This one needs to read two fields — password and confirmPassword — so it must be attached to the FormGroup, not to either control individually.
The outer function passwordMatchValidator() is a factory. It returns the actual validator function. The validator function receives the group — which is the FormGroup it's attached to — and uses group.get() to read both fields.
If they match, return null. Valid. If they don't match, return { passwordMismatch: true }. Invalid.
When this error fires, it shows up on form.errors, not on either child control. So in the template you check form.errors?.['passwordMismatch'], not form.get('password')?.errors?.['passwordMismatch']. Group-level errors live on the group.

Slide 30: Attaching a Custom Validator
The rule is simple. One field? Attach to the control. Multiple fields? Attach to the group.
Look at the code. passwordMatchValidator() — notice the () — is called here because it's a factory function. It returns the validator. We pass the result to the validators property in the options object, which is the second argument to fb.group().
For a single-field custom validator, you'd just add it to the control's array: ['', [Validators.required, myControlLevelValidator]]. No () in that case because the function IS the validator, not a factory that returns one. That's the distinction the comment on slide 32 will reinforce.
The template note at the bottom — group-level errors live on form.errors, not on any child control. This is a common source of confusion. If you're checking form.get('password')?.errors?.['passwordMismatch'] and not seeing it, that's why. Go up to the group level: form.errors?.['passwordMismatch'].

Slide 31: What an AsyncValidatorFn Is
An async validator has the same contract as a sync validator — return null for valid, return an error object for invalid — but instead of returning the value directly, it wraps the result in a Promise or Observable.
Use it when the answer to "is this valid?" requires asking a server. Username availability, email uniqueness, promo code verification — anything where you can't know the answer without an HTTP call.
Look at the commented-out block. In a real app, you'd replace of(control.value).pipe(delay(500)) with an actual this.http.get<...>() call. The return type stays the same — Observable<ValidationErrors | null>. Angular doesn't care whether the Observable wraps a mock or a real HTTP request. The contract is the same either way.
The simulation here uses of() to create an Observable from the value, delay(500) to fake network latency, and map() to convert the username into the validation result. If the value is 'admin', it returns an error object. Otherwise null.

Slide 32: Async Validator — Usage
Async validators go in the third position when creating a control — after the initial value and after the sync validators. This is how Angular knows the difference: sync validators are the second argument, async validators are the third.
The comment here is important. usernameAvailable is passed without (). That's because it's already a validator function — you don't call it to get a validator, it IS the validator. Compare that with passwordMatchValidator() on the previous slides — that one needed () because it was a factory function that returned a validator.
This trips people up. If you defined your async validator as a plain AsyncValidatorFn constant, don't call it. If you defined it as a factory function that returns a validator, do call it. The difference is in how you wrote it.
In the template, form.get('username')?.status === 'PENDING' is how you detect that validation is in progress. We'll look at that in detail on the next slide.

Slide 33: Pending State — Loading Indicator
While an async validator is running, Angular puts the control into a 'PENDING' status. Not 'VALID', not 'INVALID' — 'PENDING'. And you can check for that in the template.
The pattern here shows three states. If status === 'PENDING', show a spinner. If there's a usernameTaken error and we're not pending, show the error message. If the control is valid, show a green checkmark.
That middle condition — checking status !== 'PENDING' when showing the error — is important. Without it, you'd briefly flash the "taken" error message while the validator is still running. You want to wait until validation completes before showing the result.
The note at the bottom: Angular only runs async validators after all sync validators pass first. So if the field is empty and required fails, the HTTP call never fires. If the field is two characters and minLength fails, the HTTP call never fires. Async validators only kick in once the field passes all its synchronous checks. This means no wasted API calls while the user is still typing a short string.

Slide 34: Disabling Submit Until Valid
This is the simplest thing you can do to improve form UX, and it takes one line.
[disabled]="!form.valid" on the submit button. When the form is invalid, the button is greyed out and non-clickable. When every control passes its validators, the button becomes enabled.
If you have async validators, you also need to check for 'PENDING' status — because a form isn't fully validated while async validation is still in flight. The second example shows [disabled]="!form.valid || form.status === 'PENDING'". Both conditions must clear before submission is allowed.
The important caveat: this is a UX enhancement, not a security measure. A determined user can open DevTools, remove the disabled attribute, and submit whatever they want. Always validate on the server. This just makes the happy path cleaner.

Slide 35: markAllAsTouched() — Revealing All Errors at Once
Disabling the submit button is one approach. But there's another common pattern: keep the button always enabled, and when the user clicks it on an invalid form, reveal all the error messages at once.
markAllAsTouched() does exactly that. It marks every control in the form as touched, which triggers all your @if (field.invalid && field.touched) conditions to become true simultaneously. Every field that has a problem suddenly shows its error message.
This is useful when you want the user to see the full picture of what needs fixing rather than discovering errors one by one. Some design teams prefer this approach.
The rule at the bottom is the practical guidance: pick one approach per form. Either use [disabled]="!form.valid" to block submission silently, or use markAllAsTouched() to reveal all errors on submit. Both are valid. Using both on the same form creates a confusing experience.

Slide 36: (ngSubmit) and the Submission Flow
(ngSubmit) is the event you bind to on a <form> element. It fires when the user clicks a submit button or presses Enter.
Prefer (ngSubmit) over putting a (click) handler on the button. (ngSubmit) handles keyboard submission and is the semantically correct Angular approach.
The numbered flow on this slide is the lifecycle of any real form submission. The user submits. Your handler is called. You guard against invalid state. You read form.value to get your payload. You call a service. On success you navigate away. On error you surface the message and let the user try again — you don't reset the form on error, because you want the user to be able to fix and resubmit without re-entering everything.
Memorize this flow. You'll implement it again and again.

Slide 37: Reading Form Values
form.value gives you a plain JavaScript object shaped exactly like your FormGroup definition.
If your form has username, email, and password keys, form.value gives you { username: ..., email: ..., password: ... }. That's the object you send to your API.
For nested FormGroups, the nesting carries through into the value. The example shows an address group nested inside the outer group — form.value has an address property that is itself an object.
You can also get a single control's value with form.get('key')?.value. And for nested groups, form.get('address.city')?.value uses dot notation to drill down.

Slide 38: Form Submission — Complete Example
Here's the full picture — a real submission handler with service injection, error state, and all the pieces wired together.
inject(FormBuilder), inject(Router), inject(UserService). All using inject(), no constructor.
errorMessage is a signal('') — that way the template can react to it and display API errors.
In onSubmit(): check form.invalid and call markAllAsTouched() before returning, so the user sees all errors. If valid, call the service. On success, navigate to the dashboard. On error, set the errorMessage signal — which displays in the template and keeps the form populated so the user can fix and retry.
This is the pattern. Service call, navigate on success, signal the error on failure. Keep it consistent across your app.

Slide 39: toSignal(form.valueChanges) — Live Form Preview
You've already used toSignal() on Day 3 to convert HTTP Observables into signals. The same exact thing applies here. form.valueChanges is an Observable that emits on every keystroke. toSignal() converts it into a signal.
The initialValue option is important. Without it, formValues() would be undefined until the user types something. Passing this.form.value as the initial value means the signal starts with the current state of the form — usually a bunch of empty strings.
Once you have formValues as a signal, you can use it in the template directly with formValues().username, formValues().email, and so on. Angular's change detection handles it. No subscription, no ngOnDestroy, no memory leak risk.
In the template you can see a live preview section that updates on every keystroke. This pattern is really useful for multi-step forms where a sidebar summarizes what the user has entered so far.

Slide 40: computed() Derived from Form Signals
Because formValues is a signal, you can derive other signals from it using computed(). This is the same computed() from Day 2 — nothing new about the API. The only new thing is that the source signal comes from toSignal(form.valueChanges) instead of a manually created signal().
filledFieldCount is a computed() that reads formValues(), gets all the values as an array, and counts how many are non-empty. completionPercent is another computed() that derives from filledFieldCount — a computed derived from a computed derived from a signal derived from an Observable. The whole chain is reactive, and Angular handles all of it.
In the template, completionPercent() drives a CSS progress bar — [style.width.%]="completionPercent()" — and a text display. Every keystroke the user types updates the percentage automatically.

Slide 41: Password Strength with computed()
This is the same pattern as the previous slide, but for a more practical use case.
Before the code, read the chain description at the top. form → valueChanges Observable → toSignal() → formValues signal → computed() → passwordStrength signal. Each layer derives from the one before it. No subscriptions anywhere in the chain. That's the power of combining reactive forms with signals.
The passwordStrength computed reads formValues()?.password, checks four conditions — length, uppercase, number, special character — and scores them. One or fewer conditions met is weak. Two or three is medium. All four is strong.
In the template, [class]="'strength-' + passwordStrength()" dynamically applies a CSS class like strength-weak, strength-medium, or strength-strong, which you style in your CSS. Every keystroke updates the class.

Slide 42: ⚠️ WARNING — ngModel Inside a Reactive Form
This warning slide exists because this mistake is extremely common, and the error message Angular gives you is not obvious about what's causing it.
Here's the scenario. You're building a reactive form. You know template-driven forms use ngModel. You add [(ngModel)] to an input inside a [formGroup]. Angular throws an error.
The error message shown here — read it. Memorize what it looks like. When you see "If ngModel is used within a form tag" or "NG0303: No value accessor for form control name" — that's this. You've mixed the two systems.
The fix is always the same: inside a [formGroup], use formControlName, never ngModel. These two systems don't talk to each other. Pick one, stay in it.

Slide 43: Coming Up — Modern vs Classic Angular
Alright, you've now seen the entire modern Angular forms picture. Everything from here to the end of the session is legacy contrast.
You should write modern code. The code you've been writing today is what you should reach for in new work.
What you're about to see is the classic approach — the style used before Angular 17, and still the dominant style in most production codebases you'll encounter on the job. These slides exist so that when you open a three-year-old codebase, you're not lost. You'll recognize the pattern, know what it's equivalent to, and know how to work with it.

Slide 44: FormsModule — Modern vs Legacy
In modern Angular, FormsModule goes directly in the component's imports array. It's scoped to that component. Explicit. Easy to trace. If a component needs ngModel, it declares that it does.
In legacy NgModule Angular, FormsModule was imported once in AppModule and became globally available to every component in the entire module. Hundreds of components could use ngModel and none of them explicitly said they needed it.
The pain here was real. If FormsModule was missing from AppModule, ngModel silently did nothing in every single component. The binding just didn't work. No error, no warning. You'd spend time debugging what looked like a data binding problem, and eventually discover that one module import was missing in a completely different file.
The modern approach makes the dependency explicit at the component level. Much easier to reason about.

Slide 45: ReactiveFormsModule — Modern vs Legacy
Same story for reactive forms. Modern: ReactiveFormsModule in the component's imports array. Legacy: ReactiveFormsModule in AppModule globally.
But look at the legacy class. FormBuilder was injected via the constructor: constructor(private fb: FormBuilder). This is the classic Angular dependency injection pattern. It still works in modern Angular — Angular never removed constructor injection. But inject() is cleaner and more flexible, especially in contexts outside a class constructor, which is why modern code defaults to it.
When you're reading legacy code and see constructor(private fb: FormBuilder), translate it mentally to private readonly fb = inject(FormBuilder). They do the same thing.

Slide 46: Form Values as Signals — Modern vs Legacy
This is one of the starkest comparisons in the whole session.
Modern, top half: one line. toSignal(form.valueChanges, { initialValue: this.form.value }). Done. No lifecycle hooks. No subscription to manage. Angular cleans it up automatically when the component is destroyed.
Legacy, bottom half: two lifecycle hooks (OnInit and OnDestroy), a stored Subscription property, a manual subscribe, and a manual unsubscribe. Five or six lines minimum. And if you ever forgot to implement ngOnDestroy — or forgot to call unsubscribe() inside it — you had a memory leak. The component was destroyed but the subscription kept running. In a large app with many components being created and destroyed, this accumulated.
toSignal() doesn't just make this shorter. It makes it safer. There's no cleanup code to forget.

Slide 47: FormArray — No Change Between Legacy and Modern
This one is genuinely good news. FormArray's API is identical between legacy and modern Angular. push(), removeAt(), at() — all the same. Same class, same methods, same behavior.
What changed is the surrounding code. Module imports go on the component instead of NgModule. FormBuilder comes from inject() instead of the constructor. But the FormArray itself — unchanged across Angular versions going back years.
This means if you find an old Stack Overflow answer about FormArray — and you will — the actual FormArray code will almost certainly still work. You'll just need to update the module import location and swap the constructor injection for inject().
When the API doesn't change, the legacy contrast is small. That's the case here.

Slide 48: Key Takeaways
Let's close out with the four things to lock in from today.
First: two systems, one rule. Template-driven for simple forms, reactive for anything complex. Never mix them in the same form. This is not a soft preference — mixing them causes runtime errors.
Second: reactive forms give you full programmatic control. FormGroup, FormControl, FormArray, FormBuilder — all in TypeScript, all testable. And setValue() when you have a complete object to populate the form, patchValue() when you have a partial update.
Third: custom validators are just functions. The contract is simple — null for valid, error object for invalid. Attach to the control if it reads one field. Attach to the group if it reads multiple. Async validators follow the same contract but return a Promise or Observable.
Fourth: toSignal(form.valueChanges) is the bridge between the reactive forms world and the signals world. Once your form value is a signal, computed() can derive anything from it — strength indicators, completion percentages, live previews — all reactive, all automatic, no manual subscriptions anywhere.
That's Day 4B. Good work.