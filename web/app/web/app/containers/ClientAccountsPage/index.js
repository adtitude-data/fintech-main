/**
 *
 * ClientAccountsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AppContainer from 'components/Partials/AppContainer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectClientAccountsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ClientAccountsPage() {
  useInjectReducer({ key: 'clientAccountsPage', reducer });
  useInjectSaga({ key: 'clientAccountsPage', saga });

  return (
    <AppContainer>
      <h1>Client Area</h1>
    </AppContainer>
  );
}

ClientAccountsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  clientAccountsPage: makeSelectClientAccountsPage(),
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

export default compose(withConnect)(ClientAccountsPage);
