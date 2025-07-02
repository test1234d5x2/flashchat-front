export default function convertDateSubtractionToTimeAgo(dateSubtraction: number) {
    const minutes = Math.floor(dateSubtraction / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (weeks > 0) {
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? "1h" : `${hours}h`;
    } else if (minutes > 0) {
        return minutes === 1 ? "1m" : `${minutes}m`;
    } else {
        return "just now";
    }
}