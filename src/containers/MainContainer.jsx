import React, { useState, useEffect } from 'react'

const MainContainer = () => {
  const [top10Coins, setTop10] = useState([])
  const [left, setLeft] = useState(null)
  const [right, setRight] = useState(null)
  const [data, setData] = useState([]);
  
  useEffect( () => {
    const fetching = async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins')
      const json = await response.json()
      const top10 = json.slice(0, 9);
      setLeft(top10[0].name)
      setRight(top10[0].name)
      setTop10(top10.map( coin => <option key={coin.id}>{coin.name}</option>))
    }
    fetching()
  }, [])

  const onSelect = (e) => {
    if(e.target.id === "left") setLeft(e.target.value) 
    if(e.target.id === "right") setRight(e.target.value) 
    console.log('toggle select', e.target.id)
  }

  console.log('left', left)

  return (
  <main>
    <select id="left" onChange={onSelect}>
      {top10Coins}
    </select>
    <select id="right" onChange={onSelect}>
      {top10Coins}
    </select>
    <h1>1 {left} = {right}</h1>
  </main>  );
}
 
export default MainContainer;