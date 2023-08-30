import { axiosInstance } from "../api/axios";
import { userEndpoints } from "../api/endpoints";
import { notify } from "./notifyToast";

const signInWithSocialMedia = (payload, router, callback) => {
    axiosInstance
        .post(userEndpoints.socialSignin, { socialId: payload.socialId })
        .then((res) => {
            notify.successToast(res.data.message);
            callback(res.data.data.token);
        })
        .catch((error) => {
            if (error.response.data.message === "USER DOESN'T EXIST") {
                router.push({
                    pathname: "/social-signup",
                    query: payload,
                });
            }
        });
};

export default signInWithSocialMedia;
