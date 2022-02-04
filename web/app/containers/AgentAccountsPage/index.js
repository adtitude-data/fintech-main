/**
 *
 * AgentAccountsPage
 *
 */

import React, { memo , useState  , useEffect , useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAgentAccountsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* To Import Manualy */
import AppContainer from 'components/Partials/AppContainer';
import PlaidAddAccountButton from 'components/Partials/PlaidAddAccountButton';
import ListClientAccounts from 'components/Pages/Admin/Accounts/ListClientAccounts';
import AddNewClientAccount from 'components/Pages/Admin/Accounts/AddNewClientAccount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../App/api';
import Loader from "react-loader-spinner";

export function AgentAccountsPage(props) {
  useInjectReducer({ key: 'agentAccountsPage', reducer });
  useInjectSaga({ key: 'agentAccountsPage', saga });

  const [AddNewAccountToggle , setAddNewAccountToggle] = useState(false);
  const [ClientAccountListingData , setClientAccountListingData] = useState([]);
  const [ClientAccountDeltedData , setClientAccountDeltedData] = useState([]);
  const [ClientAccountEditView , setClientAccountEditView] = useState(false);
  const [ClientAccountToEditId , setClientAccountToEditId] = useState(0);
  const [loader, setLoader] = useState(false);


  const toast_success_message = (v , cb) => {
    toast.success(v, { position: toast.POSITION.TOP_RIGHT , autoClose: 4500 , onClose: () => cb() })
  };
  const toast_error_message = (v) => toast.error(v , { position: toast.POSITION.TOP_RIGHT });

  const [linkSuccess , setLinkSuccess] = useState(false);
  const [isItemAccess , setIsItemAccess] = useState(false);
  const [linkToken , setLinkToken] = useState("");
  const [accessToken , setAccessToken] = useState(null);
  const [itemId , setItemId] = useState(null);
  const [isError , setIsError] = useState(false);
  const [backend , setBackend] = useState(true);
  const [linkTokenError , setLinkTokenError] = useState({
      error_type: "",
      error_code: "",
      error_message: ""
  });

  const [userInfo , setUserInfo] = useState({
    id: null,
    name: '',
  })

  const [accountOpenReady , setAccountOpenReady] = useState(false);


  const getInfo = useCallback(async () => {
    const response = await fetch(process.env.REACT_APP_SERVER_PATH + "plaid/info", { method: "POST" });
    if (!response.ok) {
      setBackend(false);
      return { paymentInitiation: false };
    }
    const data = await response.json();
    const paymentInitiation = data.products.includes(
      "payment_initiation"
    );
    return { paymentInitiation };
  }, []);

  const generateToken = useCallback(
    async (paymentInitiation) => {
      const path = paymentInitiation
        ? "plaid/create_link_token_for_payment"
        : "plaid/create_link_token";
      const response = await fetch(process.env.REACT_APP_SERVER_PATH + path, {
        method: "POST",
      });
      if (!response.ok) {
        setLinkToken(null);
        return;
      }
      const data = await response.json();
      if (data) {
        if (data.error != null) {
          setLinkToken(null);
          setLinkTokenError(data.error);
          return;
        }

        setLinkToken(data.link_token);
      }
      localStorage.setItem("link_token", data.link_token); //to use later for Oauth
  },[]);


  useEffect(() => {
    /* Check if user id is valid. props.match.params.id */
    /* Get Use Info */
     api.getAcgentsClientSingle(props.match.params.id).then( (data) => {
      if(data.data != undefined){
        setUserInfo({
          id: data.data.id,
          name: data.data.fullname,
        });
        api.getClientsAccounts(data.data.id).then( (data) => {
          var d = [] ;
          var x = [] ;
          if(data.data) d = data.data ;
          setClientAccountListingData(d);
        });
      }
    });

    const init = async () => {
      const { paymentInitiation } = await getInfo(); // used to determine which path to take when generating token
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage
      if (window.location.href.includes("?oauth_state_id=")) {
        setLinkToken(localStorage.getItem("link_token"));
        return;
      }
      generateToken(paymentInitiation);
    };
    init();
  }, [/* generateToken , getInfo */]);


  function AddNewClientAccountCallback(dataToInject , edit) {
    if(dataToInject != undefined){
      if(edit){
        for(var i = 0 ; i < ClientAccountListingData.length ; i++){
          if(ClientAccountListingData[i].id == ClientAccountToEditId) {
            ClientAccountListingData[i] = dataToInject;
            setClientAccountListingData(ClientAccountListingData);
            break;
          }
        }
      }else{
        ClientAccountListingData.push(dataToInject);
        setClientAccountListingData(ClientAccountListingData);
      }

    }
    setAddNewClientToggle(false)
  }

  function ActionsClientAccountsCallback(dataToAction) {
    if(dataToAction.call == 'edit'){
      setAddNewClientToggle(true);
      setClientAccountEditView(true);
      setClientAccountToEditId(dataToAction.id);
    }else if(dataToAction.call == 'remove'){
      setLoader(true);
      api.deleteAgentAccounts(dataToAction.id , dataToAction.account_id).then((removeRes) => {
        setLoader(false);
        if(removeRes.status == 200){
          location.reload();
          /* for(var i = 0 ; i < ClientAccountListingData.length ; i++){
            if(ClientAccountListingData[i].id == dataToAction.id) {
              var d = [...ClientAccountListingData];
              d.splice(i, 1);
              setClientAccountListingData(d);
              toast_success_message('Account has been removed from the system.' , function () {}) ;
              break;
            }
          }*/
        }
      });
    }
  }

  function PlaidButtonCallback (dataToAction) {
    if(dataToAction.status == 200){
      api.getClientsAccounts(props.match.params.id).then( (data) => {
        var d = [] ;
        if(data.data) d = data.data ;
        setClientAccountListingData(d);
      });
    }
  }

  return (
    <AppContainer>
      <ToastContainer />
      <Loader className="csLoader" type="TailSpin" color="#fff" height={150} width={150} visible={loader} />
      <div className="main-page">
      <div className="account-holder-info">
        <div className="ac-info">
          <div className="avatar avatar-6"></div>
          <h3>{userInfo.name}</h3>
        </div>
      </div>
      <div className="content-center">
            <div className="block-header">
              {/* Button Comp */}
              <PlaidAddAccountButton linktoken={linkToken} clientid={userInfo.id} onChange={PlaidButtonCallback}></PlaidAddAccountButton>
            </div>

            <ListClientAccounts accounts={ClientAccountListingData} onChange={ActionsClientAccountsCallback} />
        </div>
      </div>
    </AppContainer>
  );
}

AgentAccountsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  agentAccountsPage: makeSelectAgentAccountsPage(),
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

export default compose(
  withConnect,
  memo,
)(AgentAccountsPage);
