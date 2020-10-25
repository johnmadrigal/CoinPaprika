import React, { useState, useEffect } from 'react'
import SelectContainer from './SelectContainer';
import '../styles/MainContainer.css'

const MainContainer = () => {
  const [selects, setSelects] = useState(['btc-bitcoin', 'eth-ethereum'])
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true)
  const [exchange, setExchange] = useState('');

  const [selectLeft, selectRight] = selects;

  useEffect( () => {
    console.log('trigger initial fetch')
    const fetching = async() => {
      try {
        const fetch1 = fetch('https://api.coinpaprika.com/v1/coins');
        const fetch2 = fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin');
        const fetch3 = fetch('https://api.coinpaprika.com/v1/tickers/eth-ethereum');
        const responses = await Promise.all([fetch1, fetch2, fetch3]);
        const [newCoins, newLeft, newRight] = await Promise.all(responses.map( res => res.json()));
        const conversion = newLeft.quotes.USD.price / newRight.quotes.USD.price;
        setCoins(newCoins.filter( coin => coin.rank > 0 && coin.rank <= 10));
        setExchange(`1 ${newLeft.name} = ${conversion.toFixed(2)} ${newRight.name}`)
      } catch (e) {
        console.log('error after mount', e)
      }
    }
    fetching()
  }, []);

  useEffect( () => {
    console.log('trigger loading')
    setLoading(false)
  }, [coins])

  useEffect( () => {
    console.log('useEffect for query')
    const query = async () => {
      try {
        const queryLeft = fetch(`https://api.coinpaprika.com/v1/tickers/${selectLeft}`);
        const queryRight = fetch(`https://api.coinpaprika.com/v1/tickers/${selectRight}`);
        const coins = await Promise.all([queryLeft, queryRight]);
        const [newLeft, newRight] = await Promise.all(coins.map( coin => coin.json()));
        const conversion = newLeft.quotes.USD.price / newRight.quotes.USD.price;
        setExchange(`1 ${newLeft.name} = ${conversion.toFixed(2)} ${newRight.name}`)
      } catch (e) {
        console.log('error fetching new query', e);
      }
    }
    query()
  }, [selects]);

  const onSelect = (e) => {
    if(e.target.id === "left") {
      setSelects([e.target.value, selectRight])
    }
    if(e.target.id === "right") {
      setSelects([selectLeft, e.target.value])
    }
  }

  const onReverse = () => {
    console.log('clicked')
    setSelects([selectRight, selectLeft]);
  }

  return loading ? <h1>Loading...</h1> : (
  <main>
    <h1>Crypto Exchange</h1>
    <SelectContainer coins={coins} left={selectLeft} right={selectRight} onSelect={onSelect} />
    <button onClick={onReverse} >Reverse</button>
    <h3>{exchange}</h3>
    <h6>Powered by <a href='https://coinpaprika.com/'>CoinPaprika</a></h6>
  </main>  );
}

export default MainContainer;


