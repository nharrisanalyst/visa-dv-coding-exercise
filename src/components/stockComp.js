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
    if(data.length === 0 || !data){
        list.append('li').html('<h2> Use the Form to Add Stock to your Portfolio. </h2>')

    }else{
    
    list.append('ul').selectAll('li').data(data).join('li').html(d=>`<b>${d.name}</b> <b>units:</b> ${d.units} <b>price</b>: ${d.price} <b>value:</b> ${d.units*d.price}`);
    }
}