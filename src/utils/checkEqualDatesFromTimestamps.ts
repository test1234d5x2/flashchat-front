export default function checkEqualDatesFromTimestamps(t1: string, t2: string): boolean {
    return new Date(t1).getDate() !== new Date(t2).getDate()
}