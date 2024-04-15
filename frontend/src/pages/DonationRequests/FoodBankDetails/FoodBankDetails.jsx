import classes from './FoodBankDetails.module.css'

const FoodBankDetails = ({ foodBankName, foodRequirement, feedingRequirement, dailyWastage, currentUsage }) => {
    return (
        <div className={classes.details}>
            <div className="top">
                <h1>{foodBankName}</h1>
                <p>Food requirement: {foodRequirement}</p>
                <p>Used to feed: {feedingRequirement}</p>
            </div>
            <div className="bottom">
                <p>Your daily wastage: {dailyWastage} kg</p>
                <p>Current Usage: {currentUsage} kg</p>
            </div>
            <p>Remaining: {dailyWastage-currentUsage} kg</p>
            <div>
                <button>Accept</button>
                <button>Deny</button>
            </div>
        </div>
    );
};

export default FoodBankDetails;
