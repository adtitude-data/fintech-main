import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminClientsPage state domain
 */

const selectAdminClientsPageDomain = state =>
  state.adminClientsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminClientsPage
 */

const makeSelectAdminClientsPage = () =>
  createSelector(
    selectAdminClientsPageDomain,
    substate => substate,
  );

export default makeSelectAdminClientsPage;
export { selectAdminClientsPageDomain };
