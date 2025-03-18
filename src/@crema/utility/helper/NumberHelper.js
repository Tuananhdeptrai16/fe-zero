import { toCurrency } from 'src/shared/utils/filter';

export const getFormattedCurrency = (value) => {
  return toCurrency(value);
};
