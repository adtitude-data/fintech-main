
/**
 *
 * Auth Perosnal Footer
 *
 */

 import React, { memo } from 'react';

 // import PropTypes from 'prop-types';
 // import styled from 'styled-components';

 import { FormattedMessage } from 'react-intl';

 function AuthFooter() {
   return (
      <div className="footer-quick-links">
        <ul>
          <li><a href="/contact-us">contact us</a></li>
          <li><a href="/privacy-policy">privacy policy</a></li>
        </ul>
      </div>
   );
 }

 AuthFooter.propTypes = {};

 export default memo(AuthFooter);
