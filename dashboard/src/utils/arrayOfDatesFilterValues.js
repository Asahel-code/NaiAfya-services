export const getArrayOfDates =() => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const currentWeek = new Date(currentDate);

    currentWeek.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

    const today = new Date(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`).toISOString();

    const startOfWeek = new Date(`${currentWeek.getFullYear()}-${(currentWeek.getMonth() + 1).toString().padStart(2, '0')}-${currentWeek.getDate().toString().padStart(2, '0')}`).toISOString();

    const startOfMonth = new Date(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-01`).toISOString();

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

