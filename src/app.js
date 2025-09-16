import { csv } from "d3-fetch"
import { select } from "d3-selection";
import {makeCategoriesMap, makeHire, openClose, percentChange} from './data_manipulation/make_hire'
import { mergeStatePortfolio } from "./data_manipulation/mergeStatePortfolio.js";
import { chartAndListData } from "./data_manipulation/chartAndListData.js";
import { selectCom } from "./components/selectCom.js";
import {stockComponentList} from './components/stockComp.js'
import Treemap from './treemap.js';

export const app = async(chart_one_elm, chart_two_elm, form_elm, select_elm, stock_list_elm) => {
    console.log('hello world')
    let stock_data = await csv('/data/stock_data/all_stocks_5yr.csv');
    const stock_segment = await csv('data/stock_segment/stock_SP_2025.csv')
    const stockNames = stock_segment.map(s=> s.Symbol);
    stock_data = stock_data.filter(d=> stockNames.includes(d.Name))
    const stock_data_names = new Set(stock_data.map(d=>d.Name))

    console.log(stock_data_names, 'stock data names');
   
    console.log(stock_data, 'this is some data');
    console.log(stock_segment, 'this is some data too');
    const cat_map = makeCategoriesMap(stock_segment,'Symbol', 'GICS Sector');
    const unique_cat = new Set([...cat_map.values()].sort())
    console.log(cat_map, 'map', unique_cat)
    const openCloseData = openClose(stock_data);
    console.log(openCloseData, 'this is the open close data');
    const fullData = percentChange({data:openCloseData});
    console.log(fullData, 'this is the open close data');
    const hire_data = makeHire({cat:unique_cat, data:fullData, map:cat_map})
    console.log(hire_data);

    const treeChart = new Treemap({height:900,width:900,el:chart_one_elm});

    selectCom({el:select_elm, values:stock_data_names})

    const form = select(form_elm)
    console.log('form', form);
    let statePortfolio = [];
    //init stock list component;
    stockComponentList({data:[], el:stock_list_elm});
    let i = 1;
    form.on('submit', (e)=>{
        e.preventDefault();
        const stockNameEl = document.getElementById('stock-select');
        const unitsEl = document.getElementById('stock-units');
        
        const stockName = stockNameEl.value;
        const units = parseInt(unitsEl.value);
        const stockDataItem = {name:stockName, units:units};
        statePortfolio = mergeStatePortfolio({oldState:statePortfolio,newData:stockDataItem});
        const chartListData = chartAndListData({appState:statePortfolio, openCloseData: openCloseData});

        console.log(chartListData, i++);

        //interactive elements 
        stockComponentList({data:chartListData, el:stock_list_elm});
    
    })
    
        
}