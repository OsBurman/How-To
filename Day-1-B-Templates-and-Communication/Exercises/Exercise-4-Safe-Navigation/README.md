# Exercise 4: Safe Navigation and Fallbacks

**Difficulty:** BEGINNER
**Concepts practiced:** Safe navigation `?.`, nullish coalescing `??`, interpolation

## What You're Building

A user profile display that handles three scenarios: a fully-loaded user, a partially-loaded
user with missing address fields, and a null user (not logged in). You'll use `?.` to prevent
crashes and `??` to provide meaningful fallback text.

## Instructions

1. Open `Exercise-4-Safe-Navigation/`. The `AppComponent` has a `UserProfile` interface with
   `name`, optional `email?`, and optional `address?` (with optional `street?`, `city?`, `zip?`).
2. The starter code has three properties already declared:
   - `fullUser` — has name, email, and a complete address
   - `partialUser` — has name but no email, and an address with only city (no street, no zip)
   - `noUser: UserProfile | null = null`
3. Open `app.component.html`. In the "Full Profile" card, display:
   - `{{ fullUser?.name }}` for the name
   - `{{ fullUser?.email }}` for the email
   - `{{ fullUser?.address?.city }}, {{ fullUser?.address?.zip }}` for location
4. In the "Partial Profile" card, use `?.` combined with `??` for fallbacks:
   - `{{ partialUser?.email ?? 'No email provided' }}`
   - `{{ partialUser?.address?.street ?? 'No street on file' }}`
   - `{{ partialUser?.address?.zip ?? 'N/A' }}`
5. In the "Guest" card, handle the null user:
   - `{{ noUser?.name ?? 'Anonymous' }}`
   - `{{ noUser?.email ?? 'guest@example.com' }}`
   - `{{ noUser?.address?.city ?? 'Unknown location' }}`
6. Save and run. The Full Profile card shows real data, the Partial Profile shows a mix of
   real data and fallbacks, and the Guest card shows all fallbacks.

## Acceptance Criteria

- [ ] Full Profile card displays all data without fallbacks
- [ ] Partial Profile card shows "No email provided" and "No street on file" as fallbacks
- [ ] Guest card shows "Anonymous," "guest@example.com," and "Unknown location"
- [ ] No runtime errors in the console — `?.` prevents crashes on null
- [ ] Every profile card renders without blank spaces (all missing data has `??` fallbacks)

## Hints

**Hint 1 — Safe navigation:** `?.` short-circuits when it hits null or undefined.
`noUser?.name` returns `undefined` (not a crash) because `noUser` is `null`.

**Hint 2 — Nullish coalescing:** `??` only triggers on `null` and `undefined` — not on
empty strings, `0`, or `false`. It's the right choice for "truly missing" data.

**Hint 3 — Chaining:** `partialUser?.address?.zip ?? 'N/A'` first safely navigates the
chain, then applies the fallback if the result is null or undefined.
