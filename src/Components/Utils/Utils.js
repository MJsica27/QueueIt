

export function capitalizeFirstLetter(text){
    return text.charAt(0).toUpperCase()+text.slice(1);
}

export function capitalizeText(text){
    return text.toUpperCase();
}

export function sortArrayBasedQueueingTime(combinedTeams){
    return combinedTeams.sort((a, b) => {
        const timeA = a.queueingTimeStart.split(':').map(Number);
        const timeB = b.queueingTimeStart.split(':').map(Number);

        const totalSecondsA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2];
        const totalSecondsB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2];

        return totalSecondsA - totalSecondsB; // Ascending order
    });
}

export function convertToTime(expirationTime){
    if(expirationTime){
        console.log(expirationTime)
        const time = expirationTime.split(':').map(Number);
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        const baseTimestamp = date.getTime();
        const mills = (time[0] * 60 * 60 * 1000) + (time[1] * 60 * 1000) + (time[2] * 1000);
        const expirationTimestamp = baseTimestamp + mills;
        return expirationTimestamp;
    }
}

export function millisecondsToHMS(milliseconds, setDifference) {
    if(milliseconds){
        // Calculate total seconds
        const totalSeconds = Math.floor(milliseconds  - Date.now());
        
        // Calculate hours, minutes, and seconds
        const hours = Math.floor(totalSeconds / 3600000);
        const minutes = Math.floor((totalSeconds % 3600000) / 60000);
        const seconds = Math.floor((totalSeconds % 60000)/1000);

        // Format to HH:MM:SS
        const formattedTime = [
            String(hours).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(seconds).padStart(2, '0')
        ].join(':');
        setDifference(formattedTime);
    }
}

export function millisecondsToHMSAscending(milliseconds, setDifference){
    if(milliseconds){
        // Calculate total seconds
        const totalSeconds = Math.floor(milliseconds  + Date.now());
        
        // Calculate hours, minutes, and seconds
        const hours = Math.floor(totalSeconds / 3600000);
        const minutes = Math.floor((totalSeconds % 3600000) / 60000);
        const seconds = Math.floor((totalSeconds % 60000)/1000);

        // Format to HH:MM:SS
        const formattedTime = [
            String(hours).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(seconds).padStart(2, '0')
        ].join(':');
        setDifference(formattedTime);
    }
}