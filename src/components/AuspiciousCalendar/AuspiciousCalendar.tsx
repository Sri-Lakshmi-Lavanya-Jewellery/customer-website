import React from 'react'; // Removed useState and ReactElement
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useCalendar } from '../../hooks/useCalendar'; // Import custom hook
import { dayTypes } from '../../data/calendarData'; // Import dayTypes from new location

export default function AuspiciousCalendar() {
    const {
        weeks,
        handlePrevMonth,
        handleNextMonth,
        monthName,
        year,
    } = useCalendar();

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-[#741B1B] mb-2">
                Auspicious Calendar
            </h1>
            <p className="text-gray-600 mb-8">Every day is a special day</p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Calendar Section */}
                <div className="lg:col-span-3 bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex justify-between items-center bg-[#741B1B] text-white p-4">
                        <button 
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-[#8B2121] rounded-full"
                        >
                            <IoIosArrowBack size={24} />
                        </button>
                        <h2 className="text-2xl font-semibold">
                            {monthName} {year}
                        </h2>
                        <button 
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-[#8B2121] rounded-full"
                        >
                            <IoIosArrowForward size={24} />
                        </button>
                    </div>

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
                            {weeks.map((week, weekIndex) => (
                                <tr key={weekIndex}>
                                    {week.days.map((day, dayIndex) => (
                                        <td
                                            key={dayIndex}
                                            className={`p-4 border relative min-h-[100px] align-top ${
                                                day.isCurrentMonth ? (day.isToday ? 'bg-red-100' : 'bg-white') : 'bg-gray-50'
                                            }`}
                                        >
                                            {day.isCurrentMonth && day.date && (
                                                <>
                                                    <span className={`font-medium ${day.isToday ? 'text-red-700 font-bold' : 'text-gray-800'}`}>
                                                        {day.date}
                                                    </span>
                                                    <div className="mt-1 space-y-1">
                                                        {day.auspiciousTypes.map((auspiciousDay, index) => (
                                                            <div key={index} className="text-gold-500 text-lg flex items-center" title={dayTypes[auspiciousDay.type]?.name}>
                                                                {dayTypes[auspiciousDay.type]?.icon}
                                                                {/* Optionally display name: <span className="text-xs ml-1">{dayTypes[auspiciousDay.type]?.name}</span> */}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Legend Section */}
                <div className="lg:col-span-1">
                    <div className="bg-[#741B1B] text-white p-4 rounded-t-lg">
                        <h3 className="text-xl font-semibold">AUSPICIOUS DAY</h3>
                    </div>
                    <div className="bg-white shadow-lg rounded-b-lg p-4">
                        <div className="space-y-4">
                            {Object.entries(dayTypes).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-3">
                                    <span className="text-2xl">{value.icon}</span>
                                    <span className="text-gray-700">{value.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 