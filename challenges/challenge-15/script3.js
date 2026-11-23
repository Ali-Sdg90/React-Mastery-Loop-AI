const products = [
    { id: 1, name: "Keyboard", price: 120, stock: 5 },
    { id: 2, name: "Mouse", price: 80, stock: 0 },
    { id: 3, name: "Monitor", price: 450, stock: 3 },
    { id: 4, name: "Webcam", price: 120, stock: 2 },
    { id: 5, name: "Laptop", price: 900, stock: 0 },
    { id: 6, name: "Headphones", price: 200, stock: 8 },
    { id: 7, name: "Speaker", price: 80, stock: 4 },
];

function getAvailableProducts(products, minPrice) {
    const validItems = products.filter(
        (product) => product.stock > 0 && product.price >= minPrice,
    );

    return validItems.sort((a, b) => a.price - b.price || a.id - b.id);
}

console.log(getAvailableProducts(products, 100));
