export const dateStringToFormatOne = (d:string): string => {
    let dateObj = new Date(d)
    return !isNaN(dateObj.getTime()) && d !== "0001-01-01T00:00:00Z" ? `${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getDate()}, ${dateObj.getFullYear()}`:""
}