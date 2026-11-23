const products = [
    { id: 1, name: "Keyboard" },
    { id: 2, name: "Mouse" },
    { id: 3, name: "Monitor" },
    { id: 4, name: "Headphones" },
    { id: 5, name: "Webcam" },
    { id: 6, name: "Microphone" },
    { id: 7, name: "Speaker" },
    { id: 8, name: "Laptop" },
    { id: 9, name: "Tablet" },
    { id: 10, name: "Phone" },
    { id: 11, name: "Charger" },
];

function paginate(products, page, pageSize) {
    return {
        items: [...products].splice((page - 1) * pageSize, pageSize),
        currentPage: page,
        totalPages: Math.ceil(products.length / pageSize),
        totalItems: products.length,
    };
}

console.log(paginate(products, 2, 4));
