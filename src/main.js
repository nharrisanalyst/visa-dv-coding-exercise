import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { app } from './app.js'
import { defineCustomElements } from '@visa/bar-chart/dist/loader';
import { setBarChart } from './components/setBarChart.js';


defineCustomElements()

document.querySelector('#app').innerHTML = `
  <div class="myApp">
  <h1>Nathan Harris Portfolio Explorer</h1>
  <h4> The Application is initialized with every stock in the s and p 500 </h4>
  <h4> Use the input to &nbsp;<b> A. Pick a Stock</b>&nbsp; <b> B. Enter how many units</b>&nbsp;<b> C. Add Stock to your Portfolio</b>
  <p style="border-bottom:1px solid black; padding-bottom: 15px; margin-bottom:65px;">
    This interactive application allows you to view your stock portfolio through two distinct data visualizations. The Treemap on the left displays your portfolio sized by each stock’s value and grouped or colored by industry. The Bar Chart on the right highlights the top five best performing and bottom five worst performing stocks based on percentage change over the selected timeline, making it easy to quickly identify which stocks are having the greatest impact on your portfolio.
  </P>
  <div class="interactive">
   <form id="stock-input">
   <label for="stock-select">Choose a Stock:</label>
    <select id="stock-select"> 
    </select>
    <label for="stock-select">How Many Units:</label>
    <input id="stock-units" type="number" />
    <button type="submit" value=""> Add Stock </button>
   </form>

   <div id="stock-list"></div>
   <div  tabindex="0"  id="stock-tree-cont" aria-describedby="treemap data visualization">
   <h2 class"treemap-main-title">
    Stock Portfolio Grrouped by Industry displaying Value
   </h2> 
   
   <div aria-describedby="treemap data visualization chart" alt="treemap data visualization" id="stock-treemap"></div>
   <div aria-describedby="treemap legend" alt="treemap legend" id="tree-legend"></div>
   </div>
   <div id="bar-chart-cont"></div>
   </div>
  </div>
`
const chartBar = document.createElement('bar-chart');
chartBar.id = 'myBarChart';
document.querySelector('#bar-chart-cont').appendChild(chartBar);


window.customElements.whenDefined('bar-chart').then(() => {
  console.log('ahvcdlahcildahsfjahfdjshfkajldhfsklhdaslf')
const chartBar = document.querySelector('#myBarChart');

setBarChart({chart:chartBar, 
              title:"Top Preforming and Worse Preforming Stocks", 
              subTitle:"Chart is Limited to the 5 best and 5 worst preforming stocks", 
              data:[],
              yAxis: {
                "label": "Total Return Growth"
            },
              ordinalAccessor:"name", valueAccessor:"change", height:650, width:500, 
              accessibility:{longDescription: 'Stock portfolio Min and Max stocks limit ten',
                              executiveSummary: 'min max stocks'
                            }})

app(document.querySelector('#stock-treemap'),document.querySelector('#stock-bumbell'),  document.querySelector('#stock-input'), document.querySelector('#stock-select'),document.querySelector('#stock-list'),chartBar)

                          
})

//setupCounter(document.querySelector('#counter'))

