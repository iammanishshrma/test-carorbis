import { NextResponse } from "next/server";

const signedInRoutes = [
    "/my-profile",
    "/my-orders",
    "/my-address",
    "/my-notifications",
    "/help-support",
    "/login-security",
    "/my-wishlist",
];

export default function middleware(req) {
    let isLoggedIn = req.cookies.has("authToken");
    let requestUrl = req.url;
    let redirectURL = req.nextUrl.clone();

    if (signedInRoutes.find((url) => url === req.nextUrl.pathname)) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/sign-in", requestUrl));
        }
    }

    if (
        (isLoggedIn && requestUrl.includes("/sign-in")) ||
        (isLoggedIn && requestUrl.includes("/sign-up"))
    ) {
        redirectURL.pathname = "/";
        return NextResponse.redirect(redirectURL);
    }
}

export const config = {
    matcher: [
        "/my-profile",
        "/my-orders",
        "/my-address",
        "/my-notifications",
        "/help-support",
        "/login-security",
        "/sign-in",
        "/sign-up",
        "/my-wishlist",
    ],
};
