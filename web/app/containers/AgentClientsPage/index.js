/**
 *
 * AgentClientsPage
 *
 */

import React, { memo , useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAgentClientsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* To Import Manualy */
import AppContainer from 'components/Partials/AppContainer';
import AdminListClients from 'components/Pages/Admin/Clients/AdminListClients';
import AddNewClient from 'components/Pages/Admin/Clients/AddNewClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../App/api';
import Loader from "react-loader-spinner";

export function AgentClientsPage() {
  useInjectReducer({ key: 'agentClientsPage', reducer });
  useInjectSaga({ key: 'agentClientsPage', saga });

  const [AddNewClientToggle , setAddNewClientToggle] = useState(false);
  const [ClientListingData , setClientListingData] = useState([]);
  const [ClientEditView , setClientEditView] = useState(false);
  const [ClientToEditId , setClientToEditId] = useState(0);

  const [loader, setLoader] = useState(false);

  const toast_success_message = (v , cb) => {
    toast.success(v, { position: toast.POSITION.TOP_RIGHT , autoClose: 4500 , onClose: () => cb() })
  };
  const toast_error_message = (v) => toast.error(v , { position: toast.POSITION.TOP_RIGHT });

  useEffect(() => {
    api.getAgentsClients().then( (data) => {
      var d = [] ;
      if(data.data) d = data.data ;
      setClientListingData(d);
    });
  }, []);

  function AddNewClientCallback(dataToInject , edit) {
    if(dataToInject != undefined){
      if(edit){
        for(var i = 0 ; i < ClientListingData.length ; i++){
          if(ClientListingData[i].id == ClientToEditId) {
            console.log('ClientListingData[i]',ClientListingData[i] , dataToInject);
            ClientListingData[i] = dataToInject;
            setClientListingData(ClientListingData);
            break;
          }
        }
      }else{
        ClientListingData.push(dataToInject);
        setClientListingData(ClientListingData);
      }

    }
    setAddNewClientToggle(false)
  }

  function ActionsClientCallback(dataToAction) {
    if(dataToAction.call == 'edit'){
      setAddNewClientToggle(true);
      setClientEditView(true);
      setClientToEditId(dataToAction.id);
    }else if(dataToAction.call == 'remove'){
      setLoader(true);
      api.deleteAdminNewClient(dataToAction.id).then((removeRes) => {
        setLoader(false);
        if(removeRes.status == 200){
          for(var i = 0 ; i < ClientListingData.length ; i++){
            if(ClientListingData[i].id == dataToAction.id) {
              console.log('i',i);
              var d = [...ClientListingData];
              d.splice(i, 1);
              setClientListingData(d);
              toast_success_message('Client has been removed from the system.' , function () {}) ;
              break;
            }
          }
        }
      });
    }
  }


  if(AddNewClientToggle){
    return (
      <AppContainer>
        <div className="main-page">
          <div className="content-center">
                <AddNewClient onChange={AddNewClientCallback} view={ClientEditView} edit={ClientToEditId} role="agent" />
            </div>
        </div>
      </AppContainer>
    );
  }else{
    return (
      <AppContainer>
        <ToastContainer />
        <Loader className="csLoader" type="TailSpin" color="#fff" height={150} width={150} visible={loader} />
        <div className="main-page">
        <div className="content-center">
              <div className="block-header"><a href="javascript:;" onClick={ () => {
                setAddNewClientToggle(true);
              }} >Add New Client</a></div>
              <AdminListClients agents={ClientListingData} onChange={ActionsClientCallback} role="agent" />
          </div>
        </div>
      </AppContainer>
    );
  }
}

AgentClientsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  agentClientsPage: makeSelectAgentClientsPage(),
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
)(AgentClientsPage);
