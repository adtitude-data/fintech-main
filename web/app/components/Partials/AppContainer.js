
/**
 *
 * AppContainer
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import AuthFooter from 'components/Partials/AuthFooter';
import Footer from 'components/Partials/Footer';
import Header from 'components/Partials/Header';

 function AppContainer(props) {
   return (
    <div className="main-container app-container">
        <div className="main ">
            <Header />
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

 AppContainer.propTypes = {};

 export default memo(AppContainer);

