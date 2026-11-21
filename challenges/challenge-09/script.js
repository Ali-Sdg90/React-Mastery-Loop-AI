const products = [
    { id: 1, name: "Keyboard", price: 120, stock: 10 },
    { id: 2, name: "Mouse", price: 60, stock: 15 },
    { id: 3, name: "Monitor", price: 400, stock: 5 },
    { id: 4, name: "Headset", price: 80, stock: 7 },
];

const orders = [
    {
        id: 101,
        status: "paid",
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 },
        ],
    },
    {
        id: 102,
        status: "cancelled",
        items: [{ productId: 3, quantity: 2 }],
    },
    {
        id: 103,
        status: "paid",
        items: [
            { productId: 2, quantity: 3 },
            { productId: 3, quantity: 1 },
        ],
    },
    {
        id: 104,
        status: "paid",
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 1 },
        ],
    },
];

const generateSalesReport = (products, orders) => {
    const paidItems = orders.filter((order) => order.status === "paid");

    console.log(paidItems);

    const outputObj = products.map((product) => {
        let totalSold = 0;
        let revenue = 0;
        let remainingStock = product.stock;

        paidItems.forEach((order) => {
            order.items.forEach((item) => {
                if (item.productId === product.id) {
                    totalSold += item.quantity;
                    revenue += item.quantity * product.price;
                    remainingStock -= item.quantity;
                }
            });
        });

        return { name: product.name, totalSold, revenue, remainingStock };
    });

    const sortedOutputObj = outputObj.sort((b, a) => a.revenue - b.revenue);

    return sortedOutputObj;
};

console.log(generateSalesReport(products, orders));
