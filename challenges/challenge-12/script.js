const requests = [
    { id: 1, endpoint: "/users", duration: 120, status: 200 },
    { id: 2, endpoint: "/posts", duration: 430, status: 500 },
    { id: 3, endpoint: "/users", duration: 80, status: 200 },
    { id: 4, endpoint: "/orders", duration: 300, status: 201 },
    { id: 5, endpoint: "/posts", duration: 190, status: 200 },
    { id: 6, endpoint: "/orders", duration: 600, status: 503 },
    { id: 7, endpoint: "/users", duration: 250, status: 404 },
    { id: 8, endpoint: "/posts", duration: 330, status: 200 },
    { id: 9, endpoint: "/orders", duration: 150, status: 200 },
    { id: 10, endpoint: "/users", duration: 140, status: 200 },
    { id: 11, endpoint: "/posts", duration: 210, status: 502 },
];

const calculateEndpoint = (endpoint) => {
    let success = 0;
    let avgSuccessDuration = 0;

    endpoint.map((item) => {
        if (item.status >= 200 && item.status < 300) {
            success++;
            avgSuccessDuration += item.duration;
        }
    });

    if (avgSuccessDuration) {
        avgSuccessDuration = +(avgSuccessDuration / success).toFixed(2);
    }

    return {
        total: endpoint.length,
        success,
        failed: endpoint.length - success,
        avgSuccessDuration: avgSuccessDuration ? avgSuccessDuration : null,
    };
};

const calculateFailureEndpoint = (successfulRequests, endpoint, requests) => {
    const successfulReqInEndpoint = successfulRequests.filter(
        (req) => req.endpoint === endpoint,
    );

    // console.log(successfulReqInEndpoint);

    const sameTypeEndpoint = requests.filter(
        (req) => req.endpoint === endpoint,
    );

    const failurePercentage =
        ((sameTypeEndpoint.length - successfulReqInEndpoint.length) /
            sameTypeEndpoint.length) *
        100;

    return failurePercentage ? +failurePercentage.toFixed(2) : 0;
};

const analyzeRequests = (requests) => {
    const endpoints = [];

    const successfulRequests = requests.filter(
        (request) => request.status >= 200 && request.status < 300,
    );

    // --- outputEndpoints ---

    requests.forEach((request) => {
        if (!endpoints.includes(request.endpoint)) {
            endpoints.push(request.endpoint);
        }
    });

    const byEndpoint = endpoints.map((endpoint) => {
        const itemsInEndpoint = requests.filter(
            (request) => request.endpoint === endpoint,
        );

        return {
            [endpoint]: calculateEndpoint(itemsInEndpoint),
        };
    });

    const output = {};
    const outputEndpoints = {};

    byEndpoint.forEach((endpoint, index) => {
        outputEndpoints[endpoints[index]] = endpoint[endpoints[index]];
    });

    output["byEndpoint"] = outputEndpoints;

    // --- slowestSuccessful ---

    const slowestSuccessful = {
        id: 0,
        endpoint: null,
        duration: 0,
    };

    successfulRequests.forEach((req) => {
        if (slowestSuccessful.duration < req.duration) {
            slowestSuccessful.duration = req.duration;
            slowestSuccessful.endpoint = req.endpoint;
            slowestSuccessful.id = req.id;
        }
    });

    output["slowestSuccessful"] = slowestSuccessful;

    // --- mostUnreliableEndpoint ---

    const mostUnreliableEndpoint = {
        endpoint: null,
        failureRate: 0,
    };

    endpoints.forEach((endpoint) => {
        const failureRateEndpoint = calculateFailureEndpoint(
            successfulRequests,
            endpoint,
            requests,
        );

        if (mostUnreliableEndpoint.failureRate < failureRateEndpoint) {
            mostUnreliableEndpoint.failureRate = failureRateEndpoint;
            mostUnreliableEndpoint.endpoint = endpoint;
        }
    });

    output["mostUnreliableEndpoint"] = mostUnreliableEndpoint;

    return output;
};

console.log(analyzeRequests(requests));
