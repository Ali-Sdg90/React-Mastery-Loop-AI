import { useRef, useCallback } from "react";

export default function useRequestLock() {
    const isRunning = useRef(false);

    const runLocked = useCallback(async (callback) => {
        if (isRunning.current) {
            return;
        }

        isRunning.current = true;

        try {
            return await callback();
        } finally {
            isRunning.current = false;
        }
    }, []);

    return runLocked;
}
