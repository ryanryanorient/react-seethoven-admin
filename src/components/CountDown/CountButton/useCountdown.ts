import { useEffect, useRef, useState } from "react";


export function useCountdown(count: number) {

    const [currentCount, setCurrentCount] = useState(count)
    const [isStart, setStart] = useState(false)

    const timerId = useRef<NodeJS.Timer>();

    const clear = () => {
        timerId && window.clearInterval(timerId.current);
    }

    const stop = () => {
        setStart(false);
        clear();
        timerId.current = undefined;
    }

    const start = () => {
        if (isStart || !timerId.current) {
            return;
        }
        setStart(true);
        timerId.current = setInterval(() => {
            if (currentCount === 1) {
                stop();
                setCurrentCount(count)
            } else {
                setCurrentCount(currentCount - 1)
            }
        }, 1000);
    }

    const reset = () => {
        setCurrentCount(count)
        stop();
    }

    function restart() {
        reset();
        start();
    }

    useEffect(() => {
        return () => {
            reset();
        }
    }, [])

    return { start, reset, restart, clear, stop, currentCount, isStart };
}
