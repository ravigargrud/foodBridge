import Time from "../../Time";
import classes from "./AvailableRestaurants.module.css";
import MAP from "../../assets/images/map/map.png";
import { useParams } from "react-router-dom";

import TopNavbar from "../../pages/TopNavbar/TopNavbar.jsx";
import SideNavbar from "../SideNavbar/SideNavbar.jsx";
import RestaurantDetails from "./RestaurantDetails/RestaurantDetails.jsx";

import { useState, useEffect } from "react";
import axios from "axios";

const AvailableRestaurants = () => {
    const [showDetails, setShowDetails] = useState(true);
    const [clickedIndex, setClickedIndex] = useState(null);

    const params = useParams();

    const [data, setData] = useState([]);
    const [foodBankData, setFoodBankData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currUser, setCurrUser] = useState(null);
    const [currUserName, setCurrUserName] = useState(null);
    const [currUserArea, setCurrUserArea] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8000/restaurant/get")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:8000/foodBank/get")
            .then((response) => {
                setFoodBankData(response.data);
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

    // console.log(foodBankData);
    function findUser() {
        console.log(params.profileId);
        const user = foodBankData.find((user) => {
            return user.id == params.profileId;
        });
        if (user) {
            console.log(user);
            setCurrUser(user);
            setCurrUserName(user.bankName);
            setCurrUserArea(user.area);
        } else {
            console.log("User not found");
        }
    }
    useEffect(() => {
        findUser();
    }, [foodBankData, params.profileId]);

    return (
        <div className="availableRestaurants">
            <div className={classes.main}>
                <TopNavbar
                    showNavbar={true}
                    userName={currUserName}
                    location={`Location: ${currUserArea}`}
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
                                            <h1>{restaurant?.restaurantName}</h1>
                                            <p>{`Area: ${restaurant.area}`}</p>
                                            
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
                    <RestaurantDetails closeDetails={showDetailsHandler} />
                )}
            </div>
        </div>
    );
};

export default AvailableRestaurants;
