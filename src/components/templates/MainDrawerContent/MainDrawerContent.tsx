import "./MainDrawerContent.scss";

import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import Container from "../../atoms/Container";
import DrawerNavItem from "../../atoms/DrawerNavItem/DrawerNavItem";
import {ROUTES} from "../../pages/Routes/types";
import NavigateProfile from "../../../icons/navigate_profile.svg";
import NavigatePad from "../../../icons/navigate_pad.svg";
import NavigateHistory from "../../../icons/navigate_history.svg";
import NavigateAssistant from "../../../icons/navigate_assistant.svg";
import axios from "axios";
import {ENDPOINT} from "../../../helpers/urls";

const MainDrawerContent = () => {
    const baseclass = "main-drawer-content";

    const history = useHistory();

    const isAuthed = Boolean(localStorage.getItem("jwt"))

    const [profileData, setProfileData] = useState({
        name: "",
    })

    useEffect(() => {
        axios.get(ENDPOINT.PETS.GET_FIRST)
            .then(result => {
                setProfileData({
                    ...profileData,
                    ...result.data,
                })

                console.log("Success: ", result);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }, [])

    const petName = profileData.name ? profileData.name : "Pet";

    const checkIfAuthed = (isAuthed: boolean) => {
        if (!isAuthed) {
            return alert("You are on a FREE TIER account. Please upgrade to PREMIUM to use this feature.")
        }

        history.push("/assistant");
    }

    return (
        <Container className={baseclass}>
            <Container className={`${baseclass}__authed`}>
                <div className={`${baseclass}__ctas`}>
                    <button className="primary_cta">
                        <NavLink to={ROUTES.HOMEPAGE}>
                            Homepage
                        </NavLink>
                    </button>
                    <button className="link_cta">
                        <NavLink to={ROUTES.HOMEPAGE}>
                            Or sign out
                        </NavLink>
                    </button>
                </div>
                <div className={`${baseclass}__drawers`}>
                    <h2>Navigate</h2>
                    <DrawerNavItem
                        to="/profile"
                        badge={NavigateProfile}
                        alt={`Navigate to ${petName}'s profile`}
                        text={`${petName}'s profile`}
                    />
                    <DrawerNavItem
                        to="/pad"
                        badge={NavigatePad}
                        alt={`Navigate to ${petName}'s pad`}
                        text={`${petName}'s pad`}
                    />
                    <DrawerNavItem
                        to="/history"
                        badge={NavigateHistory}
                        alt={`Navigate to ${petName}'s history`}
                        text={`${petName}'s history`}
                    />
                    <span onClick={() => checkIfAuthed(isAuthed)}>
                            <DrawerNavItem
                                badge={NavigateAssistant}
                                alt={`Navigate to ${petName}'s assistant`}
                                text={`${petName}'s assistant`}
                                premium
                            />
                        </span>
                </div>
            </Container>
        </Container>
    );
};

export default MainDrawerContent;
