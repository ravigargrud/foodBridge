import classes from "./DonationRequests.module.css";

import { useState } from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import SideNavbar from "../SideNavbar/SideNavbar";

import { FaCirclePlus } from "react-icons/fa6";
import Time from "../../Time";

import { MdOutlineClose } from "react-icons/md";

const pendingDonationRequests = [
    { name: "a", quantity: `150kg`, distance: `1.2 kms` },
    { name: "b", quantity: `100kg`, distance: `1.5 kms` },
    { name: "c", quantity: `250kg`, distance: `2.0 kms` },
];
const donationHistory = [
    {listing: 123, quantity: 321, people: 132,location:'placeholder location'},
    {listing: 45, quantity: 150, people: 32,location:'placeholder location'},
    {listing: 63, quantity: 12, people: 23,location:'placeholder location'},
    {listing: 1231, quantity: 5, people: 23,location:'placeholder location'},
    {listing: 63, quantity: 123, people: 123,location:'placeholder location'},
    {listing: 213, quantity: 65, people: 232,location:'placeholder location'},
];

const restaurant = {
    wastage: 1000,
    donation: 500,
};

const DonationRequests = () => {
    const [displayIndex, setDisplayIndex] = useState(null);
    const [newDonation, setNewDonation] = useState(false);

    function displayInformation(index) {
        setDisplayIndex(displayIndex === index ? null : index);
    }

    function makeNewDonation() {
        setNewDonation(!newDonation);
    }

    return (
        <div className={classes.availableRestaurants}>
            <div className={classes.topFiller}></div>
            <div className={classes.sideFiller}></div>
            {newDonation ? (
                <div className={classes.newDonation2}>
                    <div className={classes.newDonationDiv}>
                        <div className={classes.closeIcon}>
                            <MdOutlineClose
                                fill="#05A60B"
                                onClick={makeNewDonation}
                                className={classes.closeIconImg}
                                size={30}
                            />
                        </div>
                        <form action="">
                            <input type="text" placeholder="Search for items" />
                            <div className={classes.donationType}>
                                <label htmlFor="cooked">
                                    Cooked
                                    <input
                                        id="cooked"
                                        type="radio"
                                        name="donationType"
                                        value="cooked"
                                    />
                                </label>
                                <label htmlFor="pcooked">
                                    Partially Cooked
                                    <input
                                        id="pcooked"
                                        type="radio"
                                        name="donationType"
                                        value="pcooked"
                                    />
                                </label>
                                <label htmlFor="uncooked">
                                    Uncooked
                                    <input
                                        id="uncooked"
                                        type="radio"
                                        name="donationType"
                                        value="uncooked"
                                    />
                                </label>
                                <label htmlFor="packaged">
                                    Packaged
                                    <input
                                        id="packaged"
                                        name="donationType"
                                        type="radio"
                                        value="packaged"
                                    />
                                </label>
                            </div>
                            <input
                                type="text"
                                placeholder="Number of servings"
                            />
                            <div className={classes.wastage}>
                                <p>{`Your daily wastage = ${restaurant.wastage}`}</p>
                                <p>{`Today's Donations = ${restaurant.donation}`}</p>
                                <p>{`Remaining = ${
                                    restaurant.wastage - restaurant.donation
                                }`}</p>
                            </div>
                            <button>SUBMIT LIST</button>
                        </form>
                    </div>
                </div>
            ) : null}
            {!newDonation ? (
                <div className={classes.main}>
                    <TopNavbar
                        showNavbar={true}
                        userName={"Aryan"}
                        location={"121 Negro Arroyo Lane"}
                    />
                    <SideNavbar showNavbar={true} />
                    <div className={classes.cards}>
                        <div className={classes.card}>
                            <div
                                className={classes.newDonation}
                                onClick={makeNewDonation}
                            >
                                <FaCirclePlus size={30} fill="#099A4F" />
                                <p>Make a new donation</p>
                            </div>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.cardTop}>
                                <h1>FOODBANK REQUESTS</h1>
                                <p>Requests near you (within 7 km)</p>
                            </div>
                            <div className={classes.cardBottom}>
                                <Time className={classes.time} />
                                {pendingDonationRequests.map(
                                    (request, index) => {
                                        return (
                                            <div key={index}>
                                                <div
                                                    className={
                                                        classes.container
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes.containerDiv
                                                        }
                                                    >
                                                        <h1>{request.name}</h1>
                                                        <p>{`${request.distance} (Quantity: ${request.quantity})`}</p>
                                                    </div>
                                                    <button>
                                                        ASSIGN TO ME
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                        <div className={classes.card}>
                            <div className={classes.cardTop}>
                                <h1>DONATION HISTORY</h1>
                                <p>
                                    <Time />
                                </p>
                            </div>
                            <div className={classes.cardBottom}>
                                {donationHistory.map((request, index) => {
                                    return (
                                        <div key={index}>
                                            <div
                                                className={classes.container}
                                                onClick={() =>
                                                    displayInformation(index)
                                                }
                                            >
                                                <div
                                                    className={classes.containerDiv}
                                                >
                                                    <h1>{`List: #${request.listing}`}</h1>
                                                    <p>{`Quantity: ${request.quantity}kg`}</p>
                                                    <p>{`People Served: ${request.people}`}</p>
                                                    <p>{` Location: ${request.location}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default DonationRequests;
