import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MainLayout from "@/shared/Layouts/MainLayout";
import SocialSignUp from "@/shared/views/SocialSignUp/SocialSignUp";

const SocialSignUpPage = (props) => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setUserData(router.query);
    }, [router]);
    return (
        <MainLayout>
            <SocialSignUp userData={userData} />
        </MainLayout>
    );
};

export default SocialSignUpPage;
