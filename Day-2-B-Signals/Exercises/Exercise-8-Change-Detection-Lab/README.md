# Exercise 8 — Change Detection Lab

**Difficulty:** Intermediate | **Type:** Explore

## Goal

This is an observation exercise. The app is already fully working — **don't change the behavior, only add `console.log` calls**. You'll prove that Angular's signal-based change detection is fine-grained: only the expressions that depend on a changed signal re-run.

## What You'll Observe

- A `ClockComponent` that ticks every second (its `time` signal updates once per second)
- A `CounterComponent` with its own `count` signal and a `doubled` computed
- The two components are **completely independent** — they share no signals

## Your Tasks

### Step 1 — Run the app

```bash
npm install
npm start
```

Open `http://localhost:4200` and open the browser DevTools console.

### Step 2 — Add a log to the clock's timer

In `clock/clock.component.ts`, inside the `setInterval` callback (just before `this.time.set(...)`), add:

```typescript
console.log('Clock: time signal updating');
```

Save and watch the console — it should log every second.

### Step 3 — Add a log inside the counter's computed

In `counter/counter.component.ts`, inside the `doubled` computed callback, add:

```typescript
console.log('Counter: doubled computing');
```

Save and watch the console for 10 seconds. **Does `'Counter: doubled computing'` appear every second?**

### Step 4 — Answer in a comment

In `counter.component.ts`, add a comment above the class answering: does `doubled` recompute every second? Why or why not?

### Step 5 — Click the counter buttons

Click Increment and Decrement several times. In the console:
- Does `'Clock: time signal updating'` appear when you click?
- Does `'Counter: doubled computing'` appear when you click?

Write a comment explaining what you observe.

### Step 6 — Add a computed to the clock

In `clock/clock.component.ts`, add:

```typescript
readonly hourMessage = computed(() => {
  console.log('Clock: hourMessage computing');
  return `The hour is ${new Date(this.time()).getHours()}`;
});
```

Display it in `clock.component.html`:

```html
<p class="hour-msg">{{ hourMessage() }}</p>
```

Watch the console. `'Clock: hourMessage computing'` should log every second. `'Counter: doubled computing'` should remain silent.

### Step 7 — Write your explanation

At the top of `counter.component.ts`, add a multi-line comment in your own words explaining what "fine-grained change detection" means based on what you just observed.

## Key Insight

With zone.js (legacy), a timer firing anywhere in the app triggers change detection across the **entire component tree**. With signals, Angular tracks the exact dependency graph — only expressions that read the changed signal re-run. Nothing else.

## Acceptance Criteria

- [ ] `console.log` added in the `setInterval` callback
- [ ] `console.log` added inside the `doubled` computed
- [ ] Student observes `'Counter: doubled computing'` does NOT log every second
- [ ] `hourMessage` computed added to `ClockComponent` with its own log
- [ ] `hourMessage()` displayed in `clock.component.html`
- [ ] Comment in `counter.component.ts` explains fine-grained change detection
