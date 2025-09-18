export const makeBarChartData = ({rawData}) =>{
    const sortedRawData = rawData.sort((a,b)=> a.change-b.change);
    if(sortedRawData.length <=10){
        return sortedRawData;
    }
    //limiting data to the first five and last five 
    return [...sortedRawData.slice(0,5), ...sortedRawData.slice(sortedRawData.length-5, sortedRawData.length)];

}