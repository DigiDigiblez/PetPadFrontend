import { ReactNode } from "react";

export interface ILogEntryProps {
    id: number;
    mood: string;
    dateCreated: Date;
    dateLastModified: Date;
    petBirthday: Date;
    children: ReactNode;
}
