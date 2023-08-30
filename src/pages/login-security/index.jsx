import React from "react";

import MainLayout from "@/shared/Layouts/MainLayout";
import ChangeUserPassword from "@/shared/views/ChangeUserPassword/ChangeUserPassword";

const LoginSecurityPage = () => {
    return (
        <MainLayout>
            <ChangeUserPassword />
        </MainLayout>
    );
};

export default LoginSecurityPage;
