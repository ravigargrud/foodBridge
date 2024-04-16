/* eslint-disable react/prop-types */
import classes from "./Signup.module.css";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const usertype = location.state.userType ? location.state.userType : "";

    function generateRandomId() {
        const randomNumber = Math.floor(Math.random() * 10000);
        return randomNumber;
    }
    const genId = generateRandomId();

    const [existingUser, setExistingUser] = useState(false);

    const [currUser, setCurrUser] = useState(null);

    const initialFormData =
        usertype === "foodBank"
            ? {
                  id: genId,
                  bankName: "",
                  email: "",
                  password: "",
                  area: "",
                  restaurantsAccepted: "place",
                  restaurantsPending: "place",
              }
            : {
                  password: "",
                  id: genId,
                  area: "",
                  predictedWaste: 0,
                  foodBankPending: "place",
                  restaurantName: "",
                  email: "",
                  pincode: "",
                  foodBankAccepted: "place",
                  foodItems: "place",
              };

    const [formData, setFormData] = useState(initialFormData);

    function bankNameChangeHandler(event) {
        setFormData((prevData) => {
            return { ...prevData, bankName: event.target.value };
        });
    }
    function restaurantNameChangeHandler(event) {
        setFormData((prevData) => {
            return { ...prevData, restaurantName: event.target.value };
        });
    }
    function emailChangeHandler(event) {
        setFormData((prevData) => {
            return { ...prevData, email: event.target.value };
        });
    }
    function passwordChangeHandler(event) {
        setFormData((prevData) => {
            return { ...prevData, password: event.target.value };
        });
    }
    function pinCodeChangeHandler(event) {
        setFormData((prevData) => {
            return { ...prevData, pincode: event.target.value };
        });
    }
    function areaChangeHandler(event) {
        setFormData((prevData) => {
            return { ...prevData, area: event.target.value };
        });
    }

    function trialFunc1() {
        axios
            .get("http://localhost:8000/restaurant/get")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    function trialFunc2() {
        axios
            .get("http://localhost:8000/foodBank/get")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        // Call trialFunc1() or trialFunc2() based on the userType when the component mounts
        if (usertype === "foodBank") {
            trialFunc2();
            trialFunc1();
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        if (location.state.userType === "foodBank") {
            axios
                .get("http://localhost:8000/foodBank/get")
                .then((response) => {
                    const users = response.data;
                    if (existingUser === false) {
                        if (
                            !users.find((user) => user.email === formData.email)
                        ) {
                             axios
                                .post("http://localhost:8000/foodBank/create", {
                                    ...formData,
                                })
                                .then(() => {
                                    navigate(
                                        `/availablerestaurants/${formData.id}`
                                    );
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        } else {
                            alert("Email already exists");
                        }
                    } else {
                        setCurrUser(users.find((user) => {
                            return (user.password === formData.password && user.bankName === formData.bankName) ? user : null;
                        }));
                        if (currUser && currUser !== null) {
                            navigate(`/availablerestaurants/${currUser.id}`);
                        } else {
                            alert("Bankname or password is incorrect");
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios
                .get("http://localhost:8000/restaurant/get")
                .then((response) => {
                    const users = response.data;

                    if (existingUser === false) {
                        if (
                            !users.find((user) => user.email === formData.email)
                        ) {
                            axios
                                .post(
                                    "http://localhost:8000/restaurant/create",
                                    { ...formData }
                                )
                                .then(() => {
                                    navigate(
                                        `/donationrequests/${formData.id}`
                                    );
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        } else {
                            alert("Email already exists");
                        }
                    } else {
                        setCurrUser(users.find((user) => {
                            return(user.password === formData.password && user.restaurantName === formData.restaurantName) ? user : null;
                        }));
                        if (currUser && currUser !== null) {
                            navigate(`/donationrequests/${currUser.id}`);
                        } else {
                            alert("Bankname or password is incorrect");
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <div className={classes.signup}>
            <div className={classes.filler}></div>
            <div className={classes.signupContainer}>
                <h1>
                    {existingUser ? "Sign In" : "Sign Up"} for{" "}
                    {location.state.userType === "foodBank"
                        ? "Food Bank"
                        : "Restaurant"}
                </h1>
                <p>
                    {!existingUser
                        ? "Create an account using an email and a password."
                        : "Login using email and password."}
                </p>
                {location.state.userType === "foodBank" ? (
                    <form
                        onSubmit={handleSubmit}
                        className={classes.signupForm}
                    >
                        <div className={classes.formContainer}>
                            <input
                                required
                                type="text"
                                id="bankname"
                                value={formData.bankName}
                                onChange={bankNameChangeHandler}
                                placeholder="Bankname"
                            />
                        </div>

                        {!existingUser ? (
                            <div className={classes.formContainer}>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={emailChangeHandler}
                                    placeholder="Email address"
                                />
                            </div>
                        ) : null}

                        <div className={classes.formContainer}>
                            <input
                                required
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={passwordChangeHandler}
                            />
                        </div>

                        {!existingUser ? (
                            <div>
                                <input
                                    required
                                    type="text"
                                    id="pincode"
                                    placeholder="Pincode"
                                    value={formData.pincode}
                                    onChange={pinCodeChangeHandler}
                                />
                            </div>
                        ) : null}

                        {!existingUser ? (
                            <div className={classes.formContainer}>
                                <select
                                    required
                                    name="area"
                                    id="area"
                                    value={formData.area}
                                    onChange={areaChangeHandler}
                                >
                                    <option value="" disabled selected hidden>
                                        Please Choose...
                                    </option>
                                    <option value="Red Fort">Red Fort</option>
                                    <option value="Vaishali">Vaishali</option>
                                    <option value="Panipath">Panipath</option>
                                    <option value="Jasola">Jasola</option>
                                    <option value="Karkardooma">
                                        Karkardooma
                                    </option>
                                    <option value="Khan Market">
                                        Khan Market
                                    </option>
                                    <option value="Delhi Haat">
                                        Delhi Haat
                                    </option>
                                    <option value="Lajpat Nagar">
                                        Lajpat Nagar
                                    </option>
                                    <option value="Kashmere Gate">
                                        Kashmere Gate
                                    </option>
                                </select>
                            </div>
                        ) : null}

                        <div className={classes.existingUser}>
                            <label htmlFor="vehicle1">Existing User</label>
                            <input
                                type="checkbox"
                                id="vehicle1"
                                name="vehicle1"
                                value="Bike"
                                onChange={() => setExistingUser(!existingUser)}
                            />
                        </div>

                        <button type="submit">Register</button>
                    </form>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className={classes.signupForm}
                    >
                        <div className={classes.formContainer}>
                            <input
                                required
                                type="text"
                                id="bankname"
                                value={formData.restaurantName}
                                placeholder="Restaurant Name"
                                onChange={restaurantNameChangeHandler}
                            />
                        </div>

                        {!existingUser ? (
                            <div className={classes.formContainer}>
                                <input
                                    required
                                    type="email"
                                    placeholder="Email address"
                                    id="email"
                                    value={formData.email}
                                    onChange={emailChangeHandler}
                                />
                            </div>
                        ) : null}

                        <div className={classes.formContainer}>
                            <input
                                required
                                type="password"
                                id="password"
                                value={formData.password}
                                placeholder="Password"
                                onChange={passwordChangeHandler}
                            />
                        </div>

                        {!existingUser ? (
                            <div>
                                <input
                                    required
                                    type="text"
                                    id="pincode"
                                    placeholder="Pincode"
                                    value={formData.pincode}
                                    onChange={pinCodeChangeHandler}
                                />
                            </div>
                        ) : null}

                        {!existingUser ? (
                            <div className={classes.formContainer}>
                                <select
                                    required
                                    name="area"
                                    id="area"
                                    value={formData.area}
                                    onChange={areaChangeHandler}
                                >
                                    <option value="" disabled selected hidden>
                                        Please Choose...
                                    </option>
                                    <option value="Red Fort">Red Fort</option>
                                    <option value="Vaishali">Vaishali</option>
                                    <option value="Panipath">Panipath</option>
                                    <option value="Jasola">Jasola</option>
                                    <option value="Karkardooma">
                                        Karkardooma
                                    </option>
                                    <option value="Khan Market">
                                        Khan Market
                                    </option>
                                    <option value="Delhi Haat">
                                        Delhi Haat
                                    </option>
                                    <option value="Lajpat Nagar">
                                        Lajpat Nagar
                                    </option>
                                    <option value="Kashmere Gate">
                                        Kashmere Gate
                                    </option>
                                </select>
                            </div>
                        ) : null}

                        <div className={classes.existingUser}>
                            <label htmlFor="vehicle1">Existing User</label>
                            <input
                                type="checkbox"
                                id="vehicle1"
                                name="vehicle1"
                                value="Bike"
                                onChange={() => setExistingUser(!existingUser)}
                            />
                        </div>

                        <button type="submit">Register</button>
                    </form>
                )}
                <Link to="/" className={classes.link}>
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default Signup;
