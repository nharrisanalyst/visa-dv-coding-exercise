import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { app } from './app.js'

document.querySelector('#app').innerHTML = `
  <div>
  <p>
   <form id="stock-input">
   <label for="stock-select">Choose a Stock:</label>
    <select id="stock-select"> 
    </select>
    <label for="stock-select">How Many Units:</label>
    <input id="stock-units" type="number" />
    <button type="submit" value=""> Add Stock </button>
   </form>
   <div id="stock-list"></div>
   <div id="stock-treemap"></div><div id="stock-bumbell"></div>
   </p>
  </div>
`
app(document.querySelector('#stock-treemap'),document.querySelector('#stock-bumbell'),  document.querySelector('#stock-input'), document.querySelector('#stock-select'))
//setupCounter(document.querySelector('#counter'))
