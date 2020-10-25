import React from 'react';

const Select = (props) => {
  const { id, options, value, name, selected, disable, onSelect } = props;
  const selections = options.map( (option) => {
    if (option[value] === disable) {
      console.log('option[value]', option[value])
      return
    }
    return <option key={option[id]} id={option[name]} value={option[value]}>{option[name]}</option>
  })
  
  return (
    <select id={id} onChange={onSelect} value={selected}>
      {selections}
    </select>
    );
}
 
export default Select;