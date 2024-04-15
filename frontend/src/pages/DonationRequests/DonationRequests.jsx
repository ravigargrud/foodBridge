import classes from "./DonationRequests.module.css";

import FoodBankDetails from "./FoodBankDetails/FoodBankDetails";
import { useState } from "react";

const pendingDonationRequests = [
    { name: "a", quantity: `150kg` },
    { name: "b", quantity: `100kg` },
    { name: "c", quantity: `250kg` },
];
const acceptedDonationRequests = ["a", "b"];

const DonationRequests = () => {
    const [displayIndex, setDisplayIndex] = useState(null);

    function displayInformation(index) {
        setDisplayIndex(displayIndex === index ? null : index);
    }

    return (
        <div className={classes.availableFoodBanks}>
            <h1 onClick={displayInformation}>Pending Donation Requests</h1>
            {pendingDonationRequests.map((bank, index) => {
                return (
                    <div key={index} onClick={() => {displayInformation(index)}} className={classes.cards}>
                        {displayIndex === index && <FoodBankDetails classname={classes.details} foodBankName={'Xyz'} foodRequirement={150} feedingRequirement='50' dailyWastage='130' currentUsage='120' />}
                        <h2>{bank.name}</h2>
                        <h3>{bank.quantity}</h3>
                    </div>
                );
            })}
            <h1>Accepted Donation Requests</h1>
            {acceptedDonationRequests.map((bank, index) => {
                return (
                    <div key={index}>
                        <h2>{bank}</h2>
                    </div>
                );
            })}
        </div>
    );
};

export default DonationRequests;
