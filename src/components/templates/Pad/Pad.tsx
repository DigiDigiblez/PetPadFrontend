import "./Pad.scss";

import React, {useEffect, useState} from "react";

import {ReactComponent as ExcitedMood} from "../../../icons/mood_1_excited.svg";
import {ReactComponent as HappyMood} from "../../../icons/mood_2_happy.svg";
import {ReactComponent as OkayMood} from "../../../icons/mood_3_okay.svg";
import {ReactComponent as SadMood} from "../../../icons/mood_4_sad.svg";
import {ReactComponent as AngryMood} from "../../../icons/mood_5_angry.svg";
import {ReactComponent as ExhaustedMood} from "../../../icons/mood_6_exhausted.svg";

import Container from "../../atoms/Container";
import Chrome from "../Chrome/Chrome";
import axios from "axios";
import {ENDPOINT} from "../../../helpers/urls";
import {useHistory} from "react-router";

const Pad = (props: any) => {
    const baseclass = "pad";

    const history = useHistory();

    const [profileData, setProfileData] = useState({
        name: undefined,
        gender: undefined,
    })

    // Collect any post data if the user is accessing this page to edit a post.
    let editingPostId: any;
    let editingPostMood: any;
    let editingPostContent: any;

    if (props.location.state) {
        editingPostId = props.location.state.id;
        editingPostMood = props.location.state.mood;
        editingPostContent = props.location.state.children;
    }

    const [nameAlternative, setNameAlternative] = useState("they");

    useEffect(() => {
        const JWT = localStorage.getItem("jwt");

        const config = {
            headers: {Authorization: `Bearer ${JWT}`}
        };

        axios.get(ENDPOINT.PETS.GET_FIRST, config)
            .then(result => {
                setProfileData({
                    ...profileData,
                    ...result.data,
                })

                if (result.data.gender === "Male") setNameAlternative("he");
                else if (result.data.gender === "Female") setNameAlternative("she");

                console.log("Success: ", result);
            })
            .catch(error => {
                console.log("Error: ", error);
            });

        // Default content (post edit mode only)
        if (editingPostContent) {
            // Select existing mood
            const moods = document.getElementsByClassName("mood");

            Array.from(moods).forEach((mood: any) => {
                const name = mood.getAttribute("name")
                activeMood.moodLabel = editingPostMood;

                console.log(name, editingPostMood)

                if (name === editingPostMood) {
                    console.log(name, editingPostMood)
                    mood.style.border = "solid 5px green";
                }
            });

            // Populate with existing content
            const contentEditableDiv = document.querySelector(`.${baseclass}__note-content`);
            contentEditableDiv!.innerHTML = editingPostContent;
        }
    }, [])

    const [activeMood, setActiveMood] = useState({
        moodTarget: null,
        moodLabel: "",
    });
    const [currentContent, setCurrentContent] = useState(editingPostMood || "")

    const selectMood = (e: any) => {
        const moods = document.getElementsByClassName("mood");
        // Reset transparencies.
        Array.from(moods).forEach((mood: any) => {
            mood.style.border = "solid 5px transparent";
        });

        activeMood.moodLabel = e.currentTarget.getAttribute("name");

        if (activeMood.moodTarget) {
            (activeMood.moodTarget as any).style.border =
                "solid 5px transparent";
        }
        activeMood.moodTarget = e.currentTarget;
        (activeMood.moodTarget as any).style.border =
            "solid 5px green";
    };

    const petName = profileData.name || "Pet";

    const handlePublishPost = (e: any) => {
        e.preventDefault();

        // Is editing an existing post
        if (editingPostContent) {
            if (!activeMood.moodLabel) {
                return alert("Please select a mood before republishing.")
            } else if (currentContent == "") {
                return alert("Please provide content before republishing.")
            }

            const JWT = localStorage.getItem("jwt");

            const config = {
                headers: {Authorization: `Bearer ${JWT}`}
            };

            axios.patch(`${ENDPOINT.POSTS.PATCH_SPECIFIC}${editingPostId}`,
                {
                    mood: activeMood.moodLabel || "",
                    content: currentContent || "",
                    date_last_modified: new Date(),
                },
                config,
            )
                .then(result => {
                    window.scrollTo(0, 0);
                    history.push("/history")

                    console.log("Success: ", result);
                })
                .catch(error => {
                    window.scrollTo(0, 0);

                    console.log("Error: ", error);
                });
        }
        // Is publishing a new post
        else {
            if (!activeMood.moodLabel) {
                return alert("Please select a mood before publishing.")
            } else if (currentContent == "") {
                return alert("Please provide content before publishing.")
            }

            const JWT = localStorage.getItem("jwt");

            const config = {
                headers: {Authorization: `Bearer ${JWT}`}
            };

            axios.post(ENDPOINT.POSTS.POST,
                {
                    mood: activeMood.moodLabel || "",
                    content: currentContent || "",
                    creation_datetime: new Date(),
                    date_last_modified: new Date(),
                    is_open: false,
                },
                config,
            )
                .then(result => {
                    window.scrollTo(0, 0);

                    console.log("Success: ", result);
                })
                .catch(error => {
                    window.scrollTo(0, 0);

                    console.log("Error: ", error);
                });
        }

        const well = document.querySelector(".save-successful-well")!;
        const submitBtn = document.getElementById(
            "publish-entry-btn",
        )! as HTMLInputElement;

        well.classList.toggle("hidden");
        submitBtn.disabled = true;
        submitBtn.style.cursor = "not-allowed";

        setTimeout(() => {
            well.classList.toggle("hidden");
            submitBtn.disabled = false;
            submitBtn.style.cursor = "pointer";
            window.location.reload();
        }, 500);
    }

    return (
        <Container className={baseclass}>
            <Chrome>
                <Container className={`${baseclass}__content`}>
                    <h2>{petName}'s Pad</h2>
                    <Container className={`${baseclass}__moods`}>
                        <h3>How was {petName} today?</h3>
                        <span>
                            <div
                                className={`${baseclass}__moods_mood`}>
                                <ExcitedMood
                                    className={"mood"}
                                    onClick={selectMood}
                                    name="Excited"
                                />
                                <span>Excited</span>
                            </div>
                            <div
                                className={`${baseclass}__moods_mood`}>
                                <HappyMood
                                    className={"mood"}
                                    onClick={selectMood}
                                    name="Happy"
                                />
                                <span>Happy</span>
                            </div>
                            <div
                                className={`${baseclass}__moods_mood`}>
                                <OkayMood
                                    className={"mood"}
                                    onClick={selectMood}
                                    name="Okay"
                                />
                                <span>Okay</span>
                            </div>
                            <div
                                className={`${baseclass}__moods_mood`}>
                                <SadMood
                                    className={"mood"}
                                    onClick={selectMood}
                                    name="Sad"
                                />
                                <span>Sad</span>
                            </div>
                            <div
                                className={`${baseclass}__moods_mood`}>
                                <AngryMood
                                    className={"mood"}
                                    onClick={selectMood}
                                    name="Angry"
                                />
                                <span>Angry</span>
                            </div>
                            <div
                                className={`${baseclass}__moods_mood`}>
                                <ExhaustedMood
                                    className={"mood"}
                                    onClick={selectMood}
                                    name="Exhausted"
                                />
                                <span>Exhausted</span>
                            </div>
                        </span>
                    </Container>

                    <h3>What did {nameAlternative} do today?</h3>
                    <div className={`${baseclass}__note`}>
                        <div
                            className={`${baseclass}__note-content`}
                            aria-required
                            contentEditable
                            onInput={e => setCurrentContent(e.currentTarget.textContent!)}
                        />
                    </div>
                    <span
                        className={`${baseclass}__attachments`}
                        onClick={() => alert("Feature coming soon!")}>
                        <Container
                            className={`${baseclass}__attachments_contents`}>
                            <span>Click to upload files</span>
                        </Container>
                    </span>

                    <button onClick={handlePublishPost} className="secondary_cta" id="publish-entry-btn">
                        {editingPostContent ? "Republish" : "Publish"} post
                    </button>

                    <div
                        className={`well save-successful-well hidden`}>
                        Post published successfully!
                    </div>
                </Container>
            </Chrome>
        </Container>
    );
};

export default Pad;
