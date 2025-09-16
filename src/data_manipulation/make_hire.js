import { stratify } from "d3-hierarchy";

export const makeHire =({cat, data, map})=>{
    
    const catObject = {}
    cat.forEach(c=>{
        catObject[c]=[];
    })
    data.forEach(d=>{
        const cat = map.get(d.name);
        if(catObject[cat]){
        catObject[cat].push({
            name:d.name,
            value:d.change,
        })
        }
    })


   const root ={
    name:'stocks',
    children:catObject
   }
   return root;
}

export const makeCategoriesMap =(data, stock_key, cat_key)=>{
    const map = new Map();
    data.forEach(d=>{
        map.set(d[stock_key], d[cat_key]);
    })
    return map;
}


export const openClose =(data)=>{
    const openCloseData ={};
    data.forEach(d=>{
        if(!openCloseData[d.Name]){
            openCloseData[d.Name]={
                open:{
                    date:d.date,
                    value:parseFloat(d.open)
                },
                close:{
                    date:d.date,
                    value:parseFloat(d.close)
                }
            }
        }
        else if(new Date(openCloseData[d.Name].open.date) > new Date(d.date)){
            openCloseData[d.Name].open ={
                date:d.date,
                value:parseFloat(d.open)
            }
        }
        else if(new Date(openCloseData[d.Name].open.date) < new Date(d.date)){
            openCloseData[d.Name].close ={
                date:d.date,
                value:parseFloat(d.open)
            }
        }
    })
    return openCloseData;
}

export const percentChange=({data})=>{
    const dataArr = [];
    Object.keys(data).forEach((key)=>{
        const open = data[key].open.value;
        const close = data[key].close.value;
        data[key]['change'] = ((close-open)/open)*100;
        data[key]['name'] = key;
        dataArr.push(data[key])
    })
   return dataArr;
}