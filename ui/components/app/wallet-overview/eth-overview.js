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

// 🚨 ceci est un fichier incomplet.
// le DEFAULT_BALANCE doit être utilisé pour fusionner littéralement avec tous les ETH balances.
// par exemple ETH_BALANCE + Default_balance
// On dit de fusionner, pas modifier. Il faut bien fusionner pour éviter tout écrasement 
// pas de fallback, pas de 'if'
// chat gpt complète pour moi. le DEFAULT_BALANCE possède du hex et du décimal. à toi de bien gérer

const EthOverview = ({ className }) => {
  const isBridgeChain = useSelector(getIsBridgeChain);
  const isBuyableChain = useSelector(getIsNativeTokenBuyable);
  const balanceIsCached = useSelector(isBalanceCached);
  const chainId = useSelector(getCurrentChainId);
  const balance = useSelector(getSelectedAccountCachedBalance);

  // FIXME: This causes re-renders, so use isEqual to avoid this
  const account = useSelector(getSelectedInternalAccount, isEqual);
  const isSwapsChain = useSelector(getIsSwapsChain);
  const isSigningEnabled =
    account.methods.includes(EthMethod.SignTransaction) ||
    account.methods.includes(EthMethod.SignUserOperation);

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
