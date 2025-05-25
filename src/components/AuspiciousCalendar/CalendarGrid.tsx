import React, { ReactElement } from 'react';
import { CalendarGridProps, AuspiciousDay, DayType } from '../../types/calendar.types'; // Assuming AuspiciousDay and DayType are also in calendar.types.ts

export default function CalendarGrid({ currentMonth, auspiciousData, dayTypes }: CalendarGridProps) {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const weeks: ReactElement[] = [];
    let days: ReactElement[] = [];
    let dayCount = 1;

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<td key={`empty-${i}`} className="p-4"></td>);
    }

    // Fill in the days of the month
    while (dayCount <= daysInMonth) {
        const dailyAuspiciousData = auspiciousData.filter((day: AuspiciousDay) => day.date === dayCount);
        
        days.push(
            <td key={dayCount} className="p-4 border relative min-h-[100px] align-top">
                <span className="font-medium">{dayCount}</span>
                <div className="mt-2">
                    {dailyAuspiciousData.map((day, index) => (
                        <div key={index} className="text-yellow-500 text-lg">
                            {dayTypes[day.type]?.icon || '?'}
                        </div>
                    ))}
                </div>
            </td>
        );

        if ((firstDayOfMonth + dayCount) % 7 === 0) {
            weeks.push(<tr key={`week-${dayCount / 7}`}>{days}</tr>);
            days = [];
        }
        dayCount++;
    }

    // Add remaining days to the last week
    if (days.length > 0) {
        while (days.length < 7) {
            days.push(<td key={`empty-end-${days.length}`} className="p-4"></td>);
        }
        weeks.push(<tr key="last-week">{days}</tr>);
    }

    return (
        <table className="w-full">
            <thead>
                <tr className="border-b">
                    <th className="p-4 text-[#741B1B] font-semibold">SUN</th>
                    <th className="p-4 text-[#741B1B] font-semibold">MON</th>
                    <th className="p-4 text-[#741B1B] font-semibold">TUE</th>
                    <th className="p-4 text-[#741B1B] font-semibold">WED</th>
                    <th className="p-4 text-[#741B1B] font-semibold">THUR</th>
                    <th className="p-4 text-[#741B1B] font-semibold">FRI</th>
                    <th className="p-4 text-[#741B1B] font-semibold">SAT</th>
                </tr>
            </thead>
            <tbody>
                {weeks}
            </tbody>
        </table>
    );
}
