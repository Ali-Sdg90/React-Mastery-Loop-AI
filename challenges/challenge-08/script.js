const transactions = [
    { id: 1, customer: "Ali", amount: 150, status: "success" },
    { id: 2, customer: "Sara", amount: 200, status: "failed" },
    { id: 3, customer: "Ali", amount: 300, status: "success" },
    { id: 4, customer: "Reza", amount: 120, status: "success" },
    { id: 5, customer: "Sara", amount: 250, status: "success" },
    { id: 6, customer: "Ali", amount: 100, status: "failed" },
    { id: 7, customer: "Reza", amount: 180, status: "success" },
];

function analyzeTransactions(transactions) {
    const succeedTransitions = transactions.filter(
        (transition) => transition.status === "success",
    );

    let totalRevenue = 0;
    let successfulTransactions = succeedTransitions.length;

    succeedTransitions.forEach((transition) => {
        totalRevenue += transition.amount;
    });

    const customerNames = [];

    succeedTransitions.forEach((transition) => {
        if (!customerNames.includes(transition.customer)) {
            customerNames.push(transition.customer);
        }
    });

    const customers = customerNames.map((customer) => {
        const customerTransitions = succeedTransitions.filter(
            (transition) => transition.customer === customer,
        );

        let totalSpent = 0;

        customerTransitions.forEach(
            (transition) => (totalSpent += transition.amount),
        );

        return { name: customer, totalSpent };
    });

    const sortedOutput = customers.sort((b, a) => a.totalSpent - b.totalSpent);

    return { totalRevenue, successfulTransactions, customers: sortedOutput };
}

// analyzeTransactions(transactions);
console.log(analyzeTransactions(transactions));
// console.log(analyzeTransactions([]));
