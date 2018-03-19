import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatAmount } from '../utils/tokens/pair';
import balances from '../store/selectors/balances';
import { ETH_UNIT_ETHER } from '../constants';

const propTypes = PropTypes && {
  tokenName: PropTypes.string,
  decimalPlaces: PropTypes.number,
  fromWei: PropTypes.bool,
  balanceUnit: PropTypes.string
};

export class OasisTokenBalanceWrapper extends PureComponent {
  render() {
    const { balance, tokenName, fromWei, balanceUnit } = this.props;
    if(!balance) {
      return (
        <div style={{ display: 'inline-block', padding: '5px 0' }}>[LOADING]</div>
      );

    } else {
      return (
        <div style={{ display: 'inline-block' }}>
          <span>
          { formatAmount(balance, fromWei, balanceUnit ||  ETH_UNIT_ETHER, this.props.decimalPlaces) }
          </span>
          <span style={{ padding: '0 5px', fontSize: '10px', lineHeight: '18px', verticalAlign: 'middle' }}>
            <b>{tokenName}</b>
          </span>
        </div>
      );
    }

  }
}

export function mapStateToProps(state, { tokenName }) {
  return {
    balance: balances.tokenBalance(state, { tokenName, balanceUnit: ETH_UNIT_ETHER, toBigNumber: false })
  };
}
export function mapDispatchToProps(dispatch) {
  const actions = {};
  return { actions: bindActionCreators(actions, dispatch) };
}

OasisTokenBalanceWrapper.propTypes = propTypes;
OasisTokenBalanceWrapper.displayName = 'OasisTokenBalance';
export default connect(mapStateToProps, mapDispatchToProps)(OasisTokenBalanceWrapper);
