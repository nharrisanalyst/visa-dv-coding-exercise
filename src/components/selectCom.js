import {select} from "d3-selection";

export const selectCom=({el, values})=>{
    const selectHTML = select(el)
    selectHTML.selectAll('option').data(values).join('option').attr('value', d=>d).text(d=>d)
}