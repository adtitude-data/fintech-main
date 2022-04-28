
/**
 *
 * Header
 *
 */

 import React, { memo , useState } from 'react';
 import { FormattedMessage } from 'react-intl';
 import auth from 'containers/App/auth';
 import Logo from 'components/Logo';
 import { withRouter } from 'react-router-dom';

  function LoggedInHeaderActions(props) {
    const getUsername = auth.getUsername();
    const [ShowAdminToggle , setShowAdminToggle] = useState('hide');
    var role = auth.userRole();
    if(role == 'admin'){
      return (
        <ul>
          <li><a href={"/admin/agents"}>Agents</a></li>
          <li><a href={"/admin/clients"}>Clients</a></li>
          {/* <li><a href={"/admin/settings"}>Settings</a></li> */}
          <li>
            <a href="javascript:;" onClick={ () => {
              if(ShowAdminToggle == 'show'){ setShowAdminToggle ('hide')}
              if(ShowAdminToggle  == 'hide'){ setShowAdminToggle ('show')}
            }}><span>Profile</span><i className="fa fa-chevron-down"></i></a>
              <ul className="dropdown" show={ShowAdminToggle}>
                <li><a href="javascript:;" onClick={ () => {
                  auth.logout(function (){
                  props.history.push('/login')
                })
              }}>Logout</a></li>
              </ul>
          </li>
        </ul>
        );
    }else if(role == 'agent'){
      return (
        <ul>
          <li><a href={"/agent/clients"}>Clients</a></li>
          {/* <li><a href={"/agent/accounts"}>Accounts</a></li> */}
          {/* <li><a href={"/agent/settings"}>Settings</a></li> */}
          <li>
            <a href="javascript:;" onClick={ () => {
              if(ShowAdminToggle == 'show'){ setShowAdminToggle ('hide')}
              if(ShowAdminToggle == 'hide'){ setShowAdminToggle ('show')}
            }}><span>Profile</span><i className="fa fa-chevron-down"></i></a>
              <ul className="dropdown" show={ShowAdminToggle}>
                <li><a href="javascript:;" onClick={ () => {
                  auth.logout(function (){
                  props.history.push('/login')
                })
              }}>Logout</a></li>
              </ul>
          </li>
        </ul>
        );
    }else{
      return (<></>);
    }



  }

  LoggedInHeaderActions.propTypes = {};

  export default withRouter(LoggedInHeaderActions);

