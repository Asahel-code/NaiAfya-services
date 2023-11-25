export const getArrayOfDates =() => {
    const currentDate = new Date();

    const today = new Date(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-${currentDate.getDate()}`).toISOString();

    const startOfWeek = new Date(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-${currentDate.getDate() - currentDate.getDay()}`).toISOString();

    const startOfMonth = new Date(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-01`).toISOString();

    const startOfYear = new Date(`${currentDate.getFullYear()}-01-01`).toISOString();

    return [
        {
            name: "Today",
            value: today,
        },
        {
            name: "This week",
            value: startOfWeek,
        },
        {
            name: "This month",
            value: startOfMonth,
        },
        {
            name: "This year",
            value: startOfYear,
        },
    ];
}

