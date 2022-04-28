

/**
 *
 * Header
 *
 */

 import React, { memo , useState } from 'react';
 import { FormattedMessage } from 'react-intl';
 import auth from 'containers/App/auth';
 import AgentListCard  from './AgentListCard';
 import Logo from 'components/Logo';
 import { withRouter } from 'react-router-dom';

function AdminListAgents(props) {

  function ActionsAgentCallback(dataToAction) {
    props.onChange(dataToAction);
  }

  return (
      <div className="block-listing">
        {props.agents.length > 0 &&
        <div className="list">
          <ul>
            {props.agents.map((agent) => <AgentListCard key={agent.id} data={agent} onChange={ActionsAgentCallback} />)}
          </ul>
        </div>
        }

        {!(props.agents.length > 0) &&
          <div className="nrf">No agent found. Please add your first agent from above.</div>
        }

    </div>
    );
  }

  AdminListAgents.propTypes = {};

  export default withRouter (AdminListAgents);

