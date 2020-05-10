import "./LogEntry.scss";

import React from "react";
import Container from "../../atoms/Container";

import {ReactComponent as HistoryAttachment} from "../../../icons/history_attachment.svg";
import {ReactComponent as HistoryEdit} from "../../../icons/history_edit.svg";
import {ReactComponent as HistoryDelete} from "../../../icons/history_delete.svg";
import {ReactComponent as Birthday} from "../../../icons/birthday.svg";
import {ILogEntryProps} from "./types";
import wasPostedOnBirthday from "../../../helpers/utilities/wasPostedOnBirthday";

const LogEntry = ({
                      dateCreated,
                      dateLastModified,
                      petBirthday,
                      children,
                  }: ILogEntryProps) => {
    const baseclass = "log-entry";

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
                        <HistoryAttachment/>
                        {wasPostedOnBirthday(new Date(petBirthday), day, month, year) && <Birthday/>}
                    </div>
                    <div
                        className={`${baseclass}__log_entry_header_2`}>
                        <HistoryEdit/>
                        <HistoryDelete/>
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
