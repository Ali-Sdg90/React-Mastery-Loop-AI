const users = [
    { id: 1, name: "Ali", age: 24 },
    { id: 2, name: "Sara", age: 28 },
    { id: 1, name: "Ali", age: 25 },
    { id: 3, name: "Reza", age: 30 },
    { id: 2, name: "Sara", age: 29 },
    { id: 4, name: "Nima", age: 22 },
];

function removeDuplicates(users) {
    const ids = [];

    users.forEach((user) => {
        if (!ids.includes(user.id)) {
            ids.push(user.id);
        }
    });

    const reversedUsers = [...users].reverse();

    return ids.map((id) => {
        return reversedUsers.find((user) => user.id === id);
    });
}

console.log(removeDuplicates(users));
