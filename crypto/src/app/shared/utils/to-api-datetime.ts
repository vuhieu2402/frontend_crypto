import { format } from 'date-fns';

export function formatToApiDate(date: Date | null, endOfDay: boolean = false): string | null {
    if (!date) return null;

    const adjustedDate = new Date(date);

    if (endOfDay) {
        adjustedDate.setHours(23, 59, 59, 999); // End of the day
    } else {
        adjustedDate.setHours(0, 0, 0, 0); // Start of the day
    }

    // Format date in local timezone
    return format(adjustedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
}
