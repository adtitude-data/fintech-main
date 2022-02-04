/**
 *
 * TwoFaPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTwoFaPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function TwoFaPage() {
  useInjectReducer({ key: 'twoFaPage', reducer });
  useInjectSaga({ key: 'twoFaPage', saga });

  return (
    <AuthContainer>
    <Loader className="csLoader" type="TailSpin" color="#fff" height={150} width={150} visible={loader} />
    <div className="auth center-items">
      <div className="logo">
        <Logo />
      </div>

    </div>
    </AuthContainer>

  );
}

TwoFaPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  twoFaPage: makeSelectTwoFaPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TwoFaPage);
