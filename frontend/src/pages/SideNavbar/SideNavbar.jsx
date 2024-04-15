import classes from "./SideNavbar.module.css";

import USERIMG from '../../assets/images/user.png'
import { useNavigate } from "react-router-dom";

import {
    MdDashboard,
    MdPeople,
    MdAccountBox,
    MdList,
    MdLogout,
} from "react-icons/md";

// eslint-disable-next-line react/prop-types
const SideNavbar = ({ showNavbar }) => {
    const navigate = useNavigate();

    if (!showNavbar) {
        return null;
    }

    function logOut() {
        navigate('/');
    }

    return (
        <div className={classes.sideNavbar}>
            <div className={classes.top}>
                <img src={USERIMG} alt="user" />
                <ul>
                    <li><MdDashboard /><p>DASHBOARD</p></li>
                    <li><MdList /><p>STOCK</p></li>
                    <li><MdPeople /><p>VOLUNTEERS</p></li>
                    <li><MdAccountBox /><p>ACCOUNT</p></li>
                </ul>
            </div>
            <div className={classes.bottom}>
                <p onClick={logOut}><MdLogout className={classes.logoutImg} />Logout</p>
            </div>
        </div>
    );
};

export default SideNavbar;
