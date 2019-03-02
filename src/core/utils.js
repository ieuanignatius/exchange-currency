export const currency = number => {
  const [ parsedNumber, comaNumber = '' ] = number.split('.');

  const afterDot = comaNumber !== '' ? `.${comaNumber.substring(0, 4)}` : '';

  return `${parsedNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${afterDot}`;
};