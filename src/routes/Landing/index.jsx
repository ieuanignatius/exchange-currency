import React, { Component } from 'react';
import Select from 'react-select';

import TargetCurrency from './components/TargetCurrency';

import { getUSDRates } from '../../models';

import './style.scss';

//thanks to (https://openexchangerates.org/api/currencies.json)
import currencyNameList from './currencyAbbreviationList';


class Landing extends Component {
  state = {
    baseCurrency: 'USD',
    selectedCurrency: null,
    targetCurrencyList: [],
    initialValue: 10,
    rates: {},
    loading: true
  };

  componentDidMount(){
    /*istanbul ignore next*/
    getUSDRates().then(res => {
      const { data } = res;
      const { base, rates } = data;

      this.setState({
        baseCurrency: base,
        rates,
        loading: false,
      });
    }).catch((e) => {
      console.error(e);
      this.setState({
        loading: false
      });
    });
  }

  handleChangeValue(e){
    const { target } = e;
    const { name, value } = target;
    const isNumber = /[0-9.]+$/gi.test(value);

    if(isNumber || value === ''){
      this.setState({
        [name]: parseInt(value, 10) || 0
      });
    }
  }

  /*istanbul ignore next*/
  handleSelectCurrency(e){
    this.setState({
      selectedCurrency: e
    })
  }

  handleAddTargetCurrency(){
    const { selectedCurrency, targetCurrencyList } = this.state;

    this.setState({
      targetCurrencyList: [
        ...targetCurrencyList,
        selectedCurrency.value
      ],
      selectedCurrency: null
    });
  }

  handleDeleteTargetCurrency(targetCurrencyIndex){
    const { targetCurrencyList } = this.state;

    targetCurrencyList.splice( targetCurrencyIndex, 1);

    this.setState({
      targetCurrencyList
    });
  }

  render(){
    const { baseCurrency, targetCurrencyList, initialValue, selectedCurrency, rates, loading } = this.state;

    const targetCurrencyOptions = Object.keys(rates).filter(rateCode => !targetCurrencyList.includes(rateCode)).map(rateCode => ({
      label: rateCode,
      value: rateCode
    }));
    const isNewCurrencyEmpty = selectedCurrency === null;

    return (
      <div className="container landing-page">
        <div className="card">
          <div className="card-header">
            <p className="currency-tag">
              {baseCurrency} - {currencyNameList[baseCurrency]}
            </p>
            <div className="base-currency-container">
              <p className="currency-code">{baseCurrency}</p>
              <input
                type="text"
                name="initialValue"
                className="currency-value"
                value={initialValue}
                onChange={this.handleChangeValue.bind(this)}
              />
              <div className="clear-both"/>
            </div>
          </div>
          {targetCurrencyList && (
            <div className="card-body">
              <TargetCurrency
                baseCurrency={baseCurrency}
                initialValue={initialValue}
                targetCurrencyList={targetCurrencyList}
                rates={rates}
                handleDeleteTargetCurrency={this.handleDeleteTargetCurrency.bind(this)}
              />
            </div>
          )}
          <div className="card-footer">
            <div className="row">
              <div className={!isNewCurrencyEmpty ? "col-sm-9 col-md-9 col-lg-9" : "col-sm-12 col-md-12 col-lg-12"}>
                <Select
                  classNamePrefix="new-currency-code"
                  options={targetCurrencyOptions}
                  value={selectedCurrency}
                  isClearable
                  isLoading={loading}
                  placeholder="(+) Add More Currencies"
                  name="selectedCurrency"
                  onChange={this.handleSelectCurrency.bind(this)}
                />
              </div>
              {!isNewCurrencyEmpty && (
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <button className="btn btn-primary new-currency-submit-btn" onClick={this.handleAddTargetCurrency.bind(this)}>Submit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;