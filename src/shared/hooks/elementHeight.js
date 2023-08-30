import { useState, useLayoutEffect } from "react";

//* Custom hook takes html element as parameter and provides its height on scroll event
export const useElementHeight = (element) => {
    const [height, setHeight] = useState(null);
    useLayoutEffect(() => {
        const updateSize = () => {
            if (typeof window !== `undefined`) {
                setHeight(element.offsetHeight);
            }
        };
        if (typeof window !== `undefined`) {
            window.addEventListener("scroll", updateSize);
            updateSize();
            return () => window.removeEventListener("scroll", updateSize);
        }
    }, [element]);
    return height;
};
