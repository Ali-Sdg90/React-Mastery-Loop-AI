const users0 = [
    {
        id: 1,
        name: "Ali",
        settings: {
            theme: "light",
        },
    },
    {
        id: 2,
        name: "Sara",
        settings: {
            theme: "dark",
        },
    },
];

const copy0 = [...users0];

copy0[0] = {
    ...copy0[0],
    name: "Reza",
};

copy0[0].settings.theme = "blue";

copy0[1].name = "Mina";

// --------------------------------

const users = [
    {
        id: 1,
        name: "Ali",
        profile: {
            city: "Tehran",
            skills: ["React", "JavaScript"],
        },
    },
    {
        id: 2,
        name: "Sara",
        profile: {
            city: "Shiraz",
            skills: ["Vue"],
        },
    },
];

const copy = [...users];

copy[0] = {
    ...copy[0],
    profile: {
        ...copy[0].profile,
        city: "Isfahan",
    },
};

copy[0].profile.skills.push("Node.js");

copy[1] = {
    ...copy[1],
    name: "Mina",
};
