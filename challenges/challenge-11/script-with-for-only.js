const requests = [
    { id: 1, endpoint: "/users", duration: 120, status: 200 },
    { id: 2, endpoint: "/posts", duration: 430, status: 500 },
    { id: 3, endpoint: "/users", duration: 80, status: 200 },
    { id: 4, endpoint: "/comments", duration: 300, status: 404 },
    { id: 5, endpoint: "/posts", duration: 200, status: 201 },
    { id: 6, endpoint: "/users", duration: 160, status: 200 },
];

const analyzeRequests = (requests) => {
    let averageSuccessDuration = 0;
    let successCount = null;
    let slowestEndpoint = 0;

    let slowestDuration = 0;
    for (let i = 0; i < requests.length; i++) {
        if (slowestDuration < requests[i].duration) {
            slowestDuration = requests[i].duration;
            slowestEndpoint = requests[i].endpoint;
        }

        if (requests[i].status >= 200 && requests[i].status < 300) {
            successCount++;
            averageSuccessDuration += requests[i].duration;
        }
    }

    return {
        successCount,
        errorCount: requests.length - successCount,
        averageSuccessDuration: +(
            averageSuccessDuration / successCount
        ).toFixed(0),
        slowestEndpoint,
    };
};

console.log(analyzeRequests(requests));
