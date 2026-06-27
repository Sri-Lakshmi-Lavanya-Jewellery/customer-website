export interface AuspiciousDay {
    type: 'valarpirai' | 'subhamuhurtham' | 'chaturti' | 'shasti_viradham' | 'kirthigai' | 'womens_day' | 'ekhadashi' | 'pradhosham' | 'pournami' | 'sankatahara_chaturti';
    date: number; // Represents the day of the month
    // Optionally, add month and year if data spans multiple months/years and isn't month-specific by context
    // month?: number; // 1-12
    // year?: number;
}

export interface DayType {
    name: string;
    icon: string;
}

export const dayTypes: Record<string, DayType> = {
    valarpirai: { name: 'Valarpirai', icon: 'waxing-crescent' },
    subhamuhurtham: { name: 'Subhamuhurtham', icon: 'om-star' },
    chaturti: { name: 'Chaturti', icon: 'lotus' },
    shasti_viradham: { name: 'Shasti Viradham', icon: 'lamp' },
    kirthigai: { name: 'Kirthigai', icon: 'sun' },
    womens_day: { name: 'Womens day', icon: 'flower' },
    ekhadashi: { name: 'Ekhadashi', icon: 'crescent-moon' },
    pradhosham: { name: 'Pradhosham', icon: 'group' },
    pournami: { name: 'Pournami', icon: 'full-moon' },
    sankatahara_chaturti: { name: 'Sankatahara Chaturti', icon: 'lotus' },
};

// Sample data - in a real app, this might come from an API or a more complex data structure
// This data is currently for any month, as the hook will filter by date number.
// For a more robust solution, each entry should have a month and year.
export const sampleAuspiciousDays: AuspiciousDay[] = [
    { type: 'valarpirai', date: 1 },
    { type: 'subhamuhurtham', date: 2 },
    { type: 'chaturti', date: 3 },
    { type: 'shasti_viradham', date: 4 },
    { type: 'kirthigai', date: 5 },
    { type: 'womens_day', date: 8 },
    { type: 'ekhadashi', date: 9 },
    { type: 'pradhosham', date: 10 },
    { type: 'pournami', date: 15 },
    // Added a few more for variety
    { type: 'sankatahara_chaturti', date: 18 },
    { type: 'subhamuhurtham', date: 22 },
    { type: 'kirthigai', date: 27 },
];
