import React from 'react';
import '../styles/Select.css'

/*
** To disable selection between select components, 
** instead of using disabling attribute for select,
** decided to use conditional to reduce out the selection for better UI
*/

const Select = (props) => {
  const { id, options, value, display, selected, disable, onSelect } = props;

  const selections = options.reduce( (acc, option) => {
    if (option[value] !== disable) {
      acc.push(
        <option key={option.id + id} value={option[value]}>{option[display]}</option>)
      }
    return acc
  },[])
  
  return (
    <select id={id} onChange={onSelect} value={selected}>
      {selections}
    </select>
    );
}
 
export default Select;