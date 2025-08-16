function parseDate(date: string){
    const [day,month,year] = date.split('/').map(Number);
    return new Date(year,month-1,day);

}

function calculateDateDiff(fromDate: string,toDate: string){
    const from = parseDate(fromDate);
    const to = parseDate(toDate);
    const diff = to.getTime() - from.getTime();
    //convert the result from miliseconds to days
    return diff/(1000*60*60*24);
}

const date1 = '20/01/2023';
const date2 = '20/05/2023';
console.log(`The distance is ${calculateDateDiff(date1,date2)} days`)