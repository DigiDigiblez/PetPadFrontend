import "./Header.scss";

import React, {useEffect, useState} from "react";

import { ReactComponent as Hamburger } from "../../../icons/hamburger.svg";
import { ReactComponent as Logo } from "../../../icons/logo.svg";
import Overlay from "../../molecules/Overlay";
import MainDrawerContent from "../../templates/MainDrawerContent/MainDrawerContent";
import Drawer from "../Drawer/Drawer";
import Container from "../../atoms/Container";
import axios from "axios";
import {ENDPOINT} from "../../../helpers/urls";

const baseclass = "header";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    return (
        <header className={baseclass}>
            <Container className={`${baseclass}__logo`}>
                <Logo className={`${baseclass}__logo_image`} />
                <h2 className={`${baseclass}__logo_name`}>
                    {profileData.name ? `${profileData.name}'s Pad` : "Pet Pad"}
                </h2>
            </Container>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Hamburger className={`${baseclass}__hamburger`} />
            </span>
            {isMenuOpen && (
                <>
                    <Drawer>
                        <MainDrawerContent />
                    </Drawer>
                    <Overlay version="drawer" />
                </>
            )}
        </header>
    );
};

export default Header;
