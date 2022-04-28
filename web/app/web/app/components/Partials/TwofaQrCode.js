
/**
 *
 * Header
 *
 */
import React, { memo , useState , useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import auth from 'containers/App/auth';
import Logo from 'components/Logo';
import { withRouter } from 'react-router-dom';
import LoggedInHeaderActions from './LoggedInHeaderActions';
import useDigitInput from 'react-digit-input';
import SweetAlert from 'sweetalert2-react';

function TwofaQrCode(props) {
    const [InvalidPinModal, setInvalidPinModal] = useState(false);
    const [QRCode, setQRCode] = useState('');
    const [AuthSec, setAuthSec] = useState('');
    const [AuthRes, setAuthRes] = useState({});
    const [PropsViewNomal, setPropsViewNomal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [value, onChange] = useState('');
    const digits = useDigitInput({
      acceptedCharacters: /^[0-9]$/,
      length: 6,
      value,
      onChange,
    });

    useEffect(() => {
      if(props.data){
        setQRCode(props.data.qrcode);
        setAuthSec(props.data.secret);
        setAuthRes(props.data.res);
        setPropsViewNomal(props.view);
      }
    });

    const _verifyCode = (e) => {
      auth.TwoFaCodeVerify(value,AuthSec).then((output) => {
        if(output){
          /*
            Update Following
              add session var
              update user table.
              redirect to requird page.
          */
          var jwt_token = AuthRes.included[0].attributes.token;
          var refresh_token = AuthRes.included[1].attributes.token;
          var myHeaders = new Headers();
          myHeaders.append("x-access-token", jwt_token);
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
          var urlencoded = new URLSearchParams();
          urlencoded.append("token", AuthSec);
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          };
          fetch(process.env.REACT_APP_SERVER_PATH + "auth/update-2fa", requestOptions)
            .then(response => response.text())
            .then(result => {
              var res =  result;
              res = JSON.parse(res) ;
              if(res.status == 200){
                localStorage.setItem('token', jwt_token, { path: '/' });
                localStorage.setItem('refresh_token', refresh_token , { path: '/' });
                localStorage.setItem('auth_token' , AuthSec , { path: '/' });
                if(AuthRes.data.attributes.role == 'Admin'){
                  props.history.push('/admin/agents')
                }else if(AuthRes.data.attributes.role == 'Agent'){
                  props.history.push('/agent/clients')
                }else{
                  props.history.push('/404-page')
                }
              }
            })
            .catch(error => {
              setLoader(false);
          });


        }else{
          setInvalidPinModal(true);
        }
      });
    }

    function _handleSubmit (e){
      e.preventDefault();


    }

    const qrForm = <><div className="col-12">
                      <h3>Authentication verification</h3>
                      <p>Please scan the below QR Code into you app to geneate the token</p>
                    </div>
                    <div className="col-12">
                      <div className="qr_code">
                        <img src={ QRCode }/>
                      </div>
                    </div></>;

    return (
      <div className="form-area qr-code-sanner">
        <SweetAlert
          show={InvalidPinModal}
          title="Oops"
          text="Your PIN is expired. Please try again."
          onConfirm={() => setInvalidPinModal(false)}
        />
        <form className="form" id="loginForm" onSubmit={_handleSubmit} >
            <div className="row">
              {PropsViewNomal == false &&
                qrForm
              }
              <div className="col-12">
                <div className="opt-pin">
                  <div className="label-heading">
                    <strong>Enter the code from the application</strong>
                    {PropsViewNomal == false &&
                      <label>After scanning the QR code image, the app will display a code that you can enter below.</label>
                    }
                  </div>
                  <div className="input-group">
                    <input inputMode="decimal" autoFocus {...digits[0]} />
                    <input inputMode="decimal" {...digits[1]} />
                    <input inputMode="decimal" {...digits[2]} />
                    <span className="hyphen" />
                    <input inputMode="decimal" {...digits[3]} />
                    <input inputMode="decimal" {...digits[4]} />
                    <input inputMode="decimal" {...digits[5]} />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <button onClick={_verifyCode} > Verify </button>
                </div>
              </div>
            </div>
        </form>
        <div className="action-buttons">
          <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US" target="_blank">Download Authenticator App</a>
        </div>
      </div>
    );
  }

  TwofaQrCode.propTypes = {};

  export default withRouter(TwofaQrCode);


