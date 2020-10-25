import React, { useState, useEffect } from 'react'
import Select from '../components/Select'

//most likely want to either cash these request or grab them on select
const MainContainer = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({}) //{id: null, quotes: { ETH: {price: 0}}}
  const [price, setPrice] = useState(null)
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [coins, setCoins] = useState([{id: 'btc', name: 'Bitcoin'}, {id: 'eth', name: "Ethereum"}])

  
  // const url = `https://api.coinpaprika.com/v1/tickers/${left}?quotes=${right}`
  const url = `https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=ETH`
  //https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=BTC

  useEffect( () => {
    setLoading(!loading)
    const fetch1 = fetch('https://api.coinpaprika.com/v1/coins')
    const fetch2 = fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=ETH')
    const fetching = async(promises) => {
      Promise.all(promises)
      .then( async (responses) => {
        console.log('responses', responses)
        const coins = responses[0].json()
        const quote = responses[1].json()
        Promise.all([coins, quote])
          .then( bodies => {
            const topFive = bodies[0].slice(0,6)
            setCoins(topFive)
            console.log(bodies[1])
          })
      })
      .catch( err => console.log('error in promiseall', err))
    }
    fetching([fetch1, fetch2])
    
    // fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=ETH')
    //   .then( res => res.json())
    //   .then( data => setData(data))
    //   .catch( err  => console.log('err', err))
  }, [])

  useEffect( () => {
    const checkNested = (obj, level,  ...rest)  => {
      if (obj === undefined) return false
      if (rest.length == 0 && obj.hasOwnProperty(level)) return true
      return checkNested(obj[level], ...rest)
    }
    const getNested = (obj, ...args) => {
      return args.reduce((obj, level) => obj && obj[level], obj)
    }
    if (checkNested(data, "quotes", "ETH", "price")) {
      const results = getNested(data, "quotes", "ETH", "price");
      setPrice(results.toFixed(2))
      console.log('results', results)
    }
  }, [data])  

  const onSelect = (e) => {
    if(e.target.id === "left") setLeft(e.target.value);
    if(e.target.id === "right") setRight(e.target.value);
  }

  return loading ? <h1>Loading...</h1> : (
  <main>
    <Select id="left" options={coins} name="name" value="id" onSelect={onSelect} set="btc"/>
    <Select id="right" options={coins} name="name" value="id" onSelect={onSelect} set="eth"/>
    <h1>1 Bitcoin = {price} Ethereum</h1>
  </main>  );
}
 
export default MainContainer;

// const fetching = async () => {
//   setLoading(!loading)
//   const response = await fetch('https://api.coinpaprika.com/v1/coins')
//   const json = await response.json()
//   const top10 = json.slice(0, 9);
//   console.log('top10', top10)
//   const res = await fetch(url)
//   const jsonRes = await res.json()
//   // console.log('jsonRes',jsonRes)
//   setLeft(top10[0])
//   setRight(top10[0])
//   setTop10(top10.map( coin => <option key={coin.id}>{coin.name}</option>))
// }
// fetching()