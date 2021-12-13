

/**
 *
 * Header
 *
 */

 import React, { memo , useState , useEffect} from 'react';
 import { FormattedMessage } from 'react-intl';
 import auth from 'containers/App/auth';
 import AccountListCard  from './AccountListCard';
 import Logo from 'components/Logo';
 import { withRouter } from 'react-router-dom';

function ListClientAccounts(props) {

  console.log('props.deletedData',props);
  function ActionsClientCallback(dataToAction) {
    props.onChange(dataToAction);
  }

  return (
      <div className="block-listing">
        {props.accounts.length > 0 &&
        <div className="list">
          <ul>
            {props.accounts.map((account) => <AccountListCard key={account.id} data={account} onChange={ActionsClientCallback} />)}
          </ul>
        </div>
        }

        {!(props.accounts.length > 0) &&
          <div className="nrf">No account found. Please add your first account from above.</div>
        }

    </div>
    );
  }

  ListClientAccounts.propTypes = {};

  export default withRouter (ListClientAccounts);

