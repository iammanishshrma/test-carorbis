import React from "react";
import OrderPanel from "@/shared/components/OrderPanel/OrderPanel";
import "./OrderSuccess.scss";
import ProductImg2 from "@/shared/assets/images/product-5.png";
import ProductImg1 from "@/shared/assets/images/slider-img5.png";
import ProductImg3 from "@/shared/assets/images/product-1.png";
import ProductImg4 from "@/shared/assets/images/product-2.png";
import DiscountRupee from "@/shared/assets/images/grey-rupee.svg";
import ActualRupee from "@/shared/assets/images/rupee.svg";
import CartItem from "@/shared/components/CartItem/CartItem";
import '../Cart/Cart.scss'
import ProductPricing from "@/shared/components/ProductPricing/ProductPricing";
// import Slider from "react-slick";
// import { Link } from "gatsby";
// import Products from "../../components/Products/Products";
const OrderSuccess = () => {
    const priceData = {
        totalPrice: "7500",
        discount: "3003",
        Shipping: "150",
        promotionApplied: "250",
        OrderTotal: "4397",
    };
    const cartData = {
        orderDate: "24 August, 2022",
        orderId: "BK9860109060",
        orderStatus: "Completed",
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
                unit: "10",
                price: "1499",
                maxPrice: "2,500",
                discount: "(40% Off)",
                delivery: "Fri, 26 August",
                rate: 0,
                exactFit: "Exact fit for your 2018 Maruti Ritz",
                processData: {
                    Confirmed: {
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
                name: "Kimloo Car G7 Universal Bluetooth USB Car Receiver",
                soldBy: "Pegasus Premium",
                sku: "AFSS110358",
                color: "Peach Brown",
                qty: "01",
                unit: "10",
                price: "1499",
                maxPrice: "2,500",
                discount: "(40% Off)",
                delivery: "Fri, 26 August",
                rate: 0,
                caution: "Caution! This will not fit in any of your vehicles",
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
    const ProductDetails = [
        {
            ImageLink: ProductImg3.src,
            Recomended: "",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName:
                "Portronics AUTO 10 POR-320, Bluetooth device demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 4 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImg4.src,
            Recomended: "",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 3 },
            ratingCount: 80,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImg4.src,
            Recomended: "",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 3 },
            ratingCount: 80,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImg3.src,
            Recomended: "",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName:
                "Portronics AUTO 10 POR-320, Bluetooth device demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 4 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImg1.src,
            Recomended: "",
            TopRated: "Top Rated",
            BrandName: "Brand Name",
            ProductName:
                "Amkette iGrip Easy View One Touch Dashboard and demo demo demo",
            DiscountRupees: DiscountRupee,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 1 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImg3.src,
            Recomended: "",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName:
                "Portronics AUTO 10 POR-320, Bluetooth device demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 4 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImg4.src,
            Recomended: "",
            TopRated: "Top Rated",
            BrandName: "Brand Name",
            ProductName:
                "Amkette iGrip Easy View One Touch Dashboard and demo demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 1 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImg3.src,
            Recomended: "",
            TopRated: "",
            BrandName: "Brand Name",
            ProductName:
                "Portronics AUTO 10 POR-320, Bluetooth device demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 4 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
        {
            ImageLink: ProductImg4.src,
            Recomended: "",
            TopRated: "Top Rated",
            BrandName: "Brand Name",
            ProductName:
                "Amkette iGrip Easy View One Touch Dashboard and demo demo demo",
            DiscountRupees: DiscountRupee.src,
            DiscountPrice: 2500,
            ActualRupees: ActualRupee.src,
            ActualPrice: 1499.0,
            rating: { rate: 1 },
            ratingCount: 81,
            OfferPercent: "(40% OFF)",
        },
    ];
    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        draggable: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    // slidesToScroll: 1,
                    swipeToSlide: true,
                    touchThreshold: 8,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    // const orderSummary = [
    //     {
    //         image: ProductImg1,
    //         name: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
    //         color: "Peach Brown",
    //         qty: "01",
    //         unit: 10,
    //         price: "1499",
    //         maxPrice: "2,500",
    //         delivery: "Fri, 26 August",
    //         deliveryCharge: "150",
    //         unit: "10",
    //     },
    //     {
    //         image: ProductImg2,
    //         name: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
    //         color: "Peach Brown",
    //         qty: "01",
    //         unit: 10,
    //         price: "1499",
    //         maxPrice: "2,500",
    //         delivery: "Fri, 26 August",
    //         deliveryCharge: "150",
    //         unit: "10",
    //     },
    // ];
    return (
        <div className="order-success">
            <div className="container">
                <div className="order-wrap">
                    <i className="icon-checked"></i>
                    <span className="order-id-wrap">
                        Order <span className="order-id">#CAS-2451-12489</span>{" "}
                    </span>
                    <h2>Thank You for ordering Andrew!</h2>
                </div>
                <div className="order-process-detail">
                    <h3>Your Order is confirmed</h3>
                    <span className="para-order">
                        We will start processing your order right away. You will
                        receive an email confirmation shortly on{" "}
                        <a href="mailto:andrew@gmail.com" className="mail">
                            andrew@gmail.com
                        </a>.
                    </span>
                    <span className="para-order"> If your your email hasn’t arrived within 2 minutes,
                        Please check your spam folder.
                    </span>
                </div>
                <div className="success-order-detail">
                    <h2>Order Summary</h2>
                    <div className="order-time">
                        <h4>Order Date:</h4>
                        <span className="order-date">
                            24 August, 2022 05:33 pm
                        </span>
                    </div>
                    <div className="success-order-product cart-block">
                        <div className="ltl-wrap">
                            {/* {cartData.data.map((item, index) => {
                                return (
                                    <OrderPanel
                                        order={cartData}
                                        orderData={item}
                                        key={index}
                                    />
                                );
                            })} */}
                            {cartData.data.map((item, index) => {
                                return (
                                    <CartItem
                                        order={cartData}
                                        orderData={item}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="payment-detail-wrap">
                    <ProductPricing priceData={priceData} />
                    <div className="view-order-wrap">
                        <button className="view-order">View Order</button>
                    </div>
                </div>
                <div className="continue-shopping-wrap">
                    <button className="continue-shopping">CONTINUE SHOPPING</button>
                </div>
            </div>
        </div >
    );
};

export default OrderSuccess;
