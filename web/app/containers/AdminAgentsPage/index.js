/**
 *
 * AdminAgentsPage
 *
 */

import React, { memo, useState , useEffect  } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminAgentsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


/* To Import Manualy */
import AppContainer from 'components/Partials/AppContainer';
import AdminListAgents from 'components/Pages/Admin/Agents/AdminListAgents';
import AddNewAgent from 'components/Pages/Admin/Agents/AddNewAgent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../App/api';
import Loader from "react-loader-spinner";

export function AdminAgentsPage(props) {

  useInjectReducer({ key: 'adminAgentsPage', reducer });
  useInjectSaga({ key: 'adminAgentsPage', saga });

  const [AddNewAgentToggle , setAddNewAgentToggle] = useState(false);
  const [CanAddOnly , setCanAddOnly] = useState(false);
  const [AgentListingData , setAgentListingData] = useState([]);
  const [AgentEditView , setAgentEditView] = useState(false);
  const [AgentToEditId , setAgentToEditId] = useState(0);
  const [loader, setLoader] = useState(false);

  const toast_success_message = (v , cb) => {
    toast.success(v, { position: toast.POSITION.TOP_RIGHT , autoClose: 4500 , onClose: () => cb() })
  };
  const toast_error_message = (v) => toast.error(v , { position: toast.POSITION.TOP_RIGHT });

  useEffect(() => {
    api.getAdminNewAgents().then( (data) => {
      var d = [] ;
      if(data.data) d = data.data ;
      setAgentListingData(d);
    });
  }, []);

  function AddNewAgentCallback(dataToInject , edit) {
    if(dataToInject != undefined){
      if(edit){
        console.log('changeon',AgentToEditId);
        for(var i = 0 ; i < AgentListingData.length ; i++){
          if(AgentListingData[i].id == AgentToEditId) {
            console.log('AgentListingData[i]',AgentListingData[i] , dataToInject);
            AgentListingData[i] = dataToInject;
            setAgentListingData(AgentListingData);
            break;
          }
        }
        console.log('AgentListingData',AgentListingData)
      }else{
        AgentListingData.push(dataToInject);
        setAgentListingData(AgentListingData);
      }

    }
    setAddNewAgentToggle(false)
    setCanAddOnly(false)
    setAgentToEditId(0);
  }

  function ActionsAgentCallback(dataToAction) {
    if(dataToAction.call == 'edit'){
      setAddNewAgentToggle(true);
      setAgentEditView(true);
      setAgentToEditId(dataToAction.id);
    }else if(dataToAction.call == 'remove'){
      setLoader(true);
      api.deleteAdminNewAgent(dataToAction.id).then((removeRes) => {
        setLoader(false);
        if(removeRes.status == 200){
          for(var i = 0 ; i < AgentListingData.length ; i++){
            if(AgentListingData[i].id == dataToAction.id) {
              console.log('i',i);
              var d = [...AgentListingData];
              d.splice(i, 1);
              setAgentListingData(d);
              toast_success_message('Agent has been removed from the system.' , function () {}) ;
              break;
            }
          }
        }
      });
    }
  }

  if(AddNewAgentToggle){
    return (
      <AppContainer>
        <div className="main-page">
          <div className="content-center">
          <AddNewAgent onChange={AddNewAgentCallback} view={AgentEditView} edit={AgentToEditId} add={CanAddOnly}/>
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
                setAddNewAgentToggle(true);
                setCanAddOnly(true);
              }} >Add New Agent</a></div>
              <AdminListAgents agents={AgentListingData} onChange={ActionsAgentCallback} />
          </div>

        </div>
      </AppContainer>
    );
  }

}

AdminAgentsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminAgentsPage: makeSelectAdminAgentsPage(),
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
)(AdminAgentsPage);
