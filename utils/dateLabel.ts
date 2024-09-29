import { DateTime } from "luxon";

function dateLabel(date: string) {
    const eventdate = DateTime.fromISO(date) // .toFormat('yyyy LLL dd'); //=> '2024 Aug 14';
    const today = DateTime.now();
    const datediff = (eventdate.diff(today, ["years", "months", "days", "hours"])).days;
    // date difference in days!
    if (datediff < 3 && datediff > 0) {
        // within 2 days
        switch (datediff) {
            case 1: return (`Tomorrow`);
            case 2: return (`2 more days`);
            default: return ('today');
        }
    }
    const shortDayName = eventdate.weekdayShort; // show week day
    return (`${ eventdate.toFormat('LLL dd') }, ${ shortDayName }`);
}

export default dateLabel;