import React from 'react';

import ChangePassword from '../ChangePassword/ChangePassword';
import './RightPanel.scss';

const RightPanel = () => {
    return (
        <div className="rgt-account">
            <div className="account-form">
                <h3>Change Password</h3>
                <ChangePassword />
            </div>
        </div>
    );
};

export default RightPanel;
