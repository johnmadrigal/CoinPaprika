import React, { useState, useEffect } from 'react'
import Select from '../components/Select'

//most likely want to either cash these request or grab them on select
const MainContainer = () => {
  const [loading, setLoading] = useState(true)
  const [rate, setRate] = useState({}) //{id: null, quotes: { ETH: {price: 0}}}
  const [price, setPrice] = useState(null)
  const [left, setLeft] = useState('btc-bitcoin');
  const [right, setRight] = useState('ETH');
  const [coins, setCoins] = useState([])

  
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
            const topFive = bodies[0].slice(0,5)
            console.log('topfive', topFive)
            setCoins(topFive)
            setRate(bodies[1])
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
    if (checkNested(rate, "quotes", right, "price")) {
      const results = getNested(rate, "quotes", right, "price");
      setPrice(results.toFixed(2))
      console.log('results', results)
    }
  }, [rate])
  
  useEffect( () => {
    console.log('inside query useEffect')
    console.log('left', left)
    console.log('right', right)
    const query = async () => {
      try {
        const quote = await fetch(`https://api.coinpaprika.com/v1/tickers/${left}?quotes=${right}`)
        const rate = await quote.json()
        console.log('rate', rate)
        setRate(rate);

      } catch (e) {
        console.log('error fetching quote')
      }
    }
    query()
  }, [left, right])

  const onSelect = (e) => {
    console.log(e.target.value)
    if(e.target.id === "left") setLeft(e.target.value);
    if(e.target.id === "right") setRight(e.target.value);
  }

  return loading ? <h1>Loading...</h1> : (
  <main>
    <Select id="left" options={coins} name="name" value="id" selected={left} onSelect={onSelect} set="btc-bitcoin"/>
    <Select id="right" options={coins} name="name" value="symbol" selected={right} onSelect={onSelect} set="Ethereum"/>
    <h1>1 {left} = {price}{right}</h1>
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