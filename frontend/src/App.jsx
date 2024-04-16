import { useNavigate } from "react-router-dom";
import { useState } from "react";

import classes from "./App.module.css";
import NOODLE from "./assets/images/landingpage/noodle.svg";
// get user record from /user/{id} api on port 8000

function App() {
    // const [currentImg, setCurrentImg] = useState(() =>
    //     Math.floor(Math.random() * 2)
    // );

    const navigate = useNavigate();
    let currentImg  = 0;

    return (
        <div className={classes.landingPage}>
            <div
                className={`${classes.left} ${
                    currentImg === 0 ? classes.left1 : classes.left2
                }`}
            ></div>

            <div className={classes.right}>
                <h1>FOOD BRIDGE</h1>
                <p>Bridging the Gap between Abundance and Need.</p>
                <div className={classes.btnContainer}>
                    <button
                        className={classes.link}
                        onClick={() => {
                            navigate("/signup", {
                                state: { userType: "foodBank" },
                            });
                        }}
                    >
                        FOOD BANK ACCESS
                    </button>
                    <button
                        className={classes.link}
                        onClick={() => {
                            navigate("/signup", {
                                state: { userType: "restaurant" },
                            });
                        }}
                    >
                        RESTAURANT ACCESS
                    </button>
                    <button
                        className={classes.link}
                        onClick={() => {
                            navigate("/prediction");
                        }}
                    >
                        FREE PREDICTION USING AI
                    </button>
                </div>
                <img src={NOODLE} alt="noodle" />
            </div>
        </div>
    );
}

export default App;
