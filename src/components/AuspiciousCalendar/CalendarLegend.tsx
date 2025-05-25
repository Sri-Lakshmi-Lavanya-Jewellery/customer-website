import React from 'react';
import { CalendarLegendProps, DayType } from '../../types/calendar.types'; // Assuming DayType is also in calendar.types.ts

export default function CalendarLegend({ dayTypes }: CalendarLegendProps) {
    return (
        <div className="lg:col-span-1">
            <div className="bg-[#741B1B] text-white p-4 rounded-t-lg">
                <h3 className="text-xl font-semibold">AUSPICIOUS DAY</h3>
            </div>
            <div className="bg-white shadow-lg rounded-b-lg p-4">
                <div className="space-y-4">
                    {Object.entries(dayTypes).map(([key, value]: [string, DayType]) => (
                        <div key={key} className="flex items-center gap-3">
                            <span className="text-2xl">{value.icon}</span>
                            <span className="text-gray-700">{value.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
