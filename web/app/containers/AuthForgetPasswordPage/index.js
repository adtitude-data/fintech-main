/**
 *
 * ForgetPassword
 *
 */

import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import AuthContainer from 'components/Partials/AuthContainer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';

import FormsInput from 'components/FormsInput';
import Logo from 'components/Logo';
import Loader from "react-loader-spinner"

export function AuthForgetPasswordPage() {
  const [loader, setLoader] = useState(false);
  const [inputs, setInputs] = useState({});
  useInjectSaga({ key: 'authforgetpasswordpage', saga });


  const _handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  function _handleSubmit (e){
    e.preventDefault();

  }


  return (
    <AuthContainer>
    <Loader className="csLoader" type="TailSpin" color="#fff" height={150} width={150} visible={loader} />
    <div className="auth center-items">
      <div className="logo">
        <Logo />
      </div>
      <div className="form-area">
        <form className="form" id="resetPassword" onSubmit={_handleSubmit} >
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <input type="text" placeholder="Email" name="username"  value={inputs.username || ""}  onChange={_handleChange} />
                </div>
              </div>
              <div className="col-12">
                  <div className="form-group">
                    <button type="submit"> Send Link </button>
                  </div>
              </div>
            </div>
        </form>
        <div className="action-buttons">
          <a href="/">Want to Login ?</a>
        </div>
      </div>
    </div>
    </AuthContainer>
  );
}

AuthForgetPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(AuthForgetPasswordPage);
