

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