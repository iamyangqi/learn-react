import * as React from "react";
import * as moment from "moment";

function useDate() {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const [currentTime, setCurrentTime] = React.useState(moment().format(dateFormat));

    React.useEffect(() => {
        const timeCount = () => {
            const timer = setTimeout(() => {
                setCurrentTime(moment().format(dateFormat));
                clearTimeout(timer);
                timeCount();
            }, 1000);
        }
        timeCount();
    }, []);

    return currentTime;
}

export default useDate;
