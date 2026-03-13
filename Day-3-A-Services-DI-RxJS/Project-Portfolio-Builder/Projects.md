# Day 3A — Project Portfolio Builder

Practice building real Angular apps using services, dependency injection, and RxJS.
Each project below isolates the Day 3A concepts in a different context so you get
varied repetitions of the same patterns.

---

## Project 1 — Live Score Tracker

**Difficulty:** ⭐ Beginner

Keep score for two teams in a game (any sport you like). Each click of a "+1" button
adds a point to that team's score. A service holds the scores as a `BehaviorSubject`
so every component on the page stays in sync automatically. Add a "Reset" button
that clears both scores back to zero.

**Components to create**
- `ScoreboardComponent` — displays both team scores
- `ScoreControlsComponent` — the +1 buttons and Reset button
- `WinnerBannerComponent` — conditionally appears when one team leads by 5+

**What you'll practice**
- `BehaviorSubject` holding a simple state object
- `map` to derive a "winner" Observable from the scores stream
- `toSignal()` with `initialValue` in both display components
- `inject()` to share one service instance across three components

---

## Project 2 — Reading List Manager

**Difficulty:** ⭐ Beginner

Build an app where users can add books (title + author) to a reading list, mark
them as read, and remove them. A `ReadingListService` owns a `BehaviorSubject<Book[]>`
and exposes derived Observables for total count and read count. The list persists
in the service for the lifetime of the page.

**Components to create**
- `BookFormComponent` — input fields and an Add button
- `BookListComponent` — renders all books with read/remove controls
- `ReadingStatsComponent` — shows total books and how many are read

**What you'll practice**
- Immutable `BehaviorSubject` updates (spread, filter, map)
- Deriving `readCount$` and `unreadCount$` using `map`
- `toSignal()` for the book list and stats
- Paired `error$` stream surfaced in the form component

---

## Project 3 — Pomodoro Focus Timer

**Difficulty:** ⭐⭐ Intermediate

Implement a classic Pomodoro timer: 25-minute work session followed by a 5-minute
break. A `TimerService` uses RxJS `timer()` or `interval()` to count down seconds
and exposes the remaining time as a `BehaviorSubject<number>`. `takeUntilDestroyed()`
ensures the interval subscription is cancelled when the app is torn down.

**Components to create**
- `TimerDisplayComponent` — shows MM:SS countdown
- `TimerControlsComponent` — Start, Pause, Reset buttons
- `SessionLabelComponent` — shows "Work" or "Break" based on current phase

**What you'll practice**
- `interval()` combined with `takeUntilDestroyed(destroyRef)` for leak-free ticking
- `BehaviorSubject` to hold remaining seconds and current phase
- `map` to format raw seconds into an MM:SS display string
- `tap` to trigger a side effect (play a sound or push a notification) when time hits zero

---

## Project 4 — Expense Splitter

**Difficulty:** ⭐⭐ Intermediate

Allow a group of friends to log shared expenses (who paid, description, amount).
An `ExpenseService` holds the expense list in a `BehaviorSubject` and derives
each person's balance using `map`. A `NotificationService` using `Subject` + `timer()`
shows a toast whenever an expense is added or deleted.

**Components to create**
- `ExpenseFormComponent` — name, description, and amount fields
- `ExpenseListComponent` — displays all expenses with delete buttons
- `BalanceSummaryComponent` — shows each person's net balance (owes / is owed)

**What you'll practice**
- Complex derived state with `map` (calculate net balance per person)
- `Subject`-based notification service with auto-dismiss via `timer()`
- `filter` to derive an Observable of only expenses above a threshold
- Coordinating two services in one component using multiple `inject()` calls

---

## Project 5 — Habit Tracker

**Difficulty:** ⭐ Beginner

Let users define daily habits (e.g., "Drink water", "Walk 10k steps") and check
them off each day. A `HabitService` uses a `BehaviorSubject<Habit[]>` to track
habits and their completion state. A "streak" count derived via `map` shows how
many habits are completed today.

**Components to create**
- `HabitFormComponent` — add new habits by name
- `HabitListComponent` — renders each habit with a checkbox
- `StreakBadgeComponent` — shows X of Y habits completed today

**What you'll practice**
- Toggle logic inside a service method using immutable spread updates
- `map` to compute completion percentage for the badge
- `toSignal()` for both the list and the derived count
- `DestroyRef` pattern: use `takeUntilDestroyed()` if you add an auto-save interval

---

## Project 6 — Live Chat Simulator

**Difficulty:** ⭐⭐ Intermediate

Simulate a chat window where the user types a message and a bot "replies" after a
short delay. A `ChatService` holds the message history in a `BehaviorSubject<Message[]>`
and uses `timer()` to schedule the bot response. `takeUntilDestroyed()` ensures
any pending reply timer is cancelled if the component is destroyed before it fires.

**Components to create**
- `ChatWindowComponent` — scrollable list of messages (user vs bot styled differently)
- `ChatInputComponent` — text field and Send button
- `TypingIndicatorComponent` — shows "Bot is typing…" while the timer is running

**What you'll practice**
- `Subject` to emit a "bot is typing" event separate from the message history
- `timer()` + `takeUntilDestroyed()` for the delayed bot response
- `tap` to trigger a side effect (scroll to bottom) after each new message emission
- `toSignal()` for messages and the typing state

---

## Project 7 — Multi-Category Bookmark Manager

**Difficulty:** ⭐⭐ Intermediate

Users save bookmarks (URL + title + category). A `BookmarkService` holds all
bookmarks in a `BehaviorSubject` and exposes a filtered Observable that reacts
to a selected category. A second `SearchService` holds a search term in a
`BehaviorSubject<string>` and combines it with the category filter using `map`
and `filter` to produce the final visible list.

**Components to create**
- `BookmarkFormComponent` — URL, title, and category dropdown
- `CategoryFilterComponent` — list of category buttons that update the active filter
- `BookmarkListComponent` — renders the filtered + searched results
- `BookmarkCountComponent` — shows "Showing X of Y bookmarks"

**What you'll practice**
- Two cooperating services injected into the same component
- `filter` to exclude bookmarks that don't match the active category
- `map` to produce the search-narrowed subset
- `BehaviorSubject<string>` for a reactive search term

---

## General Tips

**Keep services small and focused.**
Each service should own one slice of state. If your service grows beyond ~80 lines,
split it. A `FilterService` and a `DataService` are easier to reason about than one
giant `AppService`.

**Always provide `initialValue` with `toSignal()`.**
If your Observable hasn't emitted yet when the component renders, Angular will throw
without `initialValue`. Get in the habit of always supplying it — even if the value
is `0`, `[]`, or `null`.

**Reset `error$` before every mutation.**
Call `this.errorBs$.next(null)` at the top of every service method. This prevents
stale error messages from persisting after the user corrects the problem.

**Let services own state, let components own presentation.**
Components should call service methods and read signals — they should not contain
business logic. If you find yourself writing a `reduce` inside a component, move
it to a derived Observable in the service.

**Use `tap` for side effects, not `map`.**
`map` transforms values. `tap` triggers side effects (logging, toast, scroll) without
changing the stream. Mixing the two makes streams hard to debug.
