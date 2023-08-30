import React, { useRef, useState } from "react";

import Link from "next/link";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

import CartProcessSteps from "@/shared/components/CartProcessSteps/CartProcessSteps.jsx";
import ProductImg1 from "@/shared/assets/images/slider-img5.png";
import ProductImage1 from "@/shared/assets/images/product-1.png";
import ProductImage2 from "@/shared/assets/images/product-2.png";
import ProductImage4 from "@/shared/assets/images/product-4.png";
import DiscountRupee from "@/shared/assets/images/grey-rupee.svg";
import ActualRupee from "@/shared/assets/images/rupee.svg";
import ProductPricing from "@/shared/components/ProductPricing/ProductPricing.jsx";
import Products from "@/shared/components/Products/Products.jsx";
import Coupon1 from "@/shared/assets/images/coupn-img1.png";
import Coupon2 from "@/shared/assets/images/coupn-img2.png";
import "./Cart.scss";
import CartItem from "../../components/CartItem/CartItem";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { useWindowSize } from "@/shared/hooks/windowSize";
import { debounce } from "lodash";

const Cart = () => {
    const [couponActive, setcouponActive] = useState(false);

    const isLoggedIn = useSelector(
        (state) => state.checkLoginSlice?.isLoggedIn
    );
    const [popUp, setPopUp] = useState(false);
    const [coupon, setCoupon] = useState("");
    const router = useRouter();
    const [windowWidth] = useWindowSize();
    const sliderRef1 = useRef();
    const couponPopUp = () => {
        setPopUp(true);
        document.body.classList.toggle("modal-open");
    };
    const closePopUp = () => {
        setPopUp(false);
        document.body.classList.toggle("modal-open");
    };
    const applyCoupon = () => {
        setCoupon("CITI125");
        closePopUp();
    };

    const ProductDetails = [
        {
            ImageLink: ProductImage1.src,
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
            OfferPercent: "(40% off)",
        },
        {
            ImageLink: ProductImage2.src,
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
            OfferPercent: "(40% off)",
        },
        {
            ImageLink: ProductImage2.src,
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
            OfferPercent: "(40% off)",
        },
        {
            ImageLink: ProductImage1.src,
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
            OfferPercent: "(40% off)",
        },
        {
            ImageLink: ProductImage4.src,
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
            OfferPercent: "(40% off)",
        },
        {
            ImageLink: ProductImage1.src,
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
            OfferPercent: "(40% off)",
        },
        {
            ImageLink: ProductImage4.src,
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
            OfferPercent: "(40% off)",
        },
        {
            ImageLink: ProductImage1.src,
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
            OfferPercent: "(40% off)",
        },
        {
            ImageLink: ProductImage4.src,
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
            OfferPercent: "(40% off)",
        },
    ];
    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        draggable: false,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        waitForAnimate: false,
        touchThreshold: 8,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1022,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 767,
                settings: "unslick",
            },
        ],
    };
    const priceData = {
        totalPrice: "7500",
        discount: "3003",
        Shipping: "150",
        promotionApplied: "250",
        OrderTotal: "4397",
    };
    const cartProcess = {
        Cart: {
            status: "inProcess",
        },
        Address: {
            status: false,
        },
        Payment: {
            status: false,
        },
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
                price: "1499",
                unit: 10,
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
                image: ProductImg1.src,
                brandName: "Brand Name",
                name: "Kimloo Car G7 Universal Bluetooth USB Car Receiver",
                soldBy: "Pegasus Premium",
                sku: "AFSS110358",
                color: "Peach Brown",
                qty: "01",
                unit: 10,
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
    const onWheelSlider = debounce((e, ref) => {
        if (!ref?.current) return;
        if (e.deltaX > 0 && windowWidth > 767) {
            ref?.current?.slickNext();
        } else if (e.deltaX < 0 && windowWidth > 767) {
            ref?.current?.slickPrev();
        }
    }, 20);

    const navigateHandler = (route) => {
        localStorage.setItem("navigateTo", "/my-cart");
        router.push(route);
    };
    return (
        <div className="cart-wrapper">
            <div className="container">
                <div className="cart-main-head">
                    <div className="cart-head">
                        <i
                            className="icon-back"
                            onClick={() => router.back()}
                            style={{ cursor: "pointer" }}
                        ></i>
                        <div className="cart-qty-wrp">
                            <div
                                className="go-back"
                                aria-label="Go back"
                                // style={}
                            >
                                Your Cart
                            </div>
                            <span className="cart-qty">4 Items</span>
                        </div>
                    </div>
                    <CartProcessSteps cartProcess={cartProcess} />
                </div>
                <div className="cart-block">
                    <div className="ltl-wrap">
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
                    <div className="rtl-wrap">
                        <div className="coupon-block">
                            <h3>Coupon</h3>
                            <div className="coupon-box">
                                <div className="coupon-wrap">
                                    <input
                                        type="text"
                                        placeholder="Enter Coupon Code"
                                        className="form-control"
                                        onChange={(e) =>
                                            setCoupon(e.target.value)
                                        }
                                        value={coupon}
                                    />
                                    <button
                                        className="apply-coupon"
                                        aria-label="Apply"
                                        role="button"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {coupon ? (
                                    <div className="applied-coupon-wrap">
                                        <h4>{coupon}</h4>
                                        <button
                                            onClick={() => {
                                                setCoupon("");
                                            }}
                                            className="removed-applied-coupons"
                                            aria-label="Apply coupon"
                                            role="button"
                                        >
                                            <i className="icon-cross"></i>
                                        </button>
                                    </div>
                                ) : null}
                                <button
                                    className="view-coupons"
                                    onClick={couponPopUp}
                                    aria-label="View coupons"
                                    role="button"
                                >
                                    View Available Coupons
                                </button>
                                <CSSTransition
                                    in={popUp}
                                    timeout={200}
                                    classNames="slide-in-left"
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <div className={`pop-up active`}>
                                        <div className="popup-wrapper">
                                            <div className="popup-content">
                                                <button
                                                    onClick={closePopUp}
                                                    className="close-btn"
                                                    aria-label="Close"
                                                    role="button"
                                                >
                                                    <i className="cancel-icon"></i>
                                                </button>
                                                <div className="coupon-head-wrap main-head">
                                                    <div
                                                        prefetch={false}
                                                        className="go-back coupon-heading"
                                                        aria-label="Cart"
                                                    >
                                                        {/* <i className="icon-back"></i> */}
                                                        Apply Coupon
                                                    </div>
                                                </div>
                                                <div className="coupon-summary-wrap">
                                                    {/* <h4>Last Name</h4> */}
                                                    <div className="coupon-field">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Coupon Code"
                                                            className="form-control"
                                                        />
                                                        <button
                                                            className="apply-code"
                                                            onClick={
                                                                applyCoupon
                                                            }
                                                            aria-label="Apply coupon"
                                                            role="button"
                                                        >
                                                            Apply
                                                        </button>
                                                    </div>
                                                    <div className="coupon-head-wrap">
                                                        <h3>Coupons</h3>
                                                    </div>
                                                    <div className="coupon-summary-main-wrp">
                                                        <div className="coupon-summary">
                                                            <div className="coupon-wrapper">
                                                                <div
                                                                    className="coupon-img"
                                                                    style={{
                                                                        position:
                                                                            "relative",
                                                                    }}
                                                                >
                                                                    {/* <img src={Coupon1.src} alt="coupon-img" /> */}
                                                                    <Image
                                                                        src={
                                                                            Coupon1.src
                                                                        }
                                                                        alt="coupon-img"
                                                                        priority
                                                                        width={
                                                                            84
                                                                        }
                                                                        height={
                                                                            48
                                                                        }
                                                                        title="coupon-img"
                                                                    />
                                                                </div>
                                                                <button
                                                                    className="apply-code"
                                                                    onClick={
                                                                        applyCoupon
                                                                    }
                                                                    aria-label="Apply coupon"
                                                                    role="button"
                                                                >
                                                                    Apply
                                                                </button>
                                                            </div>
                                                            <div className="coupon-description">
                                                                <span className="get-discount">
                                                                    Get 15%+5%
                                                                    extra on
                                                                    your first
                                                                    order
                                                                </span>
                                                                <p>
                                                                    Coupon
                                                                    applicable
                                                                    on first
                                                                    order above
                                                                    Rs. 1999.
                                                                    Order Now.
                                                                </p>
                                                            </div>
                                                            <div className="coupon-validity">
                                                                <div className="coupon-value-wrp">
                                                                    Coupon Code:
                                                                    <span className="value">
                                                                        3DINDIA
                                                                    </span>
                                                                </div>
                                                                <div className="coupon-value-wrp expiry-date-wrp">
                                                                    <div className="validity-wrp">
                                                                        Validity:
                                                                        <span className="value">
                                                                            18th
                                                                            Jan
                                                                            2023
                                                                        </span>
                                                                    </div>
                                                                    <span className="coupon-expires">
                                                                        Expires
                                                                        in 22
                                                                        Days
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="coupon-summary">
                                                            <div className="coupon-wrapper">
                                                                <div
                                                                    className="coupon-img"
                                                                    style={{
                                                                        position:
                                                                            "relative",
                                                                    }}
                                                                >
                                                                    <Image
                                                                        src={
                                                                            Coupon2.src
                                                                        }
                                                                        alt="coupon-img"
                                                                        priority
                                                                        width={
                                                                            84
                                                                        }
                                                                        height={
                                                                            48
                                                                        }
                                                                        title="coupon-img"
                                                                    />
                                                                    {/* <img src={Coupon2.src} alt="coupon-img" /> */}
                                                                </div>
                                                                <button
                                                                    className="apply-code"
                                                                    onClick={
                                                                        applyCoupon
                                                                    }
                                                                    aria-label="Apply coupon"
                                                                    role="button"
                                                                >
                                                                    Apply
                                                                </button>
                                                            </div>
                                                            <div className="coupon-description">
                                                                <span className="get-discount">
                                                                    Get 15%+5%
                                                                    extra on
                                                                    your first
                                                                    order
                                                                </span>
                                                                <p>
                                                                    Coupon
                                                                    applicable
                                                                    on first
                                                                    order above
                                                                    Rs. 1999.
                                                                    Order Now.
                                                                </p>
                                                            </div>
                                                            <div className="coupon-validity">
                                                                <div className="coupon-value-wrp">
                                                                    Coupon Code:
                                                                    <span className="value">
                                                                        3DINDIA
                                                                    </span>
                                                                </div>
                                                                <div className="coupon-value-wrp expiry-date-wrp">
                                                                    <div className="validity-wrp">
                                                                        Validity:
                                                                        <span className="value">
                                                                            18th
                                                                            Jan
                                                                            2023
                                                                        </span>
                                                                    </div>
                                                                    <span className="coupon-expires">
                                                                        Expires
                                                                        in 22
                                                                        Days
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CSSTransition>
                            </div>
                        </div>
                        <div className="payment-wrapper">
                            <h3>Cart Summary</h3>
                            <span className="cart-qty">2 items</span>
                            <ProductPricing priceData={priceData} />
                            <button
                                type="button"
                                onClick={() =>
                                    navigateHandler(
                                        isLoggedIn
                                            ? "/checkout-address"
                                            : "/sign-in"
                                    )
                                }
                                className="order-proceed mob-hide"
                                aria-label="Place order"
                            >
                                PROCEED TO PAY <i className="proceed-arrow"></i>
                            </button>
                        </div>
                        <div className="safety-msg">
                            <div className="safe-wrp">
                                <i className="icon-safety"></i>
                                <p>Your transaction is safe with us</p>
                            </div>
                        </div>
                        <div className="desk-hide cart-fixed-wrp">
                            <div className="grand-total">
                                <span className="price">₹4397</span>
                                Grand Total
                            </div>
                            <Link
                                href="/checkout-address"
                                className="order-proceed"
                                aria-label="Place order"
                            >
                                PROCEED TO PAY <i className="proceed-arrow"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="similar-products">
                    <h3>Recently Viewed</h3>
                    <div
                        className="slider-wrap"
                        onWheel={(e) => onWheelSlider(e, sliderRef1)}
                    >
                        <Slider {...settings} ref={sliderRef1}>
                            {ProductDetails.map((item, index) => {
                                return <Products getData={item} key={index} />;
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
