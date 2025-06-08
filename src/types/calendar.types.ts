export type AuspiciousDayType = 
  | 'valarpirai' 
  | 'subhamuhurtham' 
  | 'chaturti' 
  | 'shasti_viradham' 
  | 'kirthigai' 
  | 'womens_day' 
  | 'ekhadashi' 
  | 'pradhosham' 
  | 'pournami' 
  | 'sankatahara_chaturti';

export interface AuspiciousDay {
    type: AuspiciousDayType;
    date: number;
}

export interface DayType {
    name: string;
    icon: string;
}

// It might be useful to also type the dayTypes object if it's passed around or complex
// For example:
// export type DayTypesCollection = Record<AuspiciousDayType, DayType>;
// However, in AuspiciousCalendar.tsx, dayTypes is a local const.
// CalendarGridProps and CalendarLegendProps can also be defined here if they become complex
// or if their constituent types are all defined here.

// For CalendarGrid:
export interface CalendarGridProps {
    currentMonth: Date;
    auspiciousData: AuspiciousDay[];
    dayTypes: Record<AuspiciousDayType, DayType>;
}

// For CalendarLegend:
export interface CalendarLegendProps {
    dayTypes: Record<AuspiciousDayType, DayType>;
}
