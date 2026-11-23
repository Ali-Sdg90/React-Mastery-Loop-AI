const orders = [
    {
        id: 1,
        store: "north",
        customer: "Ali",
        amount: 120,
        status: "delivered",
        deliveryMinutes: 35,
    },
    {
        id: 2,
        store: "south",
        customer: "Sara",
        amount: 200,
        status: "cancelled",
        deliveryMinutes: null,
    },
    {
        id: 3,
        store: "north",
        customer: "Reza",
        amount: 300,
        status: "delivered",
        deliveryMinutes: 50,
    },
    {
        id: 4,
        store: "east",
        customer: "Ali",
        amount: 150,
        status: "delivered",
        deliveryMinutes: 25,
    },
    {
        id: 5,
        store: "south",
        customer: "Nima",
        amount: 400,
        status: "delivered",
        deliveryMinutes: 60,
    },
    {
        id: 6,
        store: "north",
        customer: "Sara",
        amount: 180,
        status: "pending",
        deliveryMinutes: null,
    },
    {
        id: 7,
        store: "east",
        customer: "Reza",
        amount: 250,
        status: "cancelled",
        deliveryMinutes: null,
    },
    {
        id: 8,
        store: "south",
        customer: "Ali",
        amount: 350,
        status: "delivered",
        deliveryMinutes: 45,
    },
    {
        id: 9,
        store: "west",
        customer: "Nima",
        amount: 220,
        status: "cancelled",
        deliveryMinutes: null,
    },
    {
        id: 10,
        store: "east",
        customer: "Sara",
        amount: 500,
        status: "delivered",
        deliveryMinutes: 40,
    },
    {
        id: 11,
        store: "north",
        customer: "Ali",
        amount: 100,
        status: "cancelled",
        deliveryMinutes: null,
    },
    {
        id: 12,
        store: "west",
        customer: "Reza",
        amount: 320,
        status: "delivered",
        deliveryMinutes: 55,
    },
    {
        id: 13,
        store: "south",
        customer: "Sara",
        amount: 160,
        status: "delivered",
        deliveryMinutes: 30,
    },
    {
        id: 14,
        store: "east",
        customer: "Nima",
        amount: 280,
        status: "pending",
        deliveryMinutes: null,
    },
    {
        id: 15,
        store: "west",
        customer: "Ali",
        amount: 450,
        status: "delivered",
        deliveryMinutes: 70,
    },
    {
        id: 16,
        store: "north",
        customer: "Nima",
        amount: 210,
        status: "delivered",
        deliveryMinutes: 20,
    },
];

const analyzeOrders = (orders) => {
    const stores = [];
    const output = {};

    orders.forEach((order) => {
        if (!stores.includes(order.store)) {
            stores.push(order.store);
        }
    });

    // console.log(stores);

    const byStore = {};

    stores.map((store) => {
        const storeOrders = orders.filter((order) => order.store === store);

        // console.log(storeOrders);

        let deliveryMinutes = 0;
        const storeSalesObj = {
            total: 0,
            delivered: 0,
            cancelled: 0,
            pending: 0,
            revenue: 0,
            avgDeliveryMinutes: null,
        };

        storeOrders.map((storeOrder) => {
            storeSalesObj.total++;

            switch (storeOrder.status) {
                case "delivered":
                    storeSalesObj.delivered++;
                    storeSalesObj.revenue += storeOrder.amount;
                    deliveryMinutes += storeOrder.deliveryMinutes;
                    break;

                case "pending":
                    storeSalesObj.pending++;
                    break;

                case "cancelled":
                    storeSalesObj.cancelled++;
                    break;
            }
        });

        if (storeSalesObj.delivered) {
            storeSalesObj.avgDeliveryMinutes = +(
                deliveryMinutes / storeSalesObj.delivered
            ).toFixed(2);
        }

        byStore[store] = storeSalesObj;
    });

    // console.log(byStore);
    output["byStore"] = byStore;

    // --- topCustomer ---

    const customers = [];
    orders.forEach((order) => {
        if (!customers.includes(order.customer)) {
            customers.push(order.customer);
        }
    });

    // console.log(customers);

    const customersOrder = customers.map((customer) => {
        let totalSpent = 0;

        const customerOrders = orders.filter((order) => {
            if (order.customer === customer) {
                totalSpent += order.amount;
                return order;
            }
        });

        return {
            customer,
            totalSpent,
            deliveredOrders: customerOrders,
        };
    });

    // console.log(customersOrder);

    let highestAmount = 0;
    const topCustomer = {
        customer: null,
        totalSpent: 0,
        deliveredOrders: null,
    };

    customersOrder.forEach((customerOrder) => {
        if (highestAmount < customerOrder.deliveredOrders.length) {
            highestAmount = customerOrder.deliveredOrders.length;
            topCustomer.customer = customerOrder.customer;
            topCustomer.totalSpent = customerOrder.totalSpent;
            topCustomer.deliveredOrders = customerOrder.deliveredOrders;
        }
    });

    // console.log(topCustomer);
    output["topCustomer"] = topCustomer;

    // --- highestCancellationRate ---

    const cancellationRate = stores.map((store) => {
        let totalCancel = 0;
        let allOrders = 0;
        let cancellationRate = 0;

        orders.forEach((order) => {
            if (order.store === store) {
                allOrders++;
                if (order.status === "cancelled") {
                    totalCancel++;
                }
            }
        });

        if (allOrders) {
            cancellationRate = +(totalCancel / allOrders).toFixed(2);
        }

        return {
            store,
            cancellationRate,
        };
    });

    // console.log(cancellationRate);

    let highestCancellation = 0;
    const highestCancellationRate = {
        store: null,
        cancellationRate: 0,
    };

    cancellationRate.forEach((cancellationRateItem) => {
        if (highestCancellation < cancellationRateItem.cancellationRate) {
            highestCancellation = cancellationRateItem.cancellationRate;
            highestCancellationRate.store = cancellationRateItem.store;
            highestCancellationRate.cancellationRate =
                cancellationRateItem.cancellationRate;
        }
    });

    // console.log(highestCancellationRate);
    output["highestCancellationRate"] = highestCancellationRate;

    return output;
};

console.log(analyzeOrders(orders));
