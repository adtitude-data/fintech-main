import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agentAccountsPage state domain
 */

const selectAgentAccountsPageDomain = state =>
  state.agentAccountsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AgentAccountsPage
 */

const makeSelectAgentAccountsPage = () =>
  createSelector(
    selectAgentAccountsPageDomain,
    substate => substate,
  );

export default makeSelectAgentAccountsPage;
export { selectAgentAccountsPageDomain };
