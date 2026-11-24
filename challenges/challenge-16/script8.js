const team = {
    name: "Frontend Team",
    members: [
        {
            id: 1,
            name: "Ali",
            role: "Lead",
            stats: {
                tasksCompleted: 25,
                score: 90,
            },
        },
        {
            id: 2,
            name: "Sara",
            role: "Developer",
            stats: {
                tasksCompleted: 18,
                score: 82,
            },
        },
        {
            id: 3,
            name: "Reza",
            role: "Developer",
            stats: {
                tasksCompleted: 12,
                score: 75,
            },
        },
    ],
};

function updateMemberScore(team, memberId, newScore) {
    return {
        ...team,
        members: team.members.map((member) => {
            if (member.id !== memberId) {
                return member;
            } else {
                return {
                    ...member,
                    stats: {
                        ...member.stats,
                        score: newScore,
                    },
                };
            }
        }),
    };
}

const result = updateMemberScore(team, 2, 95);

console.log(result);
