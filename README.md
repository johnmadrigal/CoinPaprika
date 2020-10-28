React App to Compare Exchange Rates between Cryptocurrency via CoinPaprika API

Start
npm start

Test
npm test

Added Feature:
- reverse button to switch between coins
  - since decimal place if fixed to 2, there are coins perceived rate of 1 = 0.00
  - can be fixed by giving users a slider/field to change decimal places

Future Optimizations:
- cache previously queried coins to reduce API request
  - chose to not implement to create up-to-minute snapshot of exchange 
- debounce on reverse button to reduce API calls
  - would be a non-issue if cache is implemented