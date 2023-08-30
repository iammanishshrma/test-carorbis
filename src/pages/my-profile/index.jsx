import Head from "next/head";

import MainLayout from "@/shared/Layouts/MainLayout";
import MyProfile from "@/shared/views/MyProfile/MyProfile";

const MyProfilePage = () => {
    return (
        <>
            <Head>
                <title>My profile</title>
                <meta name="description" content={"This is carorbis."} />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            </Head>
            <MainLayout>
                <MyProfile />
            </MainLayout>
        </>
    );
};

export default MyProfilePage;
