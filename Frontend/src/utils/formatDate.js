export default function readableDateTime(ISOdate) {
    const options = {
        timeZone: "Asia/Kolkata",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    return new Date(ISOdate).toLocaleString('en-IN', options);
}