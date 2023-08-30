import Cookies from "js-cookie";

export const isLoggedIn = () => {
    const token =
        typeof window !== "undefined" ? Cookies.get("authToken") : null;
    if (token) {
        return true;
    }
    return false;
};
