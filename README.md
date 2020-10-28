<h1>React App to Compare Exchange Rates between Cryptocurrency via CoinPaprika API</h1>

<h3>Start</h3>
<p>npm start</p>

<h3>Test</h3>
<p>npm test</p>

<h3>Added Feature:</h3>
- reverse button to switch between coins
  - since decimal place if fixed to 2, there are coins perceived rate of 1 = 0.00
  - can be fixed by giving users a slider/field to change decimal places

<h3>Future Optimizations:</h3>
- cache previously queried coins to reduce API request
  - chose to not implement to create up-to-minute snapshot of exchange 
- debounce on reverse button to reduce API calls
  - would be a non-issue if cache is implemented
