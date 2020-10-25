import React, { useState, useEffect } from 'react'
import Select from '../components/Select'

//most likely want to either cash these request or grab them on select
const MainContainer = () => {
  const [price, setPrice] = useState(null);
  const [left, setLeft] = useState('btc-bitcoin');
  const [right, setRight] = useState('eth-ethereum');
  const [coins, setCoins] = useState([]);

  useEffect( () => {
    const fetch1 = fetch('https://api.coinpaprika.com/v1/coins');
    const fetch2 = fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin');
    const fetch3 = fetch('https://api.coinpaprika.com/v1/tickers/eth-ethereum');
    const fetching = async(promises) => {
      try {
        const responses = await Promise.all(promises);
        const [newCoins, newLeft, newRight] = await Promise.all(responses.map( res => res.json()));
        const conversion = newLeft.quotes.USD.price / newRight.quotes.USD.price;
        console.log('conversion', conversion)
        setCoins(newCoins.filter( coin => coin.rank > 0 && coin.rank <= 20));
        setPrice(conversion);
      } catch (e) {
        console.log('error after mount', e)
      }
    }
    fetching([fetch1, fetch2, fetch3])
  }, []);

  useEffect( () => {
    console.log('useEffect for query')
    const query = async () => {
      try {
        const queryLeft = fetch(`https://api.coinpaprika.com/v1/tickers/${left}`);
        const queryRight = fetch(`https://api.coinpaprika.com/v1/tickers/${right}`);
        const coins = await Promise.all([queryLeft, queryRight]);
        const [newLeft, newRight] = await Promise.all(coins.map( coin => coin.json()));
        const conversion = newLeft.quotes.USD.price / newRight.quotes.USD.price;
        setPrice(conversion);
      } catch (e) {
        console.log('error fetching new query', e);
      }
    }
    query()
  }, [left, right]);

  const onSelect = (e) => {
    if(e.target.id === "left") setLeft(e.target.value);
    if(e.target.id === "right") setRight(e.target.value);
  }

  return (
  <main>
    <h1>Crypto Exchange Rates</h1>
    <Select id="left" options={coins} name="name" value="id" selected={left} onSelect={onSelect} />
    <Select id="right" options={coins} name="name" value="id" selected={right} onSelect={onSelect} />
    <h1>1 {left} = {price}{right}</h1>
  </main>  );
}

export default MainContainer;

// useEffect( () => {
//   if (checkNested(rate, "quotes", right, "price")) {
//     const results = getNested(rate, "quotes", right, "price").toFixed(2);
//     setExchange(`1 ${rate.name} = ${results} ${right}`)
//     setPrice(results)
//     console.log('results', results)
//   }
// }, [rate])
