import dayjs from "dayjs";

export const getDifferenceInDaysFromToday = (date) => {
    if (!date) return 0;
    
    const targetDate = dayjs(date).startOf('day');
    const today = dayjs().startOf('day');
    
    return targetDate.diff(today, 'days');
}