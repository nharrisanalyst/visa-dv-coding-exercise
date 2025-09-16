import { select } from "d3-selection";

//data
//data:Array({
//  name:String;
//  units:Number;
// price:Number;
// })
//el


export const stockComponentList = ({data, el })=>{
    const list = select(el);
    list.selectAll('li').remove();
    if(data.length === zero || !data){
        list.append('li').html('<h2> Use the Form to Add Stock to your Portfolio. </h2>')
    }
    
    list.append('ul').selectAll('li').data(data).join('li').text(`&${name} units:${units} price:${price} value:${units*price}`);
}