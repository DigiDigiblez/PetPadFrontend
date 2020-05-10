import "./Assistant.scss";

import React, {useEffect, useState} from "react";
import * as AssistantFigure from "../../../icons/assistant.png";

import Container from "../../atoms/Container";
import Chrome from "../Chrome/Chrome";
import axios from "axios";
import {ENDPOINT} from "../../../helpers/urls";

const Assistant = () => {
    const baseclass = "assistant";

    const selectMood = (e: any) => {
        console.log(e.currentTarget.getAttribute("name"));
    };

    const [profileData, setProfileData] = useState({
        name: undefined,
        gender: undefined,
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

    let pronoun;
    if (profileData.gender === "male") pronoun = "he";
    else if (profileData.gender === "female") pronoun = "she";

    const petName = profileData.name || "Pet";

    return (
        <Container className={baseclass}>
            <Chrome>
                <Container className={`${baseclass}__content`}>
                    <h2>{petName}'s Assistant</h2>
                    <h3>Generate report from dates</h3>
                    <div onClick={() =>
                        alert("Feature coming soon")
                    } className={`${baseclass}__dates`}>
                        <span>Report start date</span>
                        <input
                            type="date"
                        />
                        <span>Report end date</span>
                        <input
                            type="date"
                        />
                    </div>
                    <img
                        // @ts-ignore
                        src={AssistantFigure}
                    />
                    <Container className={`${baseclass}__advice`}>
                        <div className={`${baseclass}__advice_intro`}>
                            Good morning{" "}
                            <span className="emphasis">
                                dear friend
                            </span>
                            , thanks for keeping me up to speed with {" "}
                            {petName}’s well being. My feedback for{" "}
                            <span className="emphasis">today</span> is
                            as follows:
                        </div>
                        <div className={`${baseclass}__advice_tip`}>
                            <span className="emphasis">
                                General mood
                            </span>
                            : Happy ✅ <br/> I am pleased to say that
                            72% of the time {petName} is happy.
                        </div>
                        <div className={`${baseclass}__advice_tip`}>
                            <span className="emphasis">
                                Current weight
                            </span>
                            : Under ❌ <br/> Unfortunately, {petName} {" "}
                            is currently underweight for his age at
                            13.1 kg. Border Collies aged 4yr 11mo
                            should weight between 14-20 kg.
                        </div>
                        <div className={`${baseclass}__advice_tip`}>
                            <span className="emphasis">
                                Personality trait
                            </span>
                            : Playful ✅ <br/> This is a great trait
                            to have. He really benefits from the
                            constant enjoyment, which helps to keep
                            his stress levels to a minimum. Just be
                            wary of letting him off the leash near
                            roads, and leash him before he gets to the
                            park gates.
                        </div>
                    </Container>
                </Container>
            </Chrome>
        </Container>
    );
};

export default Assistant;
