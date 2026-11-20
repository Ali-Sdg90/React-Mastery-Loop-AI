const cart = [
    { name: "Apple", price: 20, inStock: true },
    { name: "Milk", price: 30, inStock: true },
    { name: "Bread", price: 15, inStock: false },
    { name: "Banana", price: 10, inStock: true },
    { name: "Coffee", price: 25, inStock: true },
];

function getCartSummary(items) {
    let totalPrise = 0;
    let buyList = [];

    const validItems = items.filter((item) => item.inStock && item.quantity);

    console.log("validItems >>", validItems);

    validItems.forEach((item) => {
        totalPrise += item.price;
        buyList.push(item);
    });

    if (validItems.length) {
        return {
            totalPrise,
            buyList,
            quantity: validItems.length,
            isEmpty: false,
        };
    } else {
        return {
            totalPrise,
            buyList,
            quantity: validItems.length,
            isEmpty: true,
        };
    }
}

const randomItemCount = Math.floor(Math.random() * 5);

const selectedItems = [];

for (let i = 0; i < randomItemCount; i++) {
    const randomSelectedItem = Math.floor(Math.random() * cart.length);

    selectedItems.push(cart[randomSelectedItem]);
}

console.log("All Items >>", selectedItems);

console.log("output >>", getCartSummary(selectedItems));
console.log("output >>", getCartSummary([]));
