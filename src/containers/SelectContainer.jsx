import React from 'react';
import Select from '../components/Select';
import '../styles/SelectContainer.css'

const SelectContainer = ({ coins, left, right, onSelect }) => {
  return (
    <div className="select">
      <Select id="left" options={coins} value="id" display="name" selected={left} onSelect={onSelect} disable={right}/>
      <Select id="right" options={coins} value="id" display="name" selected={right} onSelect={onSelect} disable={left}/>
    </div>
    );
}
 
export default SelectContainer;