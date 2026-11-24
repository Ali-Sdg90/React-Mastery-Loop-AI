const workspace = {
    name: "My Workspace",
    projects: [
        {
            id: 1,
            title: "Portfolio",
            members: [
                {
                    id: 101,
                    name: "Ali",
                    permissions: {
                        role: "admin",
                        canEdit: true,
                    },
                },
                {
                    id: 102,
                    name: "Sara",
                    permissions: {
                        role: "viewer",
                        canEdit: false,
                    },
                },
            ],
        },
        {
            id: 2,
            title: "Dashboard",
            members: [
                {
                    id: 103,
                    name: "Reza",
                    permissions: {
                        role: "editor",
                        canEdit: true,
                    },
                },
            ],
        },
    ],
};

function updateMemberRole(workspace, memberId, newRole) {
    const isAvailable = workspace.projects.some((project) => {
        return project.members.some((member) => member.id === memberId);
    });

    if (!isAvailable) {
        return workspace;
    }

    return {
        ...workspace,
        projects: workspace.projects.map((project) => {
            if (!project.members.some((member) => member.id === memberId)) {
                return project;
            } else {
                return {
                    ...project,
                    members: project.members.map((member) => {
                        if (!(member.id === memberId)) {
                            return member;
                        } else {
                            return {
                                ...member,
                                permissions: {
                                    ...member.permissions,
                                    role: newRole,
                                },
                            };
                        }
                    }),
                };
            }
        }),
    };
}

const result = updateMemberRole(workspace, 102, "editor");

console.log(result);
