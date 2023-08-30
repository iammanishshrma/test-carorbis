import React, { useEffect, useState } from "react";

const Timer = () => {
    const [Timer, setTimer] = useState(5);

    useEffect(() => {
        const Timer = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => {
            clearInterval(Timer);
        };
    }, [Timer]);
    return (
        <div className="otp-wait">
            Please wait for {Timer} sec to resend Otp
        </div>
    );
};

export default Timer;
