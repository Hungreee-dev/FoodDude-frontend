import React from 'react';
import './style.css';
const index = () => {
    return (
        <div className="popup">
            <i
                className="fa fa-check-circle-o icon_otp"
                style={{ color: 'lawngreen!important' }}
                aria-hidden="true"
            ></i>
            <p className="OTP_msg user_select_disable">Your OTP was sent!</p>
        </div>
    );
};

export default index;
