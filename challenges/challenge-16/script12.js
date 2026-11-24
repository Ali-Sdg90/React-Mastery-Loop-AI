const company = {
    name: "TechNova",
    departments: [
        {
            id: "frontend",
            name: "Frontend",
            employees: [
                {
                    id: 1,
                    name: "Ali",
                    performance: {
                        score: 85,
                        reviews: 12,
                    },
                },
                {
                    id: 2,
                    name: "Sara",
                    performance: {
                        score: 78,
                        reviews: 8,
                    },
                },
            ],
        },
        {
            id: "backend",
            name: "Backend",
            employees: [
                {
                    id: 3,
                    name: "Reza",
                    performance: {
                        score: 91,
                        reviews: 15,
                    },
                },
                {
                    id: 4,
                    name: "Mina",
                    performance: {
                        score: 88,
                        reviews: 10,
                    },
                },
            ],
        },
    ],
};

function updateEmployeeScore(company, employeeId, newScore) {
    // let isIdAvailable;
    // company.departments.forEach((department) => {
    //     department.employees.forEach(
    //         (employee) => employee.id === employeeId && (isIdAvailable = true),
    //     );
    // });

    let isIdAvailable = company.departments.forEach((department) => {
        return department.employees.some(
            (employee) => employee.id === employeeId,
        );
    });

    console.log(isIdAvailable);

    if (!isIdAvailable) {
        return company;
    }

    return {
        ...company,
        departments: company.departments.map((department) => {
            const isIdHere = department.employees.some(
                (employee) => employee.id === employeeId,
            );

            if (!isIdHere) {
                return department;
            } else {
                return {
                    ...department,
                    employees: department.employees.map((employee) => {
                        if (employee.id !== employeeId) {
                            return employee;
                        } else {
                            return {
                                ...employee,
                                performance: {
                                    ...employee.performance,
                                    score: newScore,
                                },
                            };
                        }
                    }),
                };
            }
        }),
    };
}

const result = updateEmployeeScore(company, 2, 95);

console.log(result);
