# Order Analytics Engine — JavaScript Coding Challenge

**Difficulty:** Medium–Hard  
**Focus:** Array processing, grouping, aggregation, data structures, edge cases, and time complexity  
**Suggested practice target:** 35–45 minutes (a practice goal, not a strict interview standard)

## Scenario

You are working on an analytics dashboard for an e-commerce company that operates several stores. The company wants to summarize order activity, identify its highest-spending customer, and find the store with the highest cancellation rate.

Implement the following function using plain JavaScript:

```js
function analyzeOrders(orders) {
  // Your implementation
}
```

The function receives an array of order objects and returns a single object containing three analytics results.

## Input Data

```js
const orders = [
  { id: 1, store: "north", customer: "Ali", amount: 120, status: "delivered", deliveryMinutes: 35 },
  { id: 2, store: "south", customer: "Sara", amount: 200, status: "cancelled", deliveryMinutes: null },
  { id: 3, store: "north", customer: "Reza", amount: 300, status: "delivered", deliveryMinutes: 50 },
  { id: 4, store: "east", customer: "Ali", amount: 150, status: "delivered", deliveryMinutes: 25 },
  { id: 5, store: "south", customer: "Nima", amount: 400, status: "delivered", deliveryMinutes: 60 },
  { id: 6, store: "north", customer: "Sara", amount: 180, status: "pending", deliveryMinutes: null },
  { id: 7, store: "east", customer: "Reza", amount: 250, status: "cancelled", deliveryMinutes: null },
  { id: 8, store: "south", customer: "Ali", amount: 350, status: "delivered", deliveryMinutes: 45 },
  { id: 9, store: "west", customer: "Nima", amount: 220, status: "cancelled", deliveryMinutes: null },
  { id: 10, store: "east", customer: "Sara", amount: 500, status: "delivered", deliveryMinutes: 40 },
  { id: 11, store: "north", customer: "Ali", amount: 100, status: "cancelled", deliveryMinutes: null },
  { id: 12, store: "west", customer: "Reza", amount: 320, status: "delivered", deliveryMinutes: 55 },
  { id: 13, store: "south", customer: "Sara", amount: 160, status: "delivered", deliveryMinutes: 30 },
  { id: 14, store: "east", customer: "Nima", amount: 280, status: "pending", deliveryMinutes: null },
  { id: 15, store: "west", customer: "Ali", amount: 450, status: "delivered", deliveryMinutes: 70 },
  { id: 16, store: "north", customer: "Nima", amount: 210, status: "delivered", deliveryMinutes: 20 }
];
```

Each order has these fields:

| Field | Description |
| --- | --- |
| `id` | Unique order identifier |
| `store` | Store identifier |
| `customer` | Customer name |
| `amount` | Order amount |
| `status` | One of `"delivered"`, `"cancelled"`, or `"pending"` |
| `deliveryMinutes` | Delivery time in minutes for delivered orders; otherwise `null` |

## Requirements

### Part 1 — Store Analytics (`byStore`)

Group orders by store. For **each store**, calculate:

- `total`: Total number of orders.
- `delivered`: Number of orders with status `"delivered"`.
- `cancelled`: Number of orders with status `"cancelled"`.
- `pending`: Number of orders with status `"pending"`.
- `revenue`: Sum of `amount` for **delivered orders only**.
- `avgDeliveryMinutes`: Average `deliveryMinutes` for **delivered orders only**, rounded to at most two decimal places.

If a store has no delivered orders, set its `avgDeliveryMinutes` to `null`.

### Part 2 — Top Customer (`topCustomer`)

Find the customer with the **highest total amount spent on delivered orders**, across all stores.

Return:

- `customer`: Customer name.
- `totalSpent`: Sum of the customer's **delivered** order amounts.
- `deliveredOrders`: **Count** of the customer's delivered orders (a number, not an array).

Cancelled and pending orders must not contribute to either `totalSpent` or `deliveredOrders`.

**Tie-breaker:** If customers have the same `totalSpent`, select the customer whose **first delivered order** appears earliest in the input array.

### Part 3 — Highest Cancellation Rate (`highestCancellationRate`)

Find the store with the highest percentage of cancelled orders, using:

```text
cancellationRate = (cancelled orders / total orders) × 100
```

Return:

- `store`: Store identifier.
- `cancellationRate`: Cancellation **percentage**, from `0` to `100`, rounded to at most two decimal places.

**Tie-breaker:** If multiple stores have the same cancellation rate, select the store that first appears in the input array.

## Required Output Shape

Return a **plain object**, not an array, with the following structure. The placeholders are intentionally not solved:

```js
{
  byStore: {
    north: {
      total: /* number */,
      delivered: /* number */,
      cancelled: /* number */,
      pending: /* number */,
      revenue: /* number */,
      avgDeliveryMinutes: /* number or null */
    },
    south: { /* same fields */ },
    east: { /* same fields */ },
    west: { /* same fields */ }
  },
  topCustomer: {
    customer: /* string */,
    totalSpent: /* number */,
    deliveredOrders: /* number */
  },
  highestCancellationRate: {
    store: /* string */,
    cancellationRate: /* number, 0–100 */
  }
}
```

## Rules and Edge Cases

1. Use **plain JavaScript**, without third-party libraries.
2. **Do not mutate** the input `orders` array or its order objects.
3. Round averages and percentages to **at most two decimal places**; results must remain numbers, not formatted strings.
4. If a store has no delivered orders, return `null` for `avgDeliveryMinutes`.
5. Apply the top-customer and highest-cancellation-rate tie-breakers described above.
6. If `orders` is empty, return exactly:

   ```js
   {
     byStore: {},
     topCustomer: null,
     highestCancellationRate: null
   }
   ```

7. For a nonempty input with no delivered orders, `topCustomer` should be `null`. Stores still appear in `byStore`, and cancellation rates are still evaluated (including rates of `0`).
8. Use the input order to decide ties; do not sort or rearrange the original orders.

## Bonus Challenge — Algorithmic Efficiency

Aim to traverse the original `orders` array **only once**. You may iterate over the aggregated store/customer objects afterward to finalize averages, percentages, and winners.

Try to achieve **O(n)** time complexity in the number of orders, assuming average constant-time keyed lookups.

## Evaluation Rubric

| Criterion | Points |
| --- | ---: |
| Correctness of calculations and selection logic | 4 |
| Readability and code structure | 2 |
| Edge-case handling | 2 |
| Algorithmic efficiency | 2 |
| **Total** | **10** |

**Practice note:** First prioritize a correct, readable solution. Then review repeated work and opportunities to simplify the data flow. Track both your initial implementation time and any revision time separately.
