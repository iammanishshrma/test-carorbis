import React from "react";

import CheckoutPayment from "@/shared/views/CheckoutPayment/CheckoutPayment";
import NoHeaderLayout from "@/shared/Layouts/NoHeaderLayout";

const CheckoutPage = () => {
    return (
        <NoHeaderLayout>
            <CheckoutPayment />
        </NoHeaderLayout>
    );
};

export default CheckoutPage;
