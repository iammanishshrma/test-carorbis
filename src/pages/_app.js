import Head from "next/head";

import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import store from "@/shared/store/store";

import appleTouchIcon from "@/shared/assets/images/favicons/apple-touch-icon.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/shared/assets/styles/main.scss";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <>
            <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            >
                <Provider store={store}>
                    <Head>
                        <title>Carorbis</title>
                        <link
                            rel="apple-touch-icon"
                            sizes="180x180"
                            href={appleTouchIcon.src}
                        ></link>
                        <link
                            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
                            rel="stylesheet"
                        />

                        <link
                            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                            rel="stylesheet"
                        />

                        <meta
                            name="description"
                            content={"This is carorbis."}
                        />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                        />
                        {/* <script
                            src="https://accounts.google.com/gsi/client"
                            async
                            defer
                        /> */}
                        <script
                            defer
                            crossOrigin="anonymous"
                            src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v16.0&appId=758578365717574&autoLogAppEvents=1"
                            nonce="5zXzbKct"
                        />
                        <script
                            defer
                            crossOrigin="anonymous"
                            src="https://connect.facebook.net/en_US/sdk.js"
                        />
                    </Head>

                    <Component {...pageProps} />
                </Provider>
            </GoogleOAuthProvider>
        </>
    );
}
