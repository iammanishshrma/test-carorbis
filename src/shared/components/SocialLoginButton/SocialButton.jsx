import React from "react";

import SocialLogin from "react-social-login";

const SocialButton = (props) => {
    const { triggerLogin, iconClass } = props;
    return (
        <>
            <button onClick={triggerLogin} {...props} aria-label="Login" role="button">
                <i className={iconClass} />
            </button>
        </>
    );
};

export default SocialLogin(SocialButton);
