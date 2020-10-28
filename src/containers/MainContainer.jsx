import React, { useState, useEffect } from 'react'
import SelectContainer from './SelectContainer';
import '../styles/MainContainer.css'
import Loading from '../components/Loading';

const DECIMAL_PLACES = 3

const MainContainer = () => {
  const [selects, setSelects] = useState(['btc-bitcoin', 'eth-ethereum'])
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true)
  const [exchange, setExchange] = useState('');

  const [selectLeft, selectRight] = selects;

  /*
  ** fetches the coin list from coinpaprika
  ** sets the coins state to the top10 list
  ** changes the loading state to false when coins come in
  */

  useEffect( () => {
    const fetching = async() => {
      try {
        const response = await fetch('https://api.coinpaprika.com/v1/coins');
        const newCoins = await response.json();
        setCoins(newCoins.filter( coin => coin.rank > 0 && coin.rank <= 10));
        setTimeout( () => {
          setLoading(false)
        }, 1000)
      } catch (e) {
        console.log('error after mount', e)
      }
    }
    fetching()
  }, []);

  /*
  ** queries the left and right selection when they change
  ** utilizes Promise.all to concurrently make fetch request as to not block each other
  ** convert the exchange via dimensional analysis with USD price
  ** sets the string rendered to UI
  */
  
  useEffect( () => {
    const query = async () => {
      try {
        const queryLeft = fetch(`https://api.coinpaprika.com/v1/tickers/${selectLeft}`);
        const queryRight = fetch(`https://api.coinpaprika.com/v1/tickers/${selectRight}`);
        const coins = await Promise.all([queryLeft, queryRight]);
        const [newLeft, newRight] = await Promise.all(coins.map( coin => coin.json()));
        const conversion = newLeft.quotes.USD.price / newRight.quotes.USD.price;
        setExchange(`1 ${newLeft.name} = ${conversion.toFixed(DECIMAL_PLACES)} ${newRight.name}`)
      } catch (e) {
        console.log('error fetching new query', e);
      }
    }
    query()
  }, [selectLeft, selectRight]);


  const onSelect = (e) => {
    if(e.target.id === "left") setSelects([e.target.value, selectRight])
    if(e.target.id === "right") setSelects([selectLeft, e.target.value])
  }

  const onReverse = () => {
    setSelects([selectRight, selectLeft]);
  }

  return loading ? <Loading />: (
    <main>
      <h1>Crypto Exchange</h1>
      <SelectContainer coins={coins} left={selectLeft} right={selectRight} onSelect={onSelect} />
      <button onClick={onReverse} >Reverse</button>
      <h3>{exchange}</h3>
      <h6>Powered by <a href='https://coinpaprika.com/'>CoinPaprika</a></h6>
    </main>
    );
}

export default MainContainer;




