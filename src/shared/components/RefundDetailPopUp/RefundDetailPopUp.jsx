import React from 'react'
import '../CancelPopup/CancelPopup.scss'
import './RefundDetailPopUp.scss'
const RefundDetailPopUp = ({ close, refundData }) => {
    const closePopUp = () => {
        close(false);
        document.body.classList.toggle("modal-open");
    }
    return (
        <div className='popup-wrapper'>
            <div className='popup-content'>
                <div className="cancel-head">
                    <h3>Refund Details</h3>
                    <button onClick={closePopUp} className="close-btn" aria-label="Close" role="button"><i className='cancel-icon'></i></button>
                </div>
                <div className="refund-body">
                    <div className='amount'>
                        <h3>Total Refundable Amount</h3>
                        <span className='refund-amount'>&#8377;1449.00</span>
                    </div>
                    <div className='card-box'>
                        <span className='refund-amount'>&#8377;1449.00</span>
                        <p>Added to HDFC Card Ending in xxxx 0000 Credited on 03 Sep, 2022 </p>
                        <i className='icon-card'></i>
                    </div>
                    <div className='caution-wrap'>
                        <i className='icon-caution'></i>
                        <p>Contact Your bank with reference number 012045465456</p>
                    </div>
                    <button className='refund-btn' aria-label="okay" role="button">OK</button>
                </div>
            </div>
        </div>
    )
}

export default RefundDetailPopUp