
/**
 *
 * Header
 *
 */

 import React, { memo } from 'react';
 import { FormattedMessage } from 'react-intl';
 import auth from 'containers/App/auth';
 import Logo from 'components/Logo';
 import { withRouter } from 'react-router-dom';
import LoggedInHeaderActions from './LoggedInHeaderActions';

  function StaticHeader(props) {
    const getUsername = auth.getUsername();
    return (
     <header>
       <div className="container">
         <div className="logo">
           <Logo />
         </div>
         <div className="topactions">
           <ul>

            {auth.loggedIn() == true &&
              <LoggedInHeaderActions/>
            }
            {auth.loggedIn() == false &&
             <li><a href="/login">Login</a></li>
            }
           </ul>
         </div>
       </div>
     </header>
    );
  }

  StaticHeader.propTypes = {};

  export default withRouter(StaticHeader);

