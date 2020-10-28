import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';

import App from '../App'
import MainContainer from '../containers/MainContainer'
import Select from '../components/Select'
import Loading from '../components/Loading'




configure({ adapter: new Adapter() });

describe('renders without crashing', () => {

  it('App', () => {
    mount(<App />);
   });
});

describe('<MainContainer />', () => {
  
  it('renders a <Loading /> at first', async () => {
    const wrapper = shallow(<MainContainer />);
    expect(wrapper.type()).toEqual(Loading);
  });

})

describe('<Select />' , () => {
  let wrapper;
  const selectProps = {
    options: [{ id: "BTH", name: "Bitcoin" }, { id: "ETH", name: "Ethereum"}, { id: "USDT", name: "Tether"} ],
    id: "id",
    value: "name",
    name: "name",
    selected: "Bitcoin",
    disable: "Ethereum",
    onSelect: function () {
      return 'selected'
    }
  }

  beforeAll(() => {
    wrapper = shallow(<Select {...selectProps} />);
  });

  it('renders <select> component', () => {
    expect(wrapper.is('select')).toBe(true);
  });

})


// it('renders a <main> after mounting', () => {
//   const wrapper = mount(<App/>);
//   expect(wrapper.mount()).toBe(true);
// });

// it('renders <h1> component', () => {
//   // const wrapper = shallow(<MainContainer />);
//   // expect(wrapper.contains(<h1/>)).toBe(true);
//   const wrapper = shallow(<div className="some-class other-class" />);
//   expect(wrapper.is('div')).toBe(true);
// });