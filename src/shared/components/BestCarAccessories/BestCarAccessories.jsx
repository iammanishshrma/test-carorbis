import React from "react";
import "./BestCarAccessories.scss";
const BestCarAccessories = ({ description }) => {
    return (
        <div className="car-accessories">
            <div className="container">
                <h2>Best Car Accessories Online</h2>
                <div dangerouslySetInnerHTML={{ __html: description }} className="car-accessories-content" />
                <h3>Most Searched</h3>

                <ul className="car-wax-list">
                    <li>Car wax</li>
                    <li>Car wax</li>
                    <li>Car wax</li>
                    <li>Car wax</li>
                    <li>Car wax</li>
                    <li>Car wax</li>
                    <li>Car wax</li>
                </ul>
            </div>
        </div>
    );
};

export default BestCarAccessories;
