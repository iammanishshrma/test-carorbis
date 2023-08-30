import React, { useState } from "react";

import UserInfo from "./UserInfo";
import EditUserInfo from "./EditUserInfo";
import "./AccountForm.scss";

const AccountForm = () => {
    const [isEdit, setIsEdit] = useState(false);

    const showEditHandler = () => setIsEdit(true);
    const hideEditHandler = () => setIsEdit(false);

    return (
        <>
            {isEdit ? (
                <EditUserInfo onDoneClick={hideEditHandler} />
            ) : (
                <UserInfo onEditClick={showEditHandler} />
            )}
        </>
    );
    // return (
    //     <>
    //         <UserInfo path="/" />
    //         <Router>
    //             <EditUserInfo path="edit" />
    //         </Router>
    //     </>
    // );
};
export default AccountForm;
