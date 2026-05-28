به پیشنهاد چت جی پی تی یه سری تغییرات در راستای حرفه ای شدن دادم.

## Refactor Tasks

### Task 1 — Proper React Component Usage

Refactor `TodoItem` so it is used as a proper React component instead of being invoked like a normal function.

---

### Task 2 — Improve Props Design

Avoid passing the entire state setter directly to child components.

Instead:

- Pass only the required data
- Pass specific callback handlers

---

### Task 3 — Clean Filtering Logic

Move filtering logic outside of JSX.

Refactor the flow into:

1. Filter todos
2. Map filtered todos
3. Render components

This will improve readability and maintainability.

---

### Task 4 — Stable Key Handling

Replace `index`-based keys with stable unique identifiers.

Each todo should contain:

- a stable `id`
- a `title`
- completion state

Use the `id` for:

- React keys
- state updates
- toggle operations

---

### Task 5 — Improve Data Modeling

Refactor the todo structure to better support future features such as:

- editing
- deletion
- persistence
- sorting

The goal is to build a scalable data model instead of a minimal temporary structure.

---

### Task 6 — Move State Logic to Parent

Move toggle/update logic out of `TodoItem`.

`TodoItem` should:

- display UI
- trigger events

The parent component should:

- own state logic
- handle updates

---

### Task 7 — Separate UI From Logic

Reduce inline logic inside JSX where possible.

Extract:

- handlers
- helper logic
- derived values

to keep components cleaner and easier to scale.

یاد گرفتم بهتره لاجیک مربوط به یه استیت کامل تو همون باشه

نباید تو مثلا task item فانکشن تغییر مقدار استیت رو بفرستم

و اینکه برام جا افتاد بهتره فانکشن رو از jsx جدا کنم تا جای ممکن

و اینکه بهتره از ایندکس برای کی استفاده نکنم و یه ای دی ثابت داشته باشم برای هر تسک

حس میکنم هنوز هم نیاز به تمرین برای این موارد هستم. و هنوز خیلی با find یا filter اصلا راحت نیستم. برای این نیاز به تمرین بیشتر دارم
