import React from "react";

import CheckoutAddress from "@/shared/views/CheckoutAddress/CheckoutAddress";
import NoHeaderLayout from "@/shared/Layouts/NoHeaderLayout";

const CheckoutPage = () => {
    return (
        <NoHeaderLayout>
            <CheckoutAddress />
        </NoHeaderLayout>
    );
};

export default CheckoutPage;
