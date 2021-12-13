/**
 *
 * Asynchronously loads the component for Loader
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
