import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import CalendarGrid from './CalendarGrid';
import CalendarLegend from './CalendarLegend';
import { AuspiciousDay, DayType, AuspiciousDayType } from '../../types/calendar.types';

const dayTypes: Record<AuspiciousDayType, DayType> = {
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

    // Sample data for March 2025 - This would ideally be fetched or managed more dynamically
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
                    <CalendarGrid 
                        currentMonth={currentMonth} 
                        auspiciousData={marchData} 
                        dayTypes={dayTypes} 
                    />
                </div>

                {/* Legend Section */}
                <CalendarLegend dayTypes={dayTypes} />
            </div>
        </div>
    );
}