import React from 'react';

const Select = (props) => {
  const { id, options, value, name, set, onSelect } = props;
  const selections = options.map( (option) => {
    if(option[value] === set) return <option id={option[name]} value={option[value]} selected>{option[name]}</option>
    return <option id={option[name]} value={option[value]} >{option[name]}</option>
  })
  
  return (
    <select id={id} onChange={onSelect}>
      {selections}
    </select>
    );
}
 
export default Select;