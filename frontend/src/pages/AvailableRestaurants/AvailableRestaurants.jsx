import Time from "../../Time";
import classes from "./AvailableRestaurants.module.css";
import MAP from '../../assets/images/map/map.png';
import { useParams } from "react-router-dom";

import TopNavbar from "../../pages/TopNavbar/TopNavbar.jsx";
import SideNavbar from "../SideNavbar/SideNavbar.jsx";

const restaurants = [
    { name: "a", wastage: `150kg` },
    { name: "b", wastage: `100kg` },
    { name: "c", wastage: `250kg` },
];

const AvailableRestaurants = () => {
    const params = useParams();
    console.log(params);

    return (
        <div className="availableRestaurants">
            <div className={classes.main}>
                <TopNavbar showNavbar={true} userName={'Aryan'} location={'121 Negro Arroyo Lane'} />
                <SideNavbar showNavbar={true} />
                <div className={classes.cardContainer}>
                    <h1>Available Restaurants</h1>
                    <p className={classes.orders}>Orders awaiting request</p>
                    <div className={classes.card}>
                        <Time className={classes.time} />
                        <img src={MAP} alt="map" />
                        {restaurants.map((restaurant, index) => {
                            return (
                                <div key={index} className={classes.details}>
                                    <div className={classes.left}>
                                        <h1>Yellow Flame Tree</h1>
                                        <p>1.2 kms (For 150)</p>
                                    </div>  
                                    <div className={classes.right}>
                                        <button>View Details</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableRestaurants;
