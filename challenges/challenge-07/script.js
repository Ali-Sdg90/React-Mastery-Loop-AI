const students = [
    { id: 1, name: "Ali", scores: [18, 16, 20] },
    { id: 2, name: "Sara", scores: [12, 9, 14] },
    { id: 3, name: "Reza", scores: [20, 19, 18] },
    { id: 4, name: "Nina", scores: [8, 10, 9] },
    { id: 5, name: "Mina", scores: [15, 17, 16] },
];

function analyzeStudents(students) {
    const workingData = students.map((student) => {
        let studentWorthiness = 0;

        student.scores.forEach((score) => {
            studentWorthiness += score;
        });

        const average = +(studentWorthiness / student.scores.length).toFixed(2);

        return { ...student, average };
    });

    const goodStudents = workingData.filter((data) => data.average >= 12);

    console.log(goodStudents);

    const goodSortedStudents = goodStudents.sort(
        (a, b) => b.average - a.average,
    );

    console.log("SortedData >>", goodSortedStudents);

    const exportData = goodSortedStudents.map((student) => {
        return { id: student.id, name: student.name, average: student.average };
    });

    return exportData;
}

// analyzeStudents(students);
console.log(analyzeStudents(students));
