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

    const successReq = requests.filter((request) => {
        if (request.status >= 200 && request.status < 300) {
            averageSuccessDuration += request.duration;
            return request;
        }
    });

    const sortDurationRequests = requests.sort(
        (b, a) => a.duration - b.duration,
    );

    return {
        successCount: successReq.length,
        errorCount: requests.length - successReq.length,
        averageSuccessDuration: averageSuccessDuration / successReq.length,
        slowestEndpoint: sortDurationRequests[0]?.endpoint ?? null,
    };
};

console.log(analyzeRequests(requests));
