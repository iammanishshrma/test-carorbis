import React from "react";

import { ToastContainer } from "react-toastify";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = ({ children }) => {
    return (
        <>
            <div className="toast-wrp">
                <ToastContainer icon={<i className="toast-icon"></i>} />
            </div>
            <Header />
            {children}
            <Footer />
        </>
    );
};
export default MainLayout;
