import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminAgentsPage state domain
 */

const selectAdminAgentsPageDomain = state =>
  state.adminAgentsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminAgentsPage
 */

const makeSelectAdminAgentsPage = () =>
  createSelector(
    selectAdminAgentsPageDomain,
    substate => substate,
  );

export default makeSelectAdminAgentsPage;
export { selectAdminAgentsPageDomain };
