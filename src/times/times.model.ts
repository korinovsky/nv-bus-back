export enum DayOfWeek {
    WorkDays = '1111100',
    WeekEnd = '0000011',
}

export type Times = number[];

export type DateTimes = {
    [key in DayOfWeek]: Times;
};
