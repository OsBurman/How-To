# Exercise 7 — Volume Slider with model()

**Difficulty:** Intermediate | **Type:** Generate

## Goal

Use `model()` to create a two-way binding between a parent `AppComponent` and a child `VolumeSliderComponent`. Moving the slider in the child updates the parent's display. Clicking "Mute" in the parent moves the slider in the child. Both sides stay in sync automatically because they share the same signal.

## What You'll Practice

- Declaring `model<T>(defaultValue)` in a child component
- Reading the model signal with `volume()` and writing with `volume.set()`
- Using `[(volume)]="volume"` banana-in-a-box two-way binding in the parent template
- Passing the signal reference (not the value) in the parent: `[(volume)]="volume"` not `[(volume)]="volume()"`
- Understanding the difference between `model()` (writable two-way) and `input()` (readonly one-way)

## Your Tasks

### In `volume-slider/volume-slider.component.ts`

1. Declare `readonly volume = model<number>(50)` — `model` is already imported
2. Add a comment explaining the difference between `model()` and `input()`

### In `volume-slider/volume-slider.component.html`

3. Replace the placeholder with a range slider:
   - `[value]="volume()"` — reads the current value
   - `(input)="volume.set(+$any($event.target).value)"` — writes back on change
   - Display `{{ volume() }}` as a label

### In `app.component.ts`

4. Implement `mute(): void` — call `this.volume.set(0)`

### In `app.component.html`

5. Replace the placeholder `<p>` with `<app-volume-slider [(volume)]="volume" />`
   - Write `[(volume)]="volume"` — pass the **signal reference**, not `volume()`

## Expected Result

- Moving the slider updates the "Parent sees:" display instantly
- Clicking "Mute" resets the parent display AND moves the slider to 0
- The two components stay in sync because they share one signal via `model()`

## ⚠️ Common Mistake

`[(volume)]="volume()"` passes a **number** — the two-way write-back breaks.  
`[(volume)]="volume"` passes the **signal reference** — correct.

## Run It

```bash
npm install
npm start
```

Then open `http://localhost:4200`.
