const user = {
    id: 1,
    name: "Ali",
    email: "ali@example.com",
    settings: {
        theme: "light",
        language: "en",
        notifications: true,
    },
    stats: {
        posts: 12,
        followers: 350,
    },
};

const updates = {
    theme: "dark",
    notifications: false,
};

function updateUserSettings(user, updates) {
    return {
        ...user,
        settings: {
            ...user.setting,
            ...updates,
        },
    };
}

console.log(updateUserSettings(user, updates));
