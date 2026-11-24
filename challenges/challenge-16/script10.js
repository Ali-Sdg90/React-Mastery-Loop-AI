const team = {
    name: "Frontend Team",
    members: [
        {
            id: 1,
            name: "Ali",
            settings: {
                theme: "dark",
                notifications: true,
            },
        },
        {
            id: 2,
            name: "Sara",
            settings: {
                theme: "light",
                notifications: true,
            },
        },
        {
            id: 3,
            name: "Reza",
            settings: {
                theme: "dark",
                notifications: false,
            },
        },
    ],
};

function updateMemberTheme(team, memberId, newTheme) {
    return {
        ...team,
        members: team.members.map((member) => {
            if (member.id !== memberId) {
                return member;
            } else {
                return {
                    ...member,
                    settings: {
                        ...member.settings,
                        theme: newTheme,
                    },
                };
            }
        }),
    };
}

const result = updateMemberTheme(team, 2, "dark");

console.log(result);
