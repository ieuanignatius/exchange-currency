import React, { PureComponent } from 'react';
import { arrayOf, string, object, number, func } from 'prop-types';

import { currency } from "../../../../core/utils";

import './style.scss';

//thanks to (https://openexchangerates.org/api/currencies.json)
import currencyNameList from '../../currencyAbbreviationList';


class TargetCurrency extends PureComponent {
  static propTypes = {
    baseCurrency: string,
    targetCurrencyList: arrayOf(string),
    initialValue: number,
    rates: object,
    handleDeleteTargetCurrency: func
  };

  render(){
    const { targetCurrencyList, baseCurrency, initialValue, rates, handleDeleteTargetCurrency } = this.props;

    return targetCurrencyList.map((currencyCode, currencyIndex) => {
      const currencyName = currencyNameList[currencyCode];
      const currencyRate = initialValue * rates[currencyCode];

      return (
        <div className="container card target-currency-card" key={currencyIndex}>
          <div className="row">
            <div className="col-xs-9 col-sm-10 col-md-11 col-lg-11 target-currency-container">
              <p className="currency-code">{currencyCode}</p>
              <p className="currency-value">{currency(currencyRate.toString())}</p>
              <div className="clear-both"/>
              <p className="currency-tag">{currencyCode} - {currencyName}</p>
              <p className="currency-equality">1 {baseCurrency} = {currencyCode} {currency(rates[currencyCode].toString())}</p>
            </div>
            <div
              onClick={handleDeleteTargetCurrency.bind(this, currencyIndex)}
              className="col-xs-3 col-sm-2 col-md-1 col-lg-1 target-currency-btn-container"
            >
              (-)
            </div>
          </div>
        </div>
      );
    });
  }
}

export default TargetCurrency;

