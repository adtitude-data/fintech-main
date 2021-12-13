
/**
 *
 * Header
 *
 */
 import React, { memo , useState } from 'react';
 import { defineMessages, FormattedMessage } from 'react-intl';
 import auth from 'containers/App/auth';
 import Logo from 'components/Logo';
 import { withRouter } from 'react-router-dom';
 import Loader from "react-loader-spinner";

import LoggedInHeaderActions from './LoggedInHeaderActions';
import TwofaQrCode from './TwofaQrCode';
import TwofaValidatePin from './TwofaValidatePin';

  function LoginForm(props) {

    const [inputs, setInputs] = useState({});
    const [TwoFaActive, setTwoFaActive] = useState(false);
    const [TwoAuthQRToken, setTwoAuthQRToken] = useState({});
    const [TwoFaPin, setTwoFaPin] = useState(false);
    const [loader, setLoader] = useState(false);

    const _handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    function _handleSubmit (e){
      e.preventDefault();
      console.log('form stopped');
      console.log(inputs);
      setLoader(true);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("email", inputs.username);
      urlencoded.append("password", inputs.password);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
     fetch(process.env.REACT_APP_SERVER_PATH + "auth/login", requestOptions)
        .then(response => response.text())
        .then(result => {
          var res =  result;
          res = JSON.parse(res) ;
          console.log('afterloing',res.data.attributes.email);
          if(res.included[2].attributes.token != ''){
            localStorage.setItem('auth_token' , res.included[2].attributes.token , { path: '/' });
          }

          /* Check 2FA Active */
          if(res.data.attributes.is_2fa_active){
            setTwoFaActive(true);
          }else{
            /* Active 2FA */
            setTwoFaActive(false);
          }

          console.log('i am loading')
          if(res.data.attributes.is_2fa_active){
            if(localStorage.getItem('auth_token') != null){
              var output = {
                res : res,
                secret : localStorage.getItem('auth_token'),
                qrcode : ''
              };
              console.log('using session info');
              setTwoAuthQRToken(output);
              setTwoFaPin(true);
              setLoader(false);
            }
          }else{
            var accountType = (res.data.attributes.email != undefined) ? res.data.attributes.email : 'Web';
            auth.TwoFaCodeServerAccess(accountType).then((output) => {
              output.res = res;
              setTwoAuthQRToken(output);
              setTwoFaActive(true);
              setLoader(false);
            });
          }

        })
        .catch(error => {
          console.log('error', error);
          setLoader(false);
      });

    }

    // const TwoLocal = async () => {
    //   var dss = await auth.TwoFaCodeServerLocal();
    //   return dss;
    // }

    if(TwoFaActive){
      return <TwofaQrCode data={TwoAuthQRToken} view={TwoFaPin} />
    }else if (TwoFaPin){
      return <TwofaValidatePin />
    }else{
      return (
        <div className="form-area">
          <Loader className="csLoader" type="TailSpin" color="#fff" height={150} width={150} visible={loader} />
          <form className="form" id="loginForm" onSubmit={_handleSubmit} >
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <input type="text" placeholder="Email" name="username"  value={inputs.username || ""}  onChange={_handleChange} required />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input type="password" placeholder="Password" name="password"  value={inputs.password || ""}  onChange={_handleChange} required />
                  </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                      <button type="submit" > Sign In </button>
                    </div>
                </div>
              </div>
          </form>
          <div className="action-buttons">
            <a href="/forget-password">Forget Password ?</a>
          </div>
        </div>
      );
    }

  }

  LoginForm.propTypes = {};

  export default withRouter(LoginForm);

