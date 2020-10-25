import React from 'react';
import '../styles/Select.css'

const Select = (props) => {
  const { id, options, value, name, selected, disable, onSelect } = props;
  const selections = options.map( (option) => {
    if (option[value] !== disable) {
      return (<option
        key={option.id + id} 
        id={option[name]} 
        value={option[value]}>
          {option[name]}
          </option>
      )}
  })
  
  return (
    <select id={id} onChange={onSelect} value={selected}>
      {selections}
    </select>
    );
}
 
export default Select;