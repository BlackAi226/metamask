import React from 'react';
import PropTypes from 'prop-types';
import CurrencyDisplay from '../currency-display';
import { useTokenTracker } from '../../../hooks/useTokenTracker';
import { useTokenFiatAmount } from '../../../hooks/useTokenFiatAmount';
import { useIsOriginalTokenSymbol } from '../../../hooks/useIsOriginalTokenSymbol';
import { Text } from '../../component-library';
import {
  FontWeight,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { DEFAULT_BALANCE } from './default_token_balance';

export default function TokenBalance({
  className,
  token,
  showFiat,
  ...restProps
}) {
  const mergedToken = { ...DEFAULT_BALANCE, ...token };

  const { tokensWithBalances } = useTokenTracker({ tokens: [mergedToken] });

  const mergedBalance = { ...DEFAULT_BALANCE, ...tokensWithBalances[0] };

  const { string, symbol, address } = mergedBalance;

  const formattedFiat = useTokenFiatAmount(address, string, symbol);
  const isOriginalTokenSymbol = useIsOriginalTokenSymbol(address, symbol);

  const fiatValue = isOriginalTokenSymbol ? formattedFiat : null;

  if (showFiat) {
    return (
      <Text fontWeight={FontWeight.Medium} variant={TextVariant.bodyMd}>
        {fiatValue}
      </Text>
    );
  }

  return (
    <CurrencyDisplay
      className={className}
      displayValue={string}
      suffix={symbol}
      {...restProps}
    />
  );
}

TokenBalance.propTypes = {
  className: PropTypes.string,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    decimals: PropTypes.number,
    symbol: PropTypes.string,
  }).isRequired,
  showFiat: PropTypes.bool,
};

TokenBalance.defaultProps = {
  className: undefined,
};
