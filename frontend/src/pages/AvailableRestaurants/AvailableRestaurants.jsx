import Time from "../../Time";
import classes from "./AvailableRestaurants.module.css";
import MAP from "../../assets/images/map/map.png";
// import { useParams } from "react-router-dom";

import TopNavbar from "../../pages/TopNavbar/TopNavbar.jsx";
import SideNavbar from "../SideNavbar/SideNavbar.jsx";
import RestaurantDetails from "./RestaurantDetails/RestaurantDetails.jsx";

import { useState, useEffect } from "react";
import axios from "axios";

const AvailableRestaurants = () => {
    const [showDetails, setShowDetails] = useState(true);
    const [clickedIndex , setClickedIndex] = useState(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/restaurant/get")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    function showDetailsHandler() {
        setShowDetails(!showDetails);
    }
    function handleClick(index) {
        setClickedIndex(index);
    }

    // const params = useParams();
    // console.log(params);

    return (
        <div className="availableRestaurants">
            <div className={classes.main}>
                <TopNavbar
                    showNavbar={true}
                    userName={"Aryan"}
                    location={"121 Negro Arroyo Lane"}
                />
                <SideNavbar showNavbar={true} />
                {showDetails ? (
                    <div className={classes.cardContainer}>
                        <h1>Available Restaurants</h1>
                        <p className={classes.orders}>
                            Orders awaiting request
                        </p>
                        <div className={classes.card}>
                            <Time className={classes.time} />
                            <img src={MAP} alt="map" />
                            {data.map((restaurant, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={classes.details}
                                    >
                                        <div className={classes.left}>
                                            <h1>{restaurant.restaurantName}</h1>
                                            <p>1.2 kms (For 150)</p>
                                        </div>
                                        <div className={classes.right}>
                                            <button
                                                onClick={() => {
                                                    showDetailsHandler();
                                                    handleClick(index);
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <RestaurantDetails closeDetails={showDetailsHandler}/>
                )}
            </div>
        </div>
    );
};

export default AvailableRestaurants;
