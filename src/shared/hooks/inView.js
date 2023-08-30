import { useEffect, useState } from "react";

//* Custom hook: takes reference of html element as parameter and checkes if it is in viewport or not
const useIsInViewport = (ref, observerOptions) => {
    const [isVisible, setIsVisible] = useState(false);
    const callback = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };
    const options = observerOptions;

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);
        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref, options]);

    return isVisible;
};

export { useIsInViewport };
