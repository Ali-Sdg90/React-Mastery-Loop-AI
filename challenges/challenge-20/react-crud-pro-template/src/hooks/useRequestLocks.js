import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Prevent duplicate actions with the same key, without blocking other keys.
 * Example: "create" or "post:12".
 */
export function useRequestLocks() {
    const activeKeysRef = useRef(new Set());
    const mountedRef = useRef(false);
    const [busyKeys, setBusyKeys] = useState(() => new Set());

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    const runLocked = useCallback(async (key, operation) => {
        if (activeKeysRef.current.has(key)) return false;

        activeKeysRef.current.add(key);
        if (mountedRef.current) {
            setBusyKeys(new Set(activeKeysRef.current));
        }

        try {
            return await operation();
        } finally {
            activeKeysRef.current.delete(key);
            if (mountedRef.current) {
                setBusyKeys(new Set(activeKeysRef.current));
            }
        }
    }, []);

    return { runLocked, busyKeys };
}
