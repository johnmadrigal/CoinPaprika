import React from 'react';
import Select from '../components/Select';
import '../styles/SelectContainer.css'

const SelectContainer = (props) => {
  const { coins, left, right, onSelect } = props;
  return (
    <div className="select">
      <Select id="left" options={coins} name="name" value="id" selected={left} onSelect={onSelect} disable={right}/>
      <Select id="right" options={coins} name="name" value="id" selected={right} onSelect={onSelect} disable={left}/>
    </div>
    );
}
 
export default SelectContainer;