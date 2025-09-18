import { csv } from "d3-fetch"
import { select } from "d3-selection";
import {makeCategoriesMap, makeHire, openClose, percentChange} from './data_manipulation/make_hire'
import { mergeStatePortfolio } from "./data_manipulation/mergeStatePortfolio.js";
import { chartAndListData } from "./data_manipulation/chartAndListData.js";
import { makeBarChartData } from "./data_manipulation/makeBarChartData.js";
import { selectCom } from "./components/selectCom.js";
import { setBarChartData } from "./components/setBarChart.js";
import {stockComponentList} from './components/stockComp.js'
import Treemap from './treemap.js';

export const app = async(chart_one_elm, chart_two_elm, form_elm, select_elm, stock_list_elm, chartBar) => {
    //loading Data
    let stock_data = await csv('data/stock_data/all_stocks_5yr.csv');
    const stock_segment = await csv('data/stock_segment/stock_SP_2025.csv')

    //Data Wrangling
    const stockNames = stock_segment.map(s=> s.Symbol);
    stock_data = stock_data.filter(d=> stockNames.includes(d.Name)) //unique stock names
    const stock_data_names = new Set(stock_data.map(d=>d.Name))
    const cat_map = makeCategoriesMap(stock_segment,'Symbol', 'GICS Sector');
    const unique_cat = new Set([...cat_map.values()].sort())
    const openCloseData = openClose(stock_data); // make data of all stocks starting and closing value
    const fullData = percentChange({data:openCloseData}); // calculating the percentage change of each stock

    //init Treechart
    const treeChart = new Treemap({height:900,width:900,el:chart_one_elm, cats:unique_cat});

    //set form select options
    selectCom({el:select_elm, values:stock_data_names})

    const form = select(form_elm)

    //initial app Portfolio [empty]
    let statePortfolio = [];
    //init stock list component;
    stockComponentList({data:[], el:stock_list_elm});

    //update app on stock input
    form.on('submit', (e)=>{
        e.preventDefault();
        const stockNameEl = document.getElementById('stock-select');
        const unitsEl = document.getElementById('stock-units');
        
        const stockName = stockNameEl.value;
        const units = parseInt(unitsEl.value);

        if(!units){
            return;
        }

        const stockDataItem = {name:stockName, units:units};
        statePortfolio = mergeStatePortfolio({oldState:statePortfolio,newData:stockDataItem});
        const chartListData = chartAndListData({appState:statePortfolio, openCloseData: openCloseData});

        //interactive elements 
        stockComponentList({data:chartListData, el:stock_list_elm});

        const treeMapData = makeHire({cat:unique_cat, data:chartListData, map:cat_map})
        const barChartData = makeBarChartData({rawData:chartListData});

        treeChart.render({data:treeMapData});
        setBarChartData({chart:chartBar, data:barChartData})

    })

    //init application
    const initStatePortfolio = Array.from(stock_data_names).map(s=>({name:s, units:1}));
    const initChartListData = chartAndListData({appState:initStatePortfolio, openCloseData: openCloseData});
    const treeMapData = makeHire({cat:unique_cat, data:initChartListData , map:cat_map})
    const barChartData = makeBarChartData({rawData:initChartListData });
    treeChart.render({data:treeMapData});
    setBarChartData({chart:chartBar, data:barChartData})
}