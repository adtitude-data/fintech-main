

/**
 *
 * Header
 *
 */

 import React, { memo , useState , useEffect} from 'react';
 import { FormattedMessage } from 'react-intl';
 import auth from 'containers/App/auth';
 import ClientListCard  from './ClientListCard';
 import Logo from 'components/Logo';
 import { withRouter } from 'react-router-dom';

function AdminListClients(props) {

  function ActionsClientCallback(dataToAction) {
    props.onChange(dataToAction);
  }

  return (
      <div className="block-listing">
        {props.agents.length > 0 &&
        <div className="list">
          <ul>
            {props.agents.map((agent) => <ClientListCard key={agent.id} data={agent} onChange={ActionsClientCallback} role={props.role} />)}
          </ul>
        </div>
        }

        {!(props.agents.length > 0) &&
          <div className="nrf">No client found. Please add your first client from above.</div>
        }

    </div>
    );
  }

  AdminListClients.propTypes = {};

  export default withRouter (AdminListClients);

