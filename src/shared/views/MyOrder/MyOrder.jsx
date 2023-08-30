import React, { useEffect, useState } from "react";
import BreadCrumbSection from "@/shared/components/BreadCrumb/BreadCrumb";
import ProductImg1 from "@/shared/assets/images/slider-img5.png";
import ProductImg2 from "@/shared/assets/images/product-5.png";
import LeftAccountPanel from "@/shared/components/LeftAccountPanel/LeftAccountPanel";
import MyOrderList from "@/shared/components/MyOrderList/MyOrderList";
import Pagination from "@/shared/components/Pagination/Pagination";
import "../MyProfile/MyProfile.scss";
import "./MyOrder.scss";

const MyOrder = () => {
    const [firstPage, GetfirstPage] = useState(0);
    const [EndPage, GetEndPage] = useState(2);
    const OnPageChange = (data) => {
        useEffect(() => {
            GetfirstPage(data.customFirst3);
            GetEndPage(data.GetLastItems);
        }, [data]);
    };
    const breadcrumbData = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "All Product",
            link: "/product-listing",
        },
        {
            name: "Orders & Returns",
            link: "/my-order",
        },
    ];
    const orderData = [
        {
            orderDate: "24 August, 2022",
            orderId: "BK9860109060",
            orderStatus: "Intransit",
            orderTotal: "2898",
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
                },
            ],
        },
        {
            orderDate: "24 August, 2022",
            orderId: "BK9860109060",
            orderStatus: "Shipped",
            orderTotal: "2898",
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
                },
            ],
        },
        {
            orderDate: "24 August, 2022",
            orderId: "BK9860109060",
            orderStatus: "Delivered",
            orderTotal: "2898",
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
                },
            ],
        },
        {
            orderDate: "24 August, 2022",
            orderId: "BK9860109060",
            orderStatus: "Delivered",
            orderTotal: "2898",
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
                },
            ],
        },
        {
            orderDate: "24 August, 2022",
            orderId: "BK9860109060",
            orderStatus: "Completed",
            orderTotal: "2898",
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
                },
            ],
        },
        {
            orderDate: "24 August, 2022",
            orderId: "BK9860109060",
            orderStatus: "Cancelled",
            orderTotal: "2898",
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
                },
            ],
        },
        {
            orderDate: "24 August, 2022",
            orderId: "BK9860109060",
            orderStatus: "Returned",
            orderTotal: "2898",
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
                },
            ],
        },
    ];
    return (
        <div className="my-account">
            <div className="container">
                <BreadCrumbSection breadcrumbData={breadcrumbData} />
                <div className="account-details">
                    <LeftAccountPanel />
                    <div className="rgt-account">
                        <div className="order-return">
                            <div className="return-header">
                                <h3>Orders & Returns</h3>
                                <div className="rgt-box">
                                    <div className="search-box">
                                        <input
                                            type="text"
                                            placeholder="Search All Order"
                                            className="form-control"
                                        />
                                    </div>
                                    <button className="search-order">
                                        Search order
                                    </button>
                                </div>
                            </div>
                            {orderData
                                .slice(firstPage, EndPage)
                                .map((item, index) => {
                                    return (
                                        <MyOrderList
                                            orderData={item}
                                            key={index}
                                        />
                                    );
                                })}
                            {/* <div className="pagination-wrap">
                                <Pagination
                                    totalRecords={orderData.length}
                                    OnPageChange={OnPageChange}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;
