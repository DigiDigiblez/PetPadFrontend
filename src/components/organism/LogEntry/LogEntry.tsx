import "./LogEntry.scss";

import React, {useEffect, useState} from "react";
import Container from "../../atoms/Container";

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

    const isPremium = true; // TODO

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
        if (!isPremium) {
            return alert("You are on a FREE TIER account. Only PREMIUM users can edit posts.")
        }

        // Take user to their Pet Pad to edit the specific post.
        history.push("/pad", {id, mood, children})
    }

    const handleDeletingPost = () => {
        if (!isPremium) {
            return alert("You are on a FREE TIER account. Only PREMIUM users can delete posts.")
        }

        axios.delete(`${ENDPOINT.POSTS.DELETE_SPECIFIC}${id}`)
            .then(result => {
                console.log("Success: ", result);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }

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
        <Container className={`${baseclass}__log`}>
            <h3>
                {weekday} {day} {month}, {year}
            </h3>
            <Container className={`${baseclass}__log_entry`}>
                <div className={`${baseclass}__log_entry_header`}>
                    <div
                        className={`${baseclass}__log_entry_header_1`}>
                        <h4>Created: {time}</h4>
                        <HistoryAttachment
                            onClick={() => alert("Attachments feature coming soon. Icon for proof of concept.")}/>
                        {postedOnBirthday && <Birthday
                            onClick={() => !isPremium && alert(`Happy birthday ${profileData.name}! Have a good day!`)}/>}
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
                </div>
            </Container>
        </Container>
    );
};

export default LogEntry;
