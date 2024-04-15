/* eslint-disable react/prop-types */
import classes from "./Signup.module.css";

// import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [existingUser, setExistingUser] = useState(false);

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        area: "",
        pincode: "",
        usertype: location.state.userType ? location.state.userType : "",
    });

    function userNameChangeHandler(event) {
        setFormData((prevData) => {
            console.log(event.target.value);
            return { ...prevData, userName: event.target.value };
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

    function handleSubmit(event) {
        event.preventDefault();
        if (location.state.userType === "foodBank") {
            navigate(`/availablerestaurants/user=${formData.userName}`);
            console.log("foodBank");
        } else {
            navigate(`/donationrequests/user=${formData.userName}`);
            console.log(formData.userName);
        }
        //, {replace: true, state: {data: response.data}}
        // axios.post("", { formData }).then((response) => {

        // }).catch((error) => {
        //     console.error(error);
        // });
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
                                id="username"
                                value={formData.userName}
                                onChange={userNameChangeHandler}
                                placeholder="Username"
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
                                id="username"
                                placeholder="Username"
                                onChange={userNameChangeHandler}
                            />
                        </div>

                        {!existingUser ? <div className={classes.formContainer}>
                            <input
                                required
                                type="email"
                                placeholder="Email address"
                                id="email"
                                onChange={emailChangeHandler}
                            />
                        </div> : null}

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

                        {!existingUser ? <div className={classes.formContainer}>
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
                        </div> : null}

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
