export const mergeStatePortfolio =({oldState, newData})=>{
    if(oldState.length === 0 ){
        return [newData];
    }
    if(oldState.map(d=>d.name).includes(newData.name)){
    return oldState.map(d=>{
        if(d.name === newData.name){
            return {
                name:d.name,
                units: d.units+newData.units
            }
        }
        return d;
    });
  }
  return [...oldState, newData];
}