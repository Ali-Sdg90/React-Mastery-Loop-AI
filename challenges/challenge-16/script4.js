const cart = {
    id: 101,
    customer: "Ali",
    shipping: {
        method: "express",
        address: {
            city: "Tehran",
            postalCode: "12345",
        },
    },
    total: 850000,
};

function updateShipping(cart, newCity, newMethod) {
    return {
        ...cart,
        shipping: {
            ...cart.shipping,
            method: newMethod,
            address: {
                ...cart.shipping.address,
                city: newCity,
            },
        },
    };
}

const updatedCart = updateShipping(cart, "Isfahan", "standard");

console.log(updatedCart);
