import React from "react";

import Cart from "@/shared/views/Cart/Cart";
import NoHeaderLayout from "@/shared/Layouts/NoHeaderLayout";

const CartPage = () => {
    return (
        <NoHeaderLayout>
            <Cart />
        </NoHeaderLayout>
    );
};

export default CartPage;
