import React from "react";

import { ToastContainer } from "react-toastify";

const NoHeaderLayout = ({ children }) => {
    return (
        <>
            <div className="toast-wrp">
                <ToastContainer icon={<i className="toast-icon"></i>} />
            </div>
            {children}
        </>
    );
};
export default NoHeaderLayout;
