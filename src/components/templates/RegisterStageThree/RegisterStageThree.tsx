import "./RegisterStageThree.scss";
import "./Spinner.scss";
import axios from "axios";

import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";

import Container from "../../atoms/Container";
import {ReactComponent as BorderCollieIn} from "../../../icons/border_collie_in.svg";
import {ENDPOINT} from "../../../helpers/urls";

const RegisterStageThree = () => {
    const baseclass = "register-stage-three";

    const history = useHistory();

    const petData = JSON.parse(
        localStorage.getItem("petRegistrationData")!,
    );

    const [etaForBuild, setEtaForBuild] = useState({
        minutes: 0,
        seconds: 3,
    });

    useEffect(() => {
        axios.post(ENDPOINT.PETS.POST, {
            name: petData.name || "",
            gender: petData.gender || "",
            species: petData.species || "",
            breed: petData.breed || "",
            weight: petData.weight || 0,
            height: petData.height || 0,
            birthday: petData.birthday || new Date().toISOString(),
            favourite_toy: petData.favourite_toy || "",
            favourite_food: petData.favourite_food || "",
            personality_trait: petData.personality_trait || "",
            social_google_plus_url: petData.social_google_plus_url || "",
            social_facebook_url: petData.social_facebook_url || "",
            social_twitter_url: petData.social_twitter_url || "",
            social_instragram_url: petData.social_instragram_url || "",
        })
            .then(result => {
                console.log("Success: ", result);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }, []);

    const {seconds} = etaForBuild;

    setInterval(() => {
        if (seconds > 1) {
            setEtaForBuild({
                ...etaForBuild,
                seconds: seconds - 1,
            });
        } else {
            etaForBuild.seconds = 3;
            history.push("/profile");
        }
    }, 1000);

    return (
        <Container className={baseclass}>
            <h2>Building {petData.name}'s profile</h2>
            <div className="loader">
                <BorderCollieIn className={`${baseclass}__logo`}/>
            </div>
            <p>
                <h1>{seconds}</h1>
            </p>
        </Container>
    );
};

export default RegisterStageThree;
