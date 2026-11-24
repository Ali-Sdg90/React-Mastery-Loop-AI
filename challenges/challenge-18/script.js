const developer = {
    id: 101,
    name: "Ali",
    role: "Frontend Developer",
    city: "Tehran",
    skills: ["React", "JavaScript", "Node.js", "CSS"],
};

function buildProfile(developer) {
    const { name, role, skills, ...extra } = developer;
    const [ first, ...otherSkills ] = skills;

    return {
        displayName: name,
        title: role,
        mainSkill: first,
        otherSkills,
        extra,
    };
}

console.log(buildProfile(developer));
