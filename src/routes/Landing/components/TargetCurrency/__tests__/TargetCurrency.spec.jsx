import React from 'react';
import TargetCurrency from '../';
import { mount } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const props = {
  baseCurrency: 'USD',
  targetCurrencyList: ['IDR'],
  initialValue: 10,
  rates: {
    IDR: 14491
  },
  handleDeleteTargetCurrency: jest.fn()
};

test('Should render TargetCurrency correctly', () => {
  const tree = mount(<TargetCurrency {...props}/>);
  
  expect(tree).toMatchSnapshot();
});
