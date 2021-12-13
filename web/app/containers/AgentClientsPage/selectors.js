import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agentClientsPage state domain
 */

const selectAgentClientsPageDomain = state =>
  state.agentClientsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgentClientsPage
 */

const makeSelectAgentClientsPage = () =>
  createSelector(
    selectAgentClientsPageDomain,
    substate => substate,
  );

export default makeSelectAgentClientsPage;
export { selectAgentClientsPageDomain };
