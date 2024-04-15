import classes from "./RestaurantDetails.module.css";

import RESTAURANT_IMG from "../../../assets/images/restaurant/restaurant.png";

const restaurantDetails = {
    name: "Restaurant Name",
    distance: "0.5 km",
    listing: "12:00 PM",
    pickUpBy: "12:30 PM",
    canBeUsedToFeed: "150 people",
    listingNumber: "#123",
    availableFood: "Dal, Roti, Sabji",
    weight: "5 kg",
};

import { GiMeal, GiWeightScale, GiKnifeFork } from "react-icons/gi";
import { MdCo2 } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

const RestaurantDetails = ({ closeDetails, RestaurantDetails }) => {
    return (
        <div className={classes.details}>
            <div className={classes.card}>
                <div className={classes.top}>
                    <div className={classes.heading}>
                        <h1>{restaurantDetails.name}</h1>
                        <p>{restaurantDetails.distance}</p>
                        <div className={classes.listedOn}>
                            <p>Listed on:</p>
                            <p>{restaurantDetails.listing}</p>
                        </div>
                        <div className={classes.listedOn}>
                            <p>Pick up by:</p>
                            <p>{restaurantDetails.pickUpBy}</p>
                        </div>
                    </div>
                    <div className={classes.topButtons}>
                        <MdOutlineClose
                            fill="#05A60B"
                            size={30}
                            onClick={closeDetails}
                            className={classes.closeIcon}
                        />
                        <button>ASSIGN VOLUNTEER</button>
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.left}>
                        <h2>List {restaurantDetails.listingNumber}</h2>
                        <p>{restaurantDetails.availableFood}</p>
                        <img src={RESTAURANT_IMG} alt="restaurant photo" />
                    </div>
                    <div className={classes.right}>
                        <ul>
                            <li>
                                <GiMeal size={50} fill="black" />
                                <p>Cooked</p>
                            </li>
                            <li>
                                <GiWeightScale size={50} fill="black" />
                                <p>{restaurantDetails.weight}</p>
                            </li>
                            <li>
                                <GiKnifeFork size={50} fill="black" />
                                <p>{restaurantDetails.canBeUsedToFeed}</p>
                            </li>
                            <li>
                                <MdCo2 size={50} fill="black" />
                                <p>
                                    {restaurantDetails.co2emissionPrevented}{" "}
                                    emissions prevented
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={classes.request}>
                    <button>Request</button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
