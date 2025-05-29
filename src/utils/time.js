// ex) 2025.05.28 13:45
export function formatDate(inputDate) {
    const date = new Date(inputDate); // 문자열을 Date 객체로 변환
    
    const year    = date.getFullYear();
    const month   = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 값이 0부터 시작하므로 +1
    const day     = String(date.getDate()).padStart(2, '0');
    const hours   = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// ex) 05-28 13:45:22
export function formatDateTimeShort(datetime) {
    const [date, time] = datetime.split(" ");
    const monthDay     = date.slice(5); // YYYY-MM-DD → MM-DD

    return `${monthDay} ${time}`;
}
