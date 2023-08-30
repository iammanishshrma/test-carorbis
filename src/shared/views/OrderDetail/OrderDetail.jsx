import React from "react";
import BreadCrumbSection from "@/shared/components/BreadCrumb/BreadCrumb";
import ProductImg1 from "@/shared/assets/images/slider-img5.png";
import ProductImg2 from "@/shared/assets/images/product-5.png";
import ProductImage1 from "@/shared/assets/images/product-1.png";
import ProductImage2 from "@/shared/assets/images/product-2.png";
import "../MyOrder/MyOrder.scss";
import "./OrderDetail.scss";
import LeftAccountPanel from "@/shared/components/LeftAccountPanel/LeftAccountPanel";
import OrderStatus from "../../components/OrderStatus/OrderStatus";

const OrderDetail = () => {
    const breadcrumbData = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Account",
            link: "/app/my-profile",
        },
        {
            name: "Order & Returns",
            link: "/app/my-order",
        },
        {
            name: "Orders Details",
            link: "/app/order-detail",
        },
    ];
    const panelData = [
        {
            panelItem: "Orders & Returns",
            panelType: "manage your Orders & Returns",
            className: "icon-order",
        },
        {
            panelItem: "My Addresses",
            panelType: "Edit & manage your adresses",
            className: "icon-address",
        },
        {
            panelItem: "Wishlist",
            panelType: "Manage your wishlist",
            className: "icon-wishlist",
        },
        {
            panelItem: "Notifications",
            panelType: "View & manage your Notifications",
            className: "icon-notification",
        },
        {
            panelItem: "Personal Information",
            panelType: "Edit & manage your profile",
            className: "icon-info",
        },
        {
            panelItem: "Help & Support",
            panelType: "Need help? write to us",
            className: "icon-help",
        },
    ];
    const orderDetail = {
        orderDate: "24 August, 2022",
        orderId: "BK9860109060",
        // orderStatus: "Completed",
        paymentDetails: "Debit Card: Visa-9866 #CARB-S5258686",
        address:
            "Hanuman Mandir Rd, Sector 11, Nerul, Mumbai, Maharashtra, India, 400708",
        data: [
            {
                image: ProductImg1.src,
                brandName: "Brand Name",
                name: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
                soldBy: "Pegasus Premium",
                sku: "AFSS110358",
                color: "Peach Brown",
                qty: "01",
                price: "1499",
                maxPrice: "2,500",
                discount: "(40% Off)",
                delivery: "Fri, 26 August",
                rate: 0,
                orderStatus: "inProcess",
                processData: {
                    Ordered: {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "09:30 am",
                    },
                    "Ready to ship": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "05:40 pm",
                    },
                    Shipped: {
                        status: "inProcess",
                    },
                    Delivered: {
                        status: false,
                    },
                },
            },
            {
                image: ProductImg2.src,
                brandName: "Brand Name",
                name: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
                soldBy: "Pegasus Premium",
                sku: "AFSS110358",
                color: "Peach Brown",
                qty: "01",
                price: "1499",
                maxPrice: "2,500",
                discount: "(40% Off)",
                delivery: "Fri, 26 August",
                rate: 3,
                orderStatus: "Delivered",
                processData: {
                    Ordered: {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "09:30 am",
                    },
                    "Ready to ship": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "05:40 pm",
                    },
                    Shipped: {
                        status: true,
                    },
                    Delivered: {
                        status: true,
                    },
                },
            },
            {
                image: ProductImg2.src,
                brandName: "Brand Name",
                name: "Kimloo Car G7 Universal Bluetooth USB Car Receiver",
                soldBy: "Pegasus Premium",
                sku: "AFSS110358",
                color: "Peach Brown",
                qty: "01",
                price: "1499",
                maxPrice: "2,500",
                discount: "(40% Off)",
                delivery: "Fri, 26 August",
                rate: 0,
                orderStatus: "Return Approved",
                returnDescription:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum purus consequat integer iaculis. Donec sit diam, malesuada nunc, dignissim fames vel dapibus. Congue sagittis id condimentum cras. Leo, sed tortor vel pharetra et at placerat. Nisl, proin eget risus vitae elementum, massa pulvinar a egestas. Nullam ullamcorper id quis eget dictum et urna ullamcorper id. Auctor convallis mattis sit nullam orci proin viverra etiam felis. Augue fringilla ac nec gravida tincidunt. Risus, in elementum orci, commodo. Interdum velit.",
                returnReason: "item defective",
                returnProductImg: [
                    {
                        returnImg: ProductImage2.src,
                    },
                    {
                        returnImg: ProductImg1.src,
                    },
                    {
                        returnImg: ProductImage1.src,
                    },
                ],
                processData: {
                    "Return Requested": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "09:30 am",
                    },
                    "Return Approved": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "05:40 pm",
                    },
                    "Item Picked": {
                        status: false,
                    },
                    "Refund Inititated": {
                        status: false,
                    },
                    "Return Complete": {
                        status: false,
                    },
                },
            },
            {
                image: ProductImg2.src,
                brandName: "Brand Name",
                name: "Kimloo Car G7 Universal Bluetooth USB Car Receiver",
                soldBy: "Pegasus Premium",
                sku: "AFSS110358",
                color: "Peach Brown",
                qty: "01",
                price: "1499",
                maxPrice: "2,500",
                discount: "(40% Off)",
                delivery: "Fri, 26 August",
                rate: 0,
                orderStatus: "inProcess",
                returnReason: "item defective",
                returnDescription:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum purus consequat integer iaculis. Donec sit diam, malesuada nunc, dignissim fames vel dapibus. Congue sagittis id condimentum cras. Leo, sed tortor vel pharetra et at placerat. Nisl, proin eget risus vitae elementum, massa pulvinar a egestas. Nullam ullamcorper id quis eget dictum et urna ullamcorper id. Auctor convallis mattis sit nullam orci proin viverra etiam felis. Augue fringilla ac nec gravida tincidunt. Risus, in elementum orci, commodo. Interdum velit.",
                returnProductImg: [
                    {
                        returnImg: ProductImage2.src,
                    },
                    {
                        returnImg: ProductImg1.src,
                    },
                    {
                        returnImg: ProductImage1.src,
                    },
                ],
                processData: {
                    "Return Requested": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "09:30 am",
                    },
                    "Return Approved": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "05:40 pm",
                    },
                    "Item Picked": {
                        status: "inProcess",
                    },
                    "Return Complete": {
                        status: false,
                    },
                },
            },
            {
                image: ProductImg1.src,
                brandName: "Brand Name",
                name: "Kimloo Car G7 Universal Bluetooth USB Car Receiver",
                soldBy: "Pegasus Premium",
                sku: "AFSS110358",
                color: "Peach Brown",
                qty: "01",
                price: "1499",
                maxPrice: "2,500",
                discount: "(40% Off)",
                delivery: "Fri, 26 August",
                rate: 1,
                orderStatus: "Return Completed",
                returnDescription:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum purus consequat integer iaculis. Donec sit diam, malesuada nunc, dignissim fames vel dapibus. Congue sagittis id condimentum cras. Leo, sed tortor vel pharetra et at placerat. Nisl, proin eget risus vitae elementum, massa pulvinar a egestas. Nullam ullamcorper id quis eget dictum et urna ullamcorper id. Auctor convallis mattis sit nullam orci proin viverra etiam felis. Augue fringilla ac nec gravida tincidunt. Risus, in elementum orci, commodo. Interdum velit.",
                returnReason: "item defective",
                returnProductImg: [
                    {
                        returnImg: ProductImage2.src,
                    },
                    {
                        returnImg: ProductImg1.src,
                    },
                    {
                        returnImg: ProductImage1.src,
                    },
                ],
                processData: {
                    "Return Requested": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "09:30 am",
                    },
                    "Return Approved": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "05:40 pm",
                    },
                    "Refund Inititated": {
                        status: true,
                        paymentDetails: {
                            name: "ABC",
                            source: "same account",
                            amount: "1499",
                        },
                    },
                    "Return Completed": {
                        status: true,
                    },
                },
            },
            {
                image: ProductImg1.src,
                brandName: "Brand Name",
                name: "Kimloo Car G7 Universal Bluetooth USB Car Receiver",
                soldBy: "Pegasus Premium",
                sku: "AFSS110358",
                color: "Peach Brown",
                qty: "01",
                price: "1499",
                maxPrice: "2,500",
                discount: "(40% Off)",
                delivery: "Fri, 26 August",
                rate: 0,
                orderStatus: "Return Cancelled",
                processData: {
                    "Return Requested": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "09:30 am",
                    },
                    "Return Approved": {
                        status: true,
                        date: "On 24 Aug, 2022",
                        time: "05:40 pm",
                    },
                    "Return Cancelled": {
                        status: "cancel",
                        date: "On 24 Aug, 2022",
                        time: "05:40 pm",
                    },
                    "Refund Inititated": {
                        status: false,
                    },
                    "Return Complete": {
                        status: false,
                    },
                },
            },
        ],
    };

    return (
        <div className="my-account">
            <div className="container">
                <BreadCrumbSection breadcrumbData={breadcrumbData} />
                <div className="account-details order-status">
                    <LeftAccountPanel panelData={panelData} />
                    <OrderStatus orderData={orderDetail} />
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
