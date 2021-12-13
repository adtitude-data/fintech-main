import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the twoFaPage state domain
 */

const selectTwoFaPageDomain = state => state.twoFaPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TwoFaPage
 */

const makeSelectTwoFaPage = () =>
  createSelector(
    selectTwoFaPageDomain,
    substate => substate,
  );

export default makeSelectTwoFaPage;
export { selectTwoFaPageDomain };
