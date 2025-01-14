import classes from "./DonationRequests.module.css";

import { useEffect, useState } from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import SideNavbar from "../SideNavbar/SideNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";

import { FaCirclePlus } from "react-icons/fa6";
import Time from "../../Time";

import { MdOutlineClose } from "react-icons/md";

const pendingDonationRequests = [
  { name: "a", quantity: `150kg`, distance: `1.2 kms` },
  { name: "b", quantity: `100kg`, distance: `1.5 kms` },
  { name: "c", quantity: `250kg`, distance: `2.0 kms` },
];

const donationHistory = [
  // Example donation data can go here
];

const restaurant = {
  wastage: 1000,
  donation: 500,
};

const DonationRequests = () => {
  const [displayIndex, setDisplayIndex] = useState(null);
  const [newDonation, setNewDonation] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [foodBankData, setFoodBankData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currUser, setCurrUser] = useState(null);

  const params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8000/restaurant/get")
      .then((response) => {
        setRestaurantData(response.data);
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

  function findUser() {
    const user = restaurantData.find((user) => {
      return user.id == params.profileId;
    });
    if (user) {
      setCurrUser(user);
    } else {
      console.log("User not found");
    }
  }
  useEffect(() => {
    findUser();
  }, [foodBankData, params.profileId]);

  function displayInformation(index) {
    setDisplayIndex(displayIndex === index ? null : index);
  }

  function makeNewDonation() {
    setNewDonation(!newDonation);
  }

  const handleFoodCreate = async (event) => {
    event.preventDefault();

    // Collect form data from inputs
    const formattedDate = new Date(event.target.expiryDate.value)
      .toISOString()
      .split("T")[0]; // Ensure proper date format

    const data = {
      itemName: event.target.itemName.value,
      quantity: parseInt(event.target.quantity.value), // Ensure quantity is an integer
      expiryDate: formattedDate, // Send date in YYYY-MM-DD format
      price: parseFloat(event.target.price.value), // Ensure price is a float
      restaurantId: currUser?.id, // Assuming currUser is available
      restaurant: currUser?.restaurantName, // Assuming currUser is available
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/foodItem/create",
        data,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the request body is JSON
          },
        }
      );
      console.log("Food item created:", response.data);
    } catch (error) {
      console.error(
        "Unable to create listing:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className={classes.availableRestaurants}>
      <div className={classes.topFiller}></div>
      <div className={classes.sideFiller}></div>

      {newDonation && (
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
            <form onSubmit={handleFoodCreate}>
              <input
                type="text"
                placeholder="Item Name"
                name="itemName"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                min="1"
                required
              />
              <input
                type="date"
                placeholder="Expiry Date"
                name="expiryDate"
                required
              />
              <input
                type="number"
                placeholder="Price"
                name="price"
                step="0.01"
                min="0"
                required
              />
              <div className={classes.wastage}>
                <p>{`Your daily wastage = ${restaurant.wastage}kg`}</p>
                <p>{`Today's Donations = ${restaurant.donation}kg`}</p>
                <p>{`Remaining = ${
                  restaurant.wastage - restaurant.donation
                }kg`}</p>
              </div>
              <button type="submit">SUBMIT LIST</button>
            </form>
          </div>
        </div>
      )}

      {!newDonation && (
        <div className={classes.main}>
          <TopNavbar
            showNavbar={true}
            userName={"Username"}
            location={`Location: ${currUser?.restaurantName}`}
          />
          <SideNavbar showNavbar={true} />
          <div className={classes.cards}>
            <div className={classes.card}>
              <div className={classes.newDonation} onClick={makeNewDonation}>
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
                {foodBankData.map((request, index) => (
                  <div key={index}>
                    <div className={classes.container}>
                      <div className={classes.containerDiv}>
                        <h1>{request.bankName}</h1>
                        <p>{`${request.area} (Quantity: ${Math.floor(
                          Math.random() * 150 + 1
                        )})`}</p>
                      </div>
                      <button>ASSIGN TO ME</button>
                    </div>
                  </div>
                ))}
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
                {donationHistory.map((request, index) => (
                  <div key={index}>
                    <div
                      className={classes.container}
                      onClick={() => displayInformation(index)}
                    >
                      <div className={classes.containerDiv}>
                        <h1>{`List: #${request.listing}`}</h1>
                        <p>{`Quantity: ${request.quantity}kg`}</p>
                        <p>{`People Served: ${request.people}`}</p>
                        <p>{`Location: ${request.location}`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
