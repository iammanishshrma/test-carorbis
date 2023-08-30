import React, { useEffect, useState } from "react";

import Link from "next/link";

import CartAddress from "@/shared/components/CartAddress/CartAddress";
import CartSummary from "@/shared/components/CartSummary/CartSummary";
import ProductPricing from "@/shared/components/ProductPricing/ProductPricing";
import ProductImg1 from "@/shared/assets/images/slider-img5.png";
import ProductImg2 from "@/shared/assets/images/product-5.png";
import CartProcessSteps from "@/shared/components/CartProcessSteps/CartProcessSteps.jsx";
import AddressForm from "@/shared/components/AddressForm/AddressForm";

import "@/shared/components/AccountForm/AccountForm.scss";
import "../Cart/Cart.scss";
import "./CheckoutAddress.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "@/shared/store/slices/addressSlice";

const priceData = {
    totalPrice: "7500.00",
    discount: "3003.00",
    Shipping: "150.00",
    promotionApplied: "250.00",
    OrderTotal: "4397.00",
};

const orderSummary = [
    {
        image: ProductImg1,
        name: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
        color: "Peach Brown",
        qty: "01",
        unit: 10,
        price: "1499.00",
        maxPrice: "2,500",
        delivery: "Fri, 26 August",
        deliveryCharge: "150",
        unit: "10",
    },
    {
        image: ProductImg2,
        name: "AUTO CAR WINNER Beige Car Armrest for Maruti Ritz",
        color: "Peach Brown",
        qty: "01",
        unit: 10,
        price: "1499.00",
        maxPrice: "2,500",
        delivery: "Fri, 26 August",
        deliveryCharge: "150",
        unit: "10",
    },
];

const cartProcess = {
    Cart: {
        status: true,
    },
    Address: {
        status: "inProcess",
    },
    Payment: {
        status: false,
    },
};

const CheckoutAddress = () => {
    const [addressOpen, setAddressOpen] = useState(false);
    const addressList = useSelector((state) => state.addressData.addressList);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [defaultAddress, setDefaultAddress] = useState(null);
    const [otherAddresses, setOtherAddress] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        setDefaultAddress(addressList?.find((address) => address.isDefault));
        setOtherAddress(addressList?.filter((address) => !address.isDefault));
    }, [addressList]);

    useEffect(() => {
        dispatch(getAddresses());
    }, []);

    useEffect(() => {
        if (defaultAddress) {
            setSelectedAddress(defaultAddress?._id);
        } else {
            setSelectedAddress(otherAddresses?.[0]?._id);
        }
    }, [defaultAddress, otherAddresses]);

    const changeAddressHandler = (id) => {
        setSelectedAddress(id);
    };

    return (
        <div className="checkout-wrap">
            <div className="container">
                <div className="cart-main-head">
                    <div>
                        <Link
                            href="/my-cart"
                            prefetch={false}
                            className="go-back"
                            aria-label="Cart"
                        >
                            <i className="icon-back"></i>
                            Address
                        </Link>
                    </div>
                    <CartProcessSteps cartProcess={cartProcess} />
                </div>
                <div className="checkout-content">
                    <div className="ltl-address">
                        <div className="desk-hide">
                            {!addressOpen ? (
                                <button
                                    className="add-address"
                                    onClick={() => setAddressOpen(true)}
                                    aria-label="Add new address"
                                    role="button"
                                >
                                    <i className="icon-add"></i>Add New Address
                                </button>
                            ) : (
                                <AddressForm
                                    onClose={() => setAddressOpen(false)}
                                    heading={"Add New Address"}
                                />
                            )}
                        </div>
                        <div className="cart-address-wrap">
                            <div className="mob-hide">
                                <h2>My Addresses</h2>
                            </div>
                            {/* <h3>Default Address</h3> */}
                            {selectedAddress && defaultAddress && (
                                <div className="address-list">
                                    <h3>DEFAULT ADDRESS</h3>
                                    <CartAddress
                                        selectedAddress={selectedAddress}
                                        onAddressChange={changeAddressHandler}
                                        addressList={defaultAddress}
                                    />
                                </div>
                            )}
                            {selectedAddress && otherAddresses?.length > 0 && (
                                <div className="address-list">
                                    <h3>OTHER ADDRESS</h3>
                                    {otherAddresses?.map((items, index) => {
                                        return (
                                            <CartAddress
                                                selectedAddress={
                                                    selectedAddress
                                                }
                                                onAddressChange={
                                                    changeAddressHandler
                                                }
                                                addressList={items}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                            <div className="mob-hide">
                                {!addressOpen ? (
                                    <button
                                        className="add-address"
                                        onClick={() => setAddressOpen(true)}
                                        aria-label="Add new address"
                                        role="button"
                                    >
                                        <i className="icon-add"></i>Add New
                                        Address
                                    </button>
                                ) : (
                                    <AddressForm
                                        onClose={() => setAddressOpen(false)}
                                        heading={"Add New Address"}
                                    />
                                )}
                            </div>
                        </div>
                        {/* <div className="quick-signup">
              <div className="custom-check">
                <input className="check-custom" type="checkbox" />
                <span className="custom-mark"></span>
              </div>
              <div className="signup-text">
                <div className="heading-text">
                  <h4>Quick Sign Up for order tracking</h4>
                  <Link href="/" className="learn-more">
                    Learn More
                  </Link>
                </div>
                <p>
                  Sign up with carorbis to track your orders, faster checkout &
                  get great deals & offers
                </p>
              </div>
            </div> */}
                    </div>
                    <div className="rtl-address">
                        <div className="rtl-box">
                            <h2>Order Summary</h2>
                            <div className="cart-item">2 items</div>
                            {orderSummary.map((item, index) => {
                                return (
                                    <CartSummary
                                        key={index}
                                        orderProduct={item}
                                    />
                                );
                            })}
                            <ProductPricing priceData={priceData} />
                            <Link
                                href="/checkout-payment"
                                className="order-proceed mob-hide"
                                aria-label="Proceed to pay"
                            >
                                CONFIRM ADDRESS & PAY
                            </Link>
                        </div>
                        <div className="safety-msg">
                            <div className="safe-wrp">
                                <i className="icon-safety"></i>
                                <p>Your transaction is safe with us</p>
                            </div>
                        </div>

                        <div className="desk-hide cart-fixed-wrp">
                            {/* <div className="grand-total">
                                <span className="price">
                                    ₹4397
                                </span>
                                Grand Total
                            </div> */}
                            <Link
                                href="/checkout-payment"
                                className="order-proceed"
                                aria-label="Proceed to pay"
                            >
                                CONFIRM ADDRESS & PAY
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutAddress;
