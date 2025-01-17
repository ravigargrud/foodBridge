import Time from "../../Time";
import classes from "./AvailableRestaurants.module.css";
import styles from "./AvailableRestaurants2.module.css";
import MAP from "../../assets/images/map/map.png";
import { useParams } from "react-router-dom";

import TopNavbar from "../../pages/TopNavbar/TopNavbar.jsx";
import SideNavbar from "../SideNavbar/SideNavbar.jsx";
import RestaurantDetails from "./RestaurantDetails/RestaurantDetails.jsx";
import AccountDetails from "./AccountDetails/AccountDetails.jsx";

import { useState, useEffect } from "react";
import axios from "axios";

const donationHistory = [
  {
    id: 1,
    itemName: "Pizza",
    restaurant: "Tasty Bites",
    quantity: 5,
    price: 100,
    expiryDate: "2023-06-30",
  },
  {
    id: 2,
    itemName: "Salad",
    restaurant: "Spice Garden",
    quantity: 3,
    price: 50,
    expiryDate: "2023-06-29",
  },
  {
    id: 3,
    itemName: "Pasta",
    restaurant: "Fresh Feast",
    quantity: 4,
    price: 80,
    expiryDate: "2023-07-01",
  },
];

const AvailableRestaurants = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [clickedIndex, setClickedIndex] = useState(null);

  const params = useParams();

  const [data, setData] = useState([]);
  const [foodBankData, setFoodBankData] = useState([]);
  const [foodItemsData, setFoodItemsData] = useState([]); // New state for available food items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currUser, setCurrUser] = useState(null);
  const [currUserName, setCurrUserName] = useState(null);
  const [currUserArea, setCurrUserArea] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isAccountOpen, setIsAccountOpen] = useState(false); // State to control account modal visibility

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

  useEffect(() => {
    axios
      .get("http://localhost:8000/foodItem/get") // Assuming this endpoint returns available food items
      .then((response) => {
        setFoodItemsData(response.data); // Populate available food items
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  function showDetailsHandler() {
    setShowDetails(!showDetails);
  }

  function handleClick(index) {
    setClickedIndex(index);
  }

  function findUser() {
    const user = foodBankData.find((user) => user.id == params.profileId);
    if (user) {
      setCurrUser(user);
      setCurrUserName(user.bankName);
      setCurrUserArea(user.area);
    }
  }

  useEffect(() => {
    findUser();
  }, [foodBankData, params.profileId]);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to open the account modal
  const openAccount = () => {
    setIsAccountOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to close the account modal
  const closeAccount = () => {
    setIsAccountOpen(false);
  };

  return (
    <div className="availableRestaurants">
      <div className={classes.main}>
        <TopNavbar
          showNavbar={true}
          userName={currUserName}
          location={`Location: ${currUserArea}`}
        />
        <SideNavbar showNavbar={true} setIsAccountOpen={setIsAccountOpen}/>

        <div className={classes.cardContainer}>
          <h1>Available Restaurants</h1>
          <p className={classes.orders}>Orders awaiting request</p>
          <div className={classes.card}>
            <Time className={classes.time} />
            <img src={MAP} alt="map" />
            {data.map((restaurant, index) => {
              return (
                <div key={index} className={classes.details}>
                  <div className={classes.left}>
                    <h1>{restaurant?.restaurantName}</h1>
                    <p>{`Area: ${restaurant.area}`}</p>
                  </div>
                  <div className={classes.right}>
                    <button
                      onClick={() => {
                        showDetailsHandler();
                        handleClick(index);
                        openModal(); // Open the modal on click
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

        <div className={classes.cardContainer2}>
          <div className={styles.cardBottom}>
            {Array.isArray(foodItemsData) && foodItemsData.length > 0 ? (
              foodItemsData.map((request, index) => (
                <div key={index}>
                  <div
                    className={styles.container}
                    onClick={() => displayInformation(index)}
                  >
                    <div className={styles.containerDiv}>
                      <h1>{`Donation: #${request.id}`}</h1>
                      <p>{`Name: ${request.itemName}`}</p>
                      <p>{`Quantity: ${request.quantity} kg`}</p>
                      <p>{`Price: ₹${request.price}`}</p>
                      <p>{`Expiry Date: ${request.expiryDate}`}</p>
                      <p>{`Restaurant Name: ${request.restaurant}`}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No donation history available.</p>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className={classes.modal}>
            <div className={classes.modalContent}>
              {/* <RestaurantDetails closeDetails={closeModal} restaurant={data.filter(() -> {})}/> */}
                <RestaurantDetails
                closeDetails={closeModal}
                restaurant={data[clickedIndex]}
                />
              <button onClick={closeModal} className={classes.closeButton}>
                Close Modal
              </button>
            </div>
          </div>
        )}

        {isAccountOpen && (
          <div className={classes.modal}>
            <div className={classes.modalContent}>
              <AccountDetails closeDetails={closeAccount} user={currUser} setUser={setCurrUser}/>
              <button onClick={closeAccount} className={classes.closeButton}>
                Close Modal
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AvailableRestaurants;
