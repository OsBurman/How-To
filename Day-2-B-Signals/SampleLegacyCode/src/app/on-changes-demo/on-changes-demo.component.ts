// on-changes-demo.component.ts — ngOnChanges Demonstration
//
// PURPOSE: Show exactly what computed() and effect() replaced in legacy Angular.
//
// LEGACY PATTERN: ngOnChanges(changes: SimpleChanges)
//   - Fires when a parent passes a new @Input() value (reference must change for objects/arrays)
//   - Developers used it to manually recalculate derived values when inputs changed
//   - Error-prone: must check changes['inputName'] to avoid stale reads
//   - Only fires when reference changes — mutating an object or array in-place silently skips it
//
// MODERN EQUIVALENT:
//   computed() — replaces manual recalculation on input change
//   effect()   — replaces side-effect logic in ngOnChanges (logging, saving, etc.)
//
//   With computed() and signals, the framework tracks dependencies automatically.
//   You never need to check "did this specific input change?" — the computation
//   just runs whenever its signal dependencies change, nothing more, nothing less.

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-on-changes-demo',
  // LEGACY: no standalone: true — declared in AppModule
  templateUrl: './on-changes-demo.component.html',
  styleUrls: ['./on-changes-demo.component.css']
})
export class OnChangesDemoComponent implements OnChanges {

  // LEGACY: @Input() — parent pushes a new value reference each time.
  // MODERN: readonly value = input<number>(0)  — signal-based, same one-way semantics.
  @Input() value: number = 0;

  // LEGACY: @Output() + new EventEmitter() boilerplate.
  // MODERN: readonly changesReported = output<number>()  — no EventEmitter needed.
  @Output() changesReported = new EventEmitter<number>();

  // Manually derived values — updated inside ngOnChanges.
  // MODERN EQUIVALENT: readonly doubled = computed(() => this.value() * 2)
  doubled: number = 0;
  squared: number = 0;
  history: string[] = [];
  changesCount: number = 0;

  // ngOnChanges — fires when any @Input() changes to a new reference.
  //
  // MODERN EQUIVALENT: Use computed() for derived values, effect() for side effects.
  //
  //   readonly doubled = computed(() => this.value() * 2);
  //   readonly squared = computed(() => this.value() ** 2);
  //   private readonly logEffect = effect(() => {
  //     this.history.push(`Value changed to ${this.value()}`);
  //   });
  //
  // Notice how computed() and effect() are simpler:
  //   - No need to check changes['value'] — dependencies tracked automatically
  //   - No risk of reading stale values
  //   - No lifecycle hook needed at all
  ngOnChanges(changes: SimpleChanges): void {
    // LEGACY: Must explicitly check which input changed.
    // MODERN: computed() only re-runs when ITS specific dependency changes — no check needed.
    if (changes['value']) {
      const prev = changes['value'].previousValue ?? 'initial';
      const curr = changes['value'].currentValue as number;

      // Manually recalculate derived values — this is what computed() replaces.
      this.doubled = curr * 2;
      this.squared = curr ** 2;

      // Side effect logic — this is what effect() replaces.
      this.history.push(`${prev} → ${curr}`);
      this.changesCount++;

      // Emit to parent — still valid in modern code using output().
      this.changesReported.emit(this.changesCount);

      console.log(`[Legacy] ngOnChanges: value changed from ${prev} to ${curr}`);
    }
  }

  clearHistory(): void {
    this.history = [];
  }
}
