import { useEffect, useState } from "react";

const useFetch = (API_LINK, refresh) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setErrorMsg(null);

            const response = await fetch(API_LINK);

            if (!response.ok) {
                setErrorMsg("Fetch Failed!");
            }

            const data = await response.json();
            // console.log("data >>", data);

            setData(data);
        } catch (error) {
            console.log(error);
            setErrorMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    return { isLoading, errorMsg, data };
};

export default useFetch;
