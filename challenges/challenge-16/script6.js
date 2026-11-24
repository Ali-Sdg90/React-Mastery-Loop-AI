const product = {
    id: 10,
    name: "Laptop",
    price: 5000,
    stock: {
        available: true,
        quantity: 8,
    },
};

function updateStock(product, newQuantity) {
    return {
        ...product,
        stock: {
            ...product.stock,
            quantity: newQuantity,
        },
    };
}

console.log(updateStock(product, 10));

const updateStock2 = (product, newQuantity) => {
    const newObj = JSON.parse(JSON.stringify(product));

    newObj.stock.quantity = newQuantity;

    return newObj;
};

console.log(updateStock2(product, 10));
