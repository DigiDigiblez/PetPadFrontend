import "./LogEntry.scss";

import React, {useEffect, useState} from "react";
import Container from "../../atoms/Container";

import {ReactComponent as ExcitedMood} from "../../../icons/mood_1_excited.svg";
import {ReactComponent as HappyMood} from "../../../icons/mood_2_happy.svg";
import {ReactComponent as OkayMood} from "../../../icons/mood_3_okay.svg";
import {ReactComponent as SadMood} from "../../../icons/mood_4_sad.svg";
import {ReactComponent as AngryMood} from "../../../icons/mood_5_angry.svg";
import {ReactComponent as ExhaustedMood} from "../../../icons/mood_6_exhausted.svg";

import {ReactComponent as HistoryAttachment} from "../../../icons/history_attachment.svg";
import {ReactComponent as HistoryEdit} from "../../../icons/history_edit.svg";
import {ReactComponent as HistoryDelete} from "../../../icons/history_delete.svg";
import {ReactComponent as Birthday} from "../../../icons/birthday.svg";
import {ILogEntryProps} from "./types";
import wasPostedOnBirthday from "../../../helpers/utilities/wasPostedOnBirthday";
import axios from "axios";
import {ENDPOINT} from "../../../helpers/urls";
import {useHistory} from "react-router";

const LogEntry = ({
                      id,
                      mood,
                      dateCreated,
                      dateLastModified,
                      petBirthday,
                      children,
                  }: ILogEntryProps) => {
    const baseclass = "log-entry";

    const history = useHistory();

    const isAuthed = Boolean(localStorage.getItem("jwt"))

    const date = new Date(dateCreated);
    // Adjust timezone for England.
    let offset = date.getTimezoneOffset();
    offset = Math.abs(offset / 60);
    date.setHours(date.getHours() + offset);

    const month = date.toLocaleString("en-GB", {month: "short", timeZone: 'Europe/London'});
    const year = date.toLocaleString("en-GB", {year: "numeric", timeZone: 'Europe/London'});
    const weekday = date.toLocaleString("en-GB", {
        weekday: "short",
        timeZone: 'Europe/London',
    });
    const day = date.toLocaleString("en-GB", {day: "numeric", timeZone: 'Europe/London'});
    const time = date.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        timeZone: 'Europe/London',
    });

    const postedOnBirthday = wasPostedOnBirthday(new Date(petBirthday), day, month, year)

    const [profileData, setProfileData] = useState({
        name: "",
    })

    const handleUpdatingPost = () => {
        if (!isAuthed) {
            return alert("You are on a FREE TIER account. Only PREMIUM users can edit posts.")
        }

        // Take user to their Pet Pad to edit the specific post.
        history.push("/pad", {id, mood, children})
    }

    const handleDeletingPost = () => {
        if (!isAuthed) {
            return alert("You are on a FREE TIER account. Only PREMIUM users can delete posts.")
        }

        const well = document.querySelector(".save-successful-well")!;
        const submitBtn = document.getElementById(
            "save-profile-data-btn",
        )! as HTMLInputElement;

        well.classList.toggle("hidden");

        setTimeout(() => {
            const JWT = localStorage.getItem("jwt");

            const config = {
                headers: {Authorization: `Bearer ${JWT}`}
            };

            axios.delete(`${ENDPOINT.POSTS.DELETE_SPECIFIC}${id}`, config)
                .then(result => {
                    well.classList.toggle("hidden");
                    window.location.reload()

                    console.log("Success: ", result);
                })
                .catch(error => {
                    console.log("Error: ", error);
                });
        }, 500);
    }

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

                console.log("Success: ", result);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }, [])

    const Moood: any = selectMoodToShow(mood);

    return (
        <Container className={`${baseclass}__log`}>
            <h3>
                {weekday} {day} {month}, {year}
            </h3>
            <Container className={`${baseclass}__log_entry`}>
                <div className={`${baseclass}__log_entry_header`}>
                    <div
                        className={`${baseclass}__log_entry_header_1`}>
                        {/* If timestamps don't match, post has been modified since creation. */}
                        <h4>{dateCreated !== dateLastModified ? "Modified: " : "Created: "} {time}</h4>
                        <HistoryAttachment
                            onClick={() => alert("Attachments feature coming soon. Icon for proof of concept.")}/>
                        {postedOnBirthday && <Birthday
                            onClick={() => !isAuthed && alert(`Happy birthday ${profileData.name}! Have a good day!`)}/>}
                    </div>
                    <div
                        className={`${baseclass}__log_entry_header_2`}>
                        <HistoryEdit
                            onClick={handleUpdatingPost}/>
                        <HistoryDelete
                            onClick={handleDeletingPost}/>
                    </div>
                </div>
                <div className={`${baseclass}__log_entry_body`}>
                    <span>{children}</span>
                    <Moood className="post-mood"/>
                </div>
            </Container>
            <div
                className={`well save-successful-well hidden`}>
                Post deleted successfully!
            </div>
        </Container>
    );
};

const selectMoodToShow = (mood: any) => {
    let moodSVG = null;

    switch (mood) {
        case "Excited": {
            moodSVG = ExcitedMood;
            break;
        }
        case "Happy": {
            moodSVG = HappyMood;
            break;
        }
        case "Okay": {
            moodSVG = OkayMood;
            break;
        }
        case "Sad": {
            moodSVG = SadMood;
            break;
        }
        case "Angry": {
            moodSVG = AngryMood;
            break;
        }
        case "Exhausted": {
            moodSVG = ExhaustedMood;
            break;
        }
    }

    return moodSVG;
}

export default LogEntry;
