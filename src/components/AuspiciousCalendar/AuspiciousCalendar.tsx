import React, { useState, ReactElement } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface AuspiciousDay {
    type: 'valarpirai' | 'subhamuhurtham' | 'chaturti' | 'shasti_viradham' | 'kirthigai' | 'womens_day' | 'ekhadashi' | 'pradhosham' | 'pournami' | 'sankatahara_chaturti';
    date: number;
}

interface DayType {
    name: string;
    icon: string;
}

const dayTypes: Record<string, DayType> = {
    valarpirai: { name: 'Valarpirai', icon: '🌒' },
    subhamuhurtham: { name: 'Subhamuhurtham', icon: '🕉️' },
    chaturti: { name: 'Chaturti', icon: '🙏' },
    shasti_viradham: { name: 'Shasti Viradham', icon: '🪔' },
    kirthigai: { name: 'Kirthigai', icon: '☀️' },
    womens_day: { name: 'Womens day', icon: '🌺' },
    ekhadashi: { name: 'Ekhadashi', icon: '🌙' },
    pradhosham: { name: 'Pradhosham', icon: '👥' },
    pournami: { name: 'Pournami', icon: '😊' },
    sankatahara_chaturti: { name: 'Sankatahara Chaturti', icon: '🙏' }
};

export default function AuspiciousCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Sample data for March 2025
    const marchData: AuspiciousDay[] = [
        { type: 'valarpirai', date: 1 },
        { type: 'subhamuhurtham', date: 2 },
        { type: 'chaturti', date: 3 },
        { type: 'shasti_viradham', date: 4 },
        { type: 'kirthigai', date: 5 },
        { type: 'womens_day', date: 8 },
        { type: 'ekhadashi', date: 9 },
        { type: 'pradhosham', date: 10 },
        { type: 'pournami', date: 15 }
    ];

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
        const auspiciousDays = marchData.filter(day => day.date === dayCount);
        
        days.push(
            <td key={dayCount} className="p-4 border relative min-h-[100px] align-top">
                <span className="font-medium">{dayCount}</span>
                <div className="mt-2">
                    {auspiciousDays.map((day, index) => (
                        <div key={index} className="text-yellow-500 text-lg">
                            {dayTypes[day.type].icon}
                        </div>
                    ))}
                </div>
            </td>
        );

        if ((firstDayOfMonth + dayCount) % 7 === 0) {
            weeks.push(<tr key={dayCount}>{days}</tr>);
            days = [];
        }
        dayCount++;
    }

    // Add remaining days to the last week
    if (days.length > 0) {
        while (days.length < 7) {
            days.push(<td key={`empty-end-${days.length}`} className="p-4"></td>);
        }
        weeks.push(<tr key={dayCount}>{days}</tr>);
    }

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

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
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
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
                            {weeks}
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