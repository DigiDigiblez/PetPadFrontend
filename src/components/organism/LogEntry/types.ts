import { ReactNode } from "react";

export interface ILogEntryProps {
    dateCreated: Date;
    dateLastModified: Date;
    petBirthday: Date;
    children: ReactNode;
}
