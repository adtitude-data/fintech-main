
/**
 *
 * AppContainer
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import AuthFooter from 'components/Partials/AuthFooter';
import Footer from 'components/Partials/Footer';
import StaticHeader from 'components/Partials/StaticHeader';

 function StaticContainer(props) {
   return (
    <div className="main-container app-container static-container">
        <div className="main ">
            <StaticHeader />
            <div className="container">
                {/* Pages */}
                {props.children}
            </div>
            <AuthFooter />
            <Footer />
        </div>
    </div>
   );
 }

 StaticContainer.propTypes = {};

 export default memo(StaticContainer);

