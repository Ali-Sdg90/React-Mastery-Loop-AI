const users = [
    {
        id: 1,
        name: "Ali",
        settings: {
            theme: "dark",
            language: "en",
        },
    },
    {
        id: 2,
        name: "Sara",
        settings: {
            theme: "light",
            language: "fa",
        },
    },
    {
        id: 3,
        name: "Reza",
        settings: {
            theme: "dark",
            language: "en",
        },
    },
];

function processUsers(users) {
    const [firstUser, ...remainingUsers] = users;

    const { name, ...firstUserInfo } = firstUser;

    const updatedRemainingUsers = remainingUsers.map((user, index) => {
        if (index) {
            return user;
        } else {
            return {
                ...user,
                settings: {
                    ...user.settings,
                    theme: "blue",
                },
            };
        }
    });

    return {
        firstName: name,
        firstUserInfo,
        updatedRemainingUsers,
    };
}

console.log(processUsers(users));
