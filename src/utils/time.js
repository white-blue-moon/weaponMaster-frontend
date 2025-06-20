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

export function getFormattedEndTime(dateStr) {
    const date    = new Date(dateStr);
    let   hours   = date.getHours();
    const minutes = date.getMinutes();

    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0이면 12로 변환 (12AM, 12PM)

    // 두 자리수로 만들기 위해 0 채움
    const formatHours   = hours   < 10 ? `0${hours}`   : `${hours}`;
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return { 
        amPm:    amPm, 
        hours:   formatHours, 
        minutes: formatMinutes, 
    };
}
