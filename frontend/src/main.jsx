import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./pages/Authentication/Signup.jsx";
import AvailableRestaurants from "./pages/AvailableRestaurants/AvailableRestaurants.jsx";
import DonationRequests from "./pages/DonationRequests/DonationRequests.jsx";
import TopNavbar from "./pages/TopNavbar/TopNavbar.jsx";
import SideNavbar from "./pages/SideNavbar/SideNavbar.jsx";
import Prediction from "./pages/Prediction/Prediction.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>404 Not Found</div>,
    },
    {
        path: "/signup",
        element: (
            <>
                <TopNavbar showNavbar={true} />
                <Signup />
            </>
        ),
        errorElement: <div>Please go to Home Page first</div>,
    },
    {
        path: '/prediction',
        element: (
            <>
                <TopNavbar showNavbar={true} />
                <Prediction />
            </>
        ),
        
    },
    {
        path: "/availablerestaurants/:profileId",
        element: (
            <>
                <AvailableRestaurants />
            </>
        ),
    },
    {
        path: "/donationrequests/:profileId",
        element: (
            <>
                <TopNavbar showNavbar={true} />
                <SideNavbar showNavbar={true} />
                <DonationRequests />
            </>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
