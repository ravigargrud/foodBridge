/* eslint-disable react/prop-types */
import classes from "./Signup.module.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userType = location.state?.userType || "";

    const [existingUser, setExistingUser] = useState(false);

    const generateRandomId = () => Math.floor(Math.random() * 10000);
    const initialFormData =
        userType === "foodBank"
            ? {
                  id: generateRandomId(),
                  bankName: "",
                  email: "",
                  password: "",
                  area: "",
                  restaurantsAccepted: "place",
                  restaurantsPending: "place",
              }
            : {
                  id: generateRandomId(),
                  password: "",
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (userType === "foodBank") {
                    await axios.get("http://localhost:8000/foodBank/get");
                }
                await axios.get("http://localhost:8000/restaurant/get");
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [userType]);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleAreaChange = (value) => {
        setFormData((prevData) => ({ ...prevData, area: value.label }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = `http://localhost:8000/${userType}/get`;

        try {
            const { data: users } = await axios.get(endpoint);

            if (existingUser) {
                const currentUser = users.find(
                    (user) =>
                        user.password === formData.password &&
                        user[(userType === "foodBank" ? "bankName" : "restaurantName")] === formData[(userType === "foodBank" ? "bankName" : "restaurantName")]
                );
                if (currentUser) {
                    navigate(
                        `/${
                            userType === "foodBank"
                                ? "availablerestaurants"
                                : "donationrequests"
                        }/${currentUser.id}`
                    );
                } else {
                    alert("Incorrect credentials");
                }
            } else {
                const emailExists = users.some(
                    (user) => user.email === formData.email
                );
                if (!emailExists) {
                    await axios.post(
                        `http://localhost:8000/${userType}/create`,
                        formData
                    );
                    navigate(
                        `/${
                            userType === "foodBank"
                                ? "availablerestaurants"
                                : "donationrequests"
                        }/${formData.id}`
                    );
                } else {
                    alert("Email already exists");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formFields = userType === "foodBank"
        ? [
              { id: "bankName", type: "text", placeholder: "Bank Name" },
              !existingUser && { id: "email", type: "email", placeholder: "Email Address" },
              { id: "password", type: "password", placeholder: "Password" },
              !existingUser && { id: "pincode", type: "text", placeholder: "Pincode" },
          ]
        : [
              { id: "restaurantName", type: "text", placeholder: "Restaurant Name" },
              !existingUser && { id: "email", type: "email", placeholder: "Email Address" },
              { id: "password", type: "password", placeholder: "Password" },
              !existingUser && { id: "pincode", type: "text", placeholder: "Pincode" },
          ];

    return (
        <div className={classes.signup}>
            <div className={classes.filler}></div>
            <div className={classes.signupContainer}>
                <h1>{existingUser ? "Sign In" : "Sign Up"} for {userType === "foodBank" ? "Food Bank" : "Restaurant"}</h1>
                <p>
                    {existingUser
                        ? "Login using email and password."
                        : "Create an account using an email and a password."}
                </p>
                <form onSubmit={handleSubmit} className={classes.signupForm}>
                    {formFields.map(
                        (field) =>
                            field && (
                                <div className={classes.formContainer} key={field.id}>
                                    <input
                                        required
                                        id={field.id}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={formData[field.id]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )
                    )}
                    {!existingUser && (
                        <div className={classes.formContainer}>
                            {/* <GooglePlacesAutocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                                selectProps={{
                                    destination: formData.area,
                                    onChange: handleAreaChange,
                                }}
                            /> */}
                        </div>
                    )}
                    <div className={classes.existingUser}>
                        <label htmlFor="existingUser">Existing User</label>
                        <input
                            type="checkbox"
                            id="existingUser"
                            checked={existingUser}
                            onChange={() => setExistingUser(!existingUser)}
                        />
                    </div>
                    <button type="submit">{existingUser ? "Login" : "Register"}</button>
                </form>
                <Link to="/" className={classes.link}>
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default Signup;
