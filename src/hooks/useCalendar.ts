import { useState, useMemo } from 'react';
import { sampleAuspiciousDays, AuspiciousDay } from '../data/calendarData'; // Import data

export interface CalendarDay {
  date: number | null; // Actual date number, or null for empty cells
  isCurrentMonth: boolean;
  auspiciousTypes: AuspiciousDay[]; // Store the full AuspiciousDay objects
  isToday: boolean;
}

export interface CalendarWeek {
  days: CalendarDay[];
}

interface UseCalendarReturn {
  currentMonth: Date;
  weeks: CalendarWeek[];
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  monthName: string;
  year: number;
}

// Helper function to check if a day is today
const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

export const useCalendar = (): UseCalendarReturn => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = useMemo(() => new Date(), []); // Memoize today's date

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  const weeks = useMemo(() => {
    const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1).getDay(); // 0 (Sun) - 6 (Sat)

    const generatedWeeks: CalendarWeek[] = [];
    let currentDays: CalendarDay[] = [];
    let dayCount = 1;

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentDays.push({ date: null, isCurrentMonth: false, auspiciousTypes: [], isToday: false });
    }

    // Fill in the days of the month
    while (dayCount <= daysInMonth) {
      const currentDateObj = new Date(year, currentMonth.getMonth(), dayCount);
      const auspiciousForDay = sampleAuspiciousDays.filter(ad => {
        // Assuming sampleAuspiciousDays is generic for any month right now.
        // If it were month/year specific, we'd also filter by month and year here.
        return ad.date === dayCount;
      });

      currentDays.push({
        date: dayCount,
        isCurrentMonth: true,
        auspiciousTypes: auspiciousForDay,
        isToday: isSameDay(currentDateObj, today)
      });

      if ((firstDayOfMonth + dayCount) % 7 === 0) {
        generatedWeeks.push({ days: currentDays });
        currentDays = [];
      }
      dayCount++;
    }

    // Add remaining empty cells to the last week
    if (currentDays.length > 0) {
      while (currentDays.length < 7) {
        currentDays.push({ date: null, isCurrentMonth: false, auspiciousTypes: [], isToday: false });
      }
      generatedWeeks.push({ days: currentDays });
    }

    return generatedWeeks;
  }, [currentMonth, year, today]);

  return {
    currentMonth,
    weeks,
    handlePrevMonth,
    handleNextMonth,
    monthName,
    year,
  };
};
