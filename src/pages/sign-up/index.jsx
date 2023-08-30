import React from "react";
import Head from "next/head";

import MainLayout from "@/shared/Layouts/MainLayout";
import SignUp from "@/shared/views/SignUp/SignUp";

const SignUpPage = () => {
    return (
        <>
            <Head>
                <title>Sign up</title>
                <meta name="description" content={"This is carorbis."} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                />
            </Head>
            <MainLayout>
                <SignUp />
            </MainLayout>
        </>
    );
};

export default SignUpPage;
