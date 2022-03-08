
export function getObjectDate(stringDate){

    let date = stringDate.slice(0,10).split( "-" , 3);

    return {day: parseInt(date[2]), month: parseInt(date[1]), year: parseInt(date[0])}

}

export function getStringDate(objectDate){

    return objectDate.year + "-" + objectDate.month + "-"  + objectDate.day;

}