const user = {
    id: 1,
    name: "Ali",
    profile: {
        bio: "Software Engineer",
        address: {
            city: "Tehran",
            country: "Iran",
        },
    },
};

function updateCity(user, newCity) {
    return {
        ...user,
        profile: {
            ...user.profile,
            address: {
                ...user.profile.address,
                city: newCity,
            },
        },
    };
}

console.log(updateCity(user, "Shiraz"));
