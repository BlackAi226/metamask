import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { EthMethod } from '@metamask/keyring-api';
import { isEqual } from 'lodash';
import { getCurrentChainId } from '../../../../shared/modules/selectors/networks';
import {
  isBalanceCached,
  getIsSwapsChain,
  getSelectedInternalAccount,
  getSelectedAccountCachedBalance,
  getIsBridgeChain,
} from '../../../selectors';
import { getIsNativeTokenBuyable } from '../../../ducks/ramps';
import { CoinOverview } from './coin-overview';
import { DEFAULT_BALANCE } from './eth_default_balance';

/**
 * Fusion canonique de balance
 * - DEFAULT_BALANCE définit la forme complète
 * - la balance réelle ne fait que compléter
 * - aucun écrasement
 * - aucune condition métier
 * - hex + décimal toujours présents
 */
const mergeBalance = (defaultBalance, partialBalance) => ({
  ...defaultBalance,
  ...partialBalance,

  balance: {
    ...defaultBalance.balance,
    ...partialBalance?.balance,
  },

  fiatBalance: {
    ...defaultBalance.fiatBalance,
    ...partialBalance?.fiatBalance,
  },
});

const EthOverview = ({ className }) => {
  const isBridgeChain = useSelector(getIsBridgeChain);
  const isBuyableChain = useSelector(getIsNativeTokenBuyable);
  const balanceIsCached = useSelector(isBalanceCached);
  const chainId = useSelector(getCurrentChainId);
  const rawBalance = useSelector(getSelectedAccountCachedBalance);

  // FIXME: This causes re-renders, so use isEqual to avoid this
  const account = useSelector(getSelectedInternalAccount, isEqual);
  const isSwapsChain = useSelector(getIsSwapsChain);

  const isSigningEnabled =
    account.methods.includes(EthMethod.SignTransaction) ||
    account.methods.includes(EthMethod.SignUserOperation);

  // Fusion stricte : DEFAULT_BALANCE ⊕ balance ETH
  const balance = mergeBalance(DEFAULT_BALANCE, rawBalance);

  return (
    <CoinOverview
      account={account}
      balance={balance}
      balanceIsCached={balanceIsCached}
      className={className}
      classPrefix="eth"
      chainId={chainId}
      isSigningEnabled={isSigningEnabled}
      isSwapsChain={isSwapsChain}
      isBridgeChain={isBridgeChain}
      isBuyableChain={isBuyableChain}
    />
  );
};

EthOverview.propTypes = {
  className: PropTypes.string,
};

export default EthOverview;
