# Nathan Stock Portfolio Explorer

### Data Source 
1. [ S&P 500 Companies with Financial Information](https://datahub.io/core/s-and-p-500-companies)
2. [S&P 500 stock data Kaggle](https://www.kaggle.com/datasets/camnugent/sandp500)

Data for source 1 is left joined to data form source 2 

## Project Hosted At
[View Project Here]()

## Run Porject Optional
1. Clone Repo
2. npm i 
3. npm run dev

## Project OverView
This project allows a user to enter their stock portfolio and examine the balance of their holdings by both value and industry. This is important for understanding the level of risk being taken and for maximizing portfolio returns. Furthermore, a user can quickly see their best-performing and worst-performing stocks by percentage change across the data time period.

## AI Help 
1. Used AI to check grammar and spelling of copy in README and in the Visualization
2. Used AI to get VCC to actually worrk in this application as a Web Component. the instruction in the Documents was far from sufficient in getting the WEb Component to work. Both the import need to us `import { defineCustomElements } from '@visa/bar-chart/dist/loader';` and solving a race condition with Stencil using `const chartBar = document.createElement('bar-chart');    chartBar.id = 'myBarChart'; document.querySelector('#bar-chart-cont').appendChild(chartBar window.customElements.whenDefined('bar-chart').then(()` wher enot documented in VCC and I realide on ChatGPT to get the componet to actually work in Vite.


## Further Improvements Not Done due to time constraints
1. adding target return line to barchart
2. adding group color for good preforming and bad preforming (red/blue) stocks above/below a target return
3. adding an option to treemap allowing stocks to be colored by percant change return instead of industry
4. additional a11y updates
5. unit test