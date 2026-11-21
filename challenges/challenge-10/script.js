const users = [
    { id: 1, name: "Ali", team: "Frontend" },
    { id: 2, name: "Sara", team: "Backend" },
    { id: 3, name: "Reza", team: "Frontend" },
    { id: 4, name: "Nima", team: "DevOps" },
];

const tasks = [
    { id: 101, userId: 1, status: "done", priority: "high", estimatedHours: 5 },
    {
        id: 102,
        userId: 2,
        status: "pending",
        priority: "medium",
        estimatedHours: 3,
    },
    { id: 103, userId: 1, status: "done", priority: "low", estimatedHours: 2 },
    {
        id: 104,
        userId: 3,
        status: "in_progress",
        priority: "high",
        estimatedHours: 8,
    },
    { id: 105, userId: 2, status: "done", priority: "high", estimatedHours: 6 },
    {
        id: 106,
        userId: 1,
        status: "pending",
        priority: "high",
        estimatedHours: 4,
    },
    {
        id: 107,
        userId: 3,
        status: "done",
        priority: "medium",
        estimatedHours: 3,
    },
    { id: 108, userId: 3, status: "done", priority: "high", estimatedHours: 5 },
];

const generateTeamReport = (users, tasks) => {
    const teams = [];

    users.forEach((user) => {
        if (!teams.includes(user.team)) {
            teams.push(user.team);
        }
    });

    const teamMembers = teams.map((team) => {
        return users.filter((user) => {
            if (user.team === team) {
                return user;
            }
        });
    });

    // console.log("teamMembers >>", teamMembers);

    const tasksForMembers = teamMembers.map((eachTeamMembers) => {
        return eachTeamMembers.map((eachTeamMember) => {
            return tasks.filter((task) => {
                if (eachTeamMember.id === task.userId) {
                    return task;
                }
            });
        });
    });

    // console.log("tasksForMembers >>", tasksForMembers);

    const outputObj = tasksForMembers.map((eachTeamMembers, index) => {
        const outputTeam = {
            team: teams[index],
            members: eachTeamMembers.length,
            totalTasks: 0,
            completedTasks: 0,
            totalEstimatedHours: 0,
            completionRate: 0,
        };

        eachTeamMembers.map((eachTeamTasks) => {
            outputTeam.totalTasks += eachTeamTasks.length;

            eachTeamTasks.map((eachTeamTask) => {
                if (eachTeamTask.status === "done") {
                    outputTeam.completedTasks++;
                }

                outputTeam.totalEstimatedHours += eachTeamTask.estimatedHours;
            });
        });

        const calculatedRate = +(
            (outputTeam.completedTasks / outputTeam.totalTasks) *
            100
        ).toFixed(0);

        outputTeam.completionRate = calculatedRate ? calculatedRate : 0;

        return outputTeam;
    });

    // console.log("outputObj >>", outputObj);

    const sortedOutput = outputObj.sort(
        (b, a) => a.completionRate - b.completionRate,
    );

    return sortedOutput;
};

console.log(generateTeamReport(users, tasks));
