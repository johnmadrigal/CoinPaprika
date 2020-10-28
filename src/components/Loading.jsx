import React from 'react';
import Spinner from '../assets/BeanEater.svg'

const Loading = () => {
  return (
    <div>
      <img src={Spinner} alt='Loading...' />
    </div>
    );
}
 
export default Loading