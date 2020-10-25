import React from 'react';

const Select = (props) => {
  const { id, options, value, name, set, selected, onSelect } = props;
  const selections = options.map( (option) => {
    if(option[name] === set) return <option key={option[id]} id={option[name]} value={option[value]} >{option[name]}</option>
    return <option key={option[id]} id={option[name]} value={option[value]} >{option[name]}</option>
  })
  
  return (
    <select id={id} onChange={onSelect} value={selected} defaultValue={set}>
      {selections}
    </select>
    );
}
 
export default Select;