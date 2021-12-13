/**
 *
 * AuthLoginPage
 *
 */

import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AuthContainer from 'components/Partials/AuthContainer';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAuthLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import FormsInput from 'components/FormsInput/index';
import LoginForm from 'components/Partials/LoginForm';
import Logo from 'components/Logo';
//import Loader from 'components/Loader';
import Loader from "react-loader-spinner";

export function AuthLoginPage(props) {



  useInjectReducer({ key: 'authLoginPage', reducer });
  useInjectSaga({ key: 'authLoginPage', saga });




  return (
    <AuthContainer>

    <div className="auth center-items">
      <div className="logo">
        <Logo />
      </div>
      <LoginForm/>
    </div>
    </AuthContainer>

  );
}

AuthLoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authLoginPage: makeSelectAuthLoginPage(),
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

export default compose(withConnect)(AuthLoginPage);
