import { useEffect, useLayoutEffect, useState } from "react";

interface WindowDimensions {
    width: number | undefined,
    height: number | undefined
}

function getWindowDimensions(): WindowDimensions {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({ width: undefined, height: undefined });
    useEffect(() => {
        setWindowDimensions(getWindowDimensions());
    }, [])

    useLayoutEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}