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
            profile_image: "data:image/png;base64,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" || "",
            profile_completed: false,
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

            // Garbage collection
            localStorage.removeItem("currentStep")
            localStorage.removeItem("petRegistrationData")

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
