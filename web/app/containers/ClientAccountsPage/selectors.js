import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clientAccountsPage state domain
 */

const selectClientAccountsPageDomain = state =>
  state.clientAccountsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ClientAccountsPage
 */

const makeSelectClientAccountsPage = () =>
  createSelector(
    selectClientAccountsPageDomain,
    substate => substate,
  );

export default makeSelectClientAccountsPage;
export { selectClientAccountsPageDomain };
