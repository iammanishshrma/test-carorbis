import React from "react";
import Head from "next/head";

import MainLayout from "@/shared/Layouts/MainLayout";
import SignIn from "@/shared/views/SignIn/SignIn";

const SignInPage = () => {
    return (
        <>
            <Head>
                <title>Sign in</title>
                <meta name="description" content={"This is carorbis."} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                />
            </Head>
            <MainLayout>
                <SignIn />
            </MainLayout>
        </>
    );
};

export default SignInPage;
