import { useEffect } from "react";

//* Custom hook: Takes ref of html element and callback function.
//* It checks if user clicked outside ref element and calls callback accordingly.

const useOutsideClick = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};

export default useOutsideClick;
