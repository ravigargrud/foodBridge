/* eslint-disable react/prop-types */
import classes from "./Signup.module.css";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const usertype = location.state.userType ? location.state.userType : "";

    function generateRandomId() {
        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 1000000);

        // Get the current timestamp
        const timestamp = new Date().getTime();

        // Combine the random number and timestamp to create the ID
        const id = `${timestamp}${randomNumber}`;

        return id;
    }
    const id = generateRandomId();

    const [existingUser, setExistingUser] = useState(false);
    const initialFormData =
        usertype === "foodBank"
            ? {
                  id: id,
                  bankName: "",
                  email: "",
                  password: "",
                  pincode: "",
                  area: "",
                  restaurantsAccepted: "",
                  restaurantsPending: "",
              }
            : {
                  id: id,
                  restaurantName: "",
                  email: "",
                  password: "",
                  pincode: "",
                  area: "",
                  foodBankAccepted: "",
                  foodBankPending: "",
                  foodItems: "",
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

    const trial = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/restaurant/get"
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    trial();

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
                                .then((response) => {
                                    navigate(
                                        `/availablerestaurants/user=${formData.bankName}`
                                    );
                                    console.log(response);
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        } else {
                            alert("Restaurant Email already exists");
                        }
                    } else {
                        if (
                            users.find(
                                (user) =>
                                    user.bankName === formData.bankName &&
                                    user.password === formData.password
                            )
                        ) {
                            navigate(
                                `/availablerestaurants/user=${formData.bankName}`
                            );
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
                            .post("http://localhost:8000/restaurant/create", {
                                ...formData,
                            })
                            .then((response) => {
                                navigate(
                                    `/donationrequests/user=${formData.restaurantName}`
                                );
                                console.log(response);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    } else {
                        alert("Email already exists");
                    }
                } else {
                    if (
                        users.find(
                            (user) =>
                                user.restaurantName === formData.restaurantName &&
                                user.password === formData.password
                        )
                    ) {
                        navigate(
                            `/donationrequests/user=${formData.restaurantName}`
                        );
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
                                    <option value="volvo">Delhi</option>
                                    <option value="saab">New Delhi</option>
                                    <option value="mercedes">Old Delhi</option>
                                    <option value="audi">NCR</option>
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
                                    onChange={emailChangeHandler}
                                />
                            </div>
                        ) : null}

                        <div className={classes.formContainer}>
                            <input
                                required
                                type="password"
                                id="password"
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
                                    <option value="volvo">Delhi</option>
                                    <option value="saab">New Delhi</option>
                                    <option value="mercedes">Old Delhi</option>
                                    <option value="audi">NCR</option>
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
