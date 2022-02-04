
/**
 *
 * AuthContainer
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import AuthFooter from 'components/Partials/AuthFooter';
import Footer from 'components/Partials/Footer';

 function AuthContainer(props) {
   return (
    <div className="main-container">
        <div className="main">
            <div className="container">
                {/* Pages */}
                {props.children}
                <AuthFooter />
            </div>
            <Footer />
        </div>
    </div>
   );
 }

 AuthContainer.propTypes = {};

 export default memo(AuthContainer);

