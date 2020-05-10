const wasPostedOnBirthday = (birthday: Date, postDay: string, postMonth: string, postYear: string) => {
    const birthDay = birthday.toLocaleString("en-GB", {day: "numeric", timeZone: 'Europe/London'});
    const birthMonth = birthday.toLocaleString("en-GB", {month: "short", timeZone: 'Europe/London'});
    const birthYear = birthday.toLocaleString("en-GB", {year: "numeric", timeZone: 'Europe/London'});

    return postDay === birthDay && postMonth === birthMonth && postYear === birthYear
}

export default wasPostedOnBirthday;
