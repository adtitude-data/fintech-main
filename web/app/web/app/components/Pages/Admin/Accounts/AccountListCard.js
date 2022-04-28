

/**
 *
 * Header
 *
 */

 import React, { memo , useState , useEffect } from 'react';
 import { FormattedMessage } from 'react-intl';
 import auth from 'containers/App/auth';
 import accounthelper from 'containers/App/AccountHelper';
 import api from 'containers/App/api';
 import Logo from 'components/Logo';
 import { withRouter } from 'react-router-dom';

function AccountListCard(props) {
  const [currentISOCurency , setCurrentISOCurency] = useState('$');
  const [subAccounts , setSubAccounts] = useState([]);
  const [subAccountsDeleted , setSubAccountsDeleted] = useState([]);

  function _editButton (id){
    props.onChange({
      'call' : 'edit',
      'id' : id
    });
  }

  useEffect(() => {
    api.getPlaidBalanceLive(props.data.item_id, props.data.client_id).then( (data) => {
      console.log('subAccounts data',data)
      console.log('subAccounts',data.data.accounts)
      if(data.data){ setSubAccounts(data.data.accounts); }
      if(data.delRef){ setSubAccountsDeleted(data.delRef);  }

      props.onChange({
        'call' : 'updateLoader',
        'loader' : false
      });
    });
  } , []);

  function _removeButton (id , account_id){
    props.onChange({
      'call' : 'remove',
      'id' : id,
      'account_id' : account_id
    });
  }
  function _refreshToken (token){
    /* Refresh Token Via API */
  }

  var accountLogo = require('images/default_bank_icon.png');
  if(props.data.inst_logo != null) {
    accountLogo = 'data:image/png;base64,' + props.data.inst_logo;
  }

  function __checkIfDeleted(v){
    var x = subAccountsDeleted;
    var y = [];
    for(var i = 0 ; i < x.length ; i++){
      if(x[i].status == 2) y.push(x[i].plaid_account_id);
    }
    if(y.includes(v)){
      return false;
    }
    return true;
  }

  return (
      <li>
          {subAccounts.map((ac) => (
            <div key={ac.account_id}>
              {__checkIfDeleted(ac.account_id) &&
              <div className="list-view" >
                <div className="logo-account">
                  <img src={accountLogo} />
                </div>
                <div className="v-box-list font-bold">
                  <h3 className="text-left">{ ( ac.name ?  ac.name : ac.official_name )}</h3>
                  <div className="two-group">
                    <span>{ ( ac.balances ? ac.balances.available ?  currentISOCurency + ' ' + ac.balances.available : currentISOCurency + ' ' + 0 : 'Loading balance ...' )}</span>
                    <span>****{( ac.mask ?  ac.mask : '0000' )}</span>
                  </div>
                </div>
                <div className="actions">
                    {(props.data.tokenExipred != undefined || props.data.tokenExipred == 1) && <a href="javascript:;" onClick={() => {_refreshToken(props.data.token)}} ><i class="fa fa-exclamation-circle" aria-hidden="true"></i></a>}
                    <a href="javascript:;" onClick={() => {_removeButton(props.data.id , ac.account_id )}} ><i className="fa fa-trash"></i></a>
                </div>
              </div>
              }
            </div>
          )
          )}
      </li>
    );
  }

  AccountListCard.propTypes = {};

  export default memo(AccountListCard);

