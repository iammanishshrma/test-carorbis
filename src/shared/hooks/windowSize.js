import { useState, useLayoutEffect } from "react";

//* Custom hook: Check if window is resides and provides width, height
export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        const updateSize = () => {
            if (typeof window !== `undefined`) {
                setSize([window.innerWidth, window.innerHeight]);
            }
        };
        if (typeof window !== `undefined`) {
            window.addEventListener("resize", updateSize);
            updateSize();
            return () => window.removeEventListener("resize", updateSize);
        }
    }, []);
    return size;
};
