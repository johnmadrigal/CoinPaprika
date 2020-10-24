import React, { useState, useEffect } from 'react'

//most likely want to either cash these request or grab them on select
const MainContainer = () => {
  const [loading, setLoading] = useState(true)
  const [top10Coins, setTop10] = useState([])
  const [tickers, setTickers] = useState([])
  const [left, setLeft] = useState(null)
  const [right, setRight] = useState(null)
  const [data, setData] = useState({}) //{id: null, quotes: { ETH: {price: 0}}}
  const [price, setPrice] = useState(null)
  
  // const url = `https://api.coinpaprika.com/v1/tickers/${left}?quotes=${right}`
  const url = `https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=ETH`
  //https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=BTC
  useEffect( () => {
    const fetching = async () => {
      setLoading(!loading)
      const response = await fetch('https://api.coinpaprika.com/v1/coins')
      const json = await response.json()
      const top10 = json.slice(0, 9);
      console.log('top10', top10)
      const res = await fetch(url)
      const jsonRes = await res.json()
      // console.log('jsonRes',jsonRes)
      setLeft(top10[0])
      setRight(top10[0])
      setTop10(top10.map( coin => <option key={coin.id}>{coin.name}</option>))
    }
    // fetching()
    setLoading(!loading)
    fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=ETH')
      .then( res => res.json())
      .then( data => setData(data))
      .catch( err  => console.log('err', err))
  }, [])

  const checkNested = (obj, level,  ...rest)  => {
    if (obj === undefined) return false
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true
    return checkNested(obj[level], ...rest)
  }

  const getNested = (obj, ...args) => {
    return args.reduce((obj, level) => obj && obj[level], obj)
  }

  useEffect( () => {
    console.log('trigger data useeffect')
    if (checkNested(data, "quotes", "ETH", "price")) {
      const results = getNested(data, "quotes", "ETH", "price");
      setPrice(results)
      console.log('results', results)
    }
    // try{
    //   const test = data.quotes
    //   console.log(data.quotes)
    // } catch (e) {
    //   console.log('error in useEffect nesting', e)
    // }
  }, [data])

  

  const onSelect = (e) => {
    if(e.target.id === "left") setLeft(e.target.value);
    if(e.target.id === "right") setRight(e.target.value);
  }


  return loading ? <h1>Loading...</h1> : (
  <main>
    <select id="left" onChange={onSelect}>
      {/* {top10Coins} */}
      <option value="Bitcoin">Bitcoin</option>
    </select>
    <select id="right" onChange={onSelect}>
      {/* {top10Coins} */}
      <option value="Bitcoin">Ethereum</option>
    </select>
    <h1>1 Bitcoin = {price} Ethereum</h1>
  </main>  );
}
 
export default MainContainer;