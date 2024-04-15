/* eslint-disable react/prop-types */
import classes from "./TopNavbar.module.css";

import LOGO from '../../assets/react.svg';

export default function TopNavbar({ showNavbar, userName, location }) {
    if (!showNavbar) {
        return null;
    }

    return (
        <div className={classes.topNavbar}>
            <div className={classes.imgContainer}>
                <img src={LOGO} alt="logo" />
                <div className={classes.userDetails}>
                    {userName && <p>{userName}</p>}
                    {location && <p>{location}</p>}
                </div>
            </div>
        </div>
    );
}