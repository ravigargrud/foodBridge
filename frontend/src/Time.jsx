const currDate = new Date().toLocaleDateString();
let currTime = new Date();

let currDay = currTime.getDay();
let hour = currTime.getHours();
let minute = currTime.getMinutes();

if (currDay === 1) {
    currDay = "Monday";
} else if (currDay === 2) {
    currDay = "Tuesday";
} else if (currDay === 3) {
    currDay = "Wednesday";
} else if (currDay === 4) {
    currDay = "Thursday";
} else if (currDay === 5) {
    currDay = "Friday";
} else if (currDay === 6) {
    currDay = "Saturday";
} else if (currDay === 7) {
    currDay = "Sunday";
}

currTime = `${hour}:${minute}h`;

const Time = () => {
    return (
        <p>
            {currDay}, {currDate} {currTime}
        </p>
    );
};

export default Time;
