import React from 'react';
import Landing from '../';
import { mount, shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Should render Landing correctly', () => {
  const tree = mount(<Landing />);

  expect(tree).toMatchSnapshot();
});

test('should handle input initial currency', () => {
  const tree = mount (<Landing/>);

  tree.find('.currency-value').simulate('change', {
    target: {
      name: 'initialValue',
      value: '123'
    }
  });

  tree.find('.currency-value').simulate('change', {
    target: {
      name: 'initialValue',
      value: ''
    }
  });

  tree.find('.currency-value').simulate('change', {
    target: {
      name: 'initialValue',
      value: 'a'
    }
  });
});

test('should handle target currency', () => {
  const tree = mount (<Landing/>);

  tree.setState({
    rates: {
      IDR: 1241321
    },
    loading: false,
    selectedCurrency: {
      label: 'IDR',
      value: 'IDR'
    }
  });

  tree.find('.new-currency-submit-btn').simulate('click');

  tree.find('.target-currency-btn-container').at(0).simulate('click');
});

test('Should handle after data loaded', () => {
  const tree = shallow(<Landing/>);

  tree.setState({
    rates: {
      IDR: 1241321
    },
    loading: false
  });

  tree.setState({
    selectedCurrency: {
      label: 'IDR',
      value: 'IDR'
    },
    targetCurrencyList: [],
  });
});