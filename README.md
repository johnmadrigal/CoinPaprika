<h1>React App to Compare Exchange Rates between Cryptocurrencies via CoinPaprika API</h1>

<h3>Start</h3>
<p>npm start</p>

<h3>Test</h3>
<p>npm test</p>

<h3>Added Feature:</h3>
<ul>
<li>reverse button to switch between coins
  <ul>
    <li>since decimal place if fixed to 2, there are coins perceived rate of 1 = 0.00</li>
    <li>can be fixed by giving users a slider/field to change decimal places</li>
  </ul>
</li>
</ul>

<h3>Future Optimizations:</h3>
<ul>
<li>cache previously queried coins to reduce API request
  <ul>
  <li>chose to not implement to create up-to-minute snapshot of exchange </li>
  </ul>
</li>
<li>debounce on reverse button to reduce API calls
  <ul></li>would be a non-issue if cache is implemented</li>
  </ul>
</li>  
</ul>
