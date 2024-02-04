import React, { useEffect, useState } from "react";

export default function FlashMessage(props) {
    const { displayTime, message } = props;
    const [msgDisplayed, setMsgDisplayed] = useState(true);
    const [secondsRemaining, setSecondsRemaining] = useState(
        displayTime / 1000
    );

    useEffect(() => {
        if (secondsRemaining > 0) {
            const timer = setInterval(() => {
                setSecondsRemaining((seconds) => seconds - 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        } else {
            setMsgDisplayed(false);
        }
    }, [secondsRemaining]);

    return (
        msgDisplayed && (
            <div className="flash-message">
                {message.replace("${s}", secondsRemaining)}
            </div>
        )
    );
}
