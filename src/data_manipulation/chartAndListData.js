export const chartAndListData = ({appState, openCloseData}) =>{
    const newData = appState.map(d=>{
        return{
            name:d.name,
            units:d.units,
            price:openCloseData[d.name].close.value,
            change:openCloseData[d.name].change
        }
    })
    return newData;
}