
/**
 *
 * Header
 *
 */

import React, { memo , useState } from 'react';
import { FormattedMessage } from 'react-intl';
import auth from 'containers/App/auth';
import Logo from 'components/Logo';
import { withRouter } from 'react-router-dom';
import LoggedInHeaderActions from './LoggedInHeaderActions';

 function Header(props) {
   const [ShowMobileMenu , setShowMobileMenu] = useState(false);
   const [ShowMobileMenuClass , setShowMobileMenuClass] = useState('');
   const getUsername = auth.getUsername();
   return (
    <header>
      <div className="container">
        <div className="logo">
          <Logo />
        </div>
        <div className="topactions">
          {/* <p>Hello {getUsername}</p> */}
          <ul>
            {auth.loggedIn() == true &&
              <LoggedInHeaderActions/>
            }
            {auth.loggedIn() == false &&
             <li><a href="/login">Login</a></li>
            }
          </ul>
        </div>


        <div className={`topactions mobile ${ShowMobileMenuClass}`}>
          <span className="show-mobile-menu"
            onClick={() => {
              setShowMobileMenu(true)
              setShowMobileMenuClass('show')
          }}><i className="fa fa-bars" aria-hidden="true"></i></span>
          {ShowMobileMenu && <span className="close-btn" onClick={() => {setShowMobileMenu(false) ; setShowMobileMenuClass('')}}><i className="fa fa-times"></i></span>}
          <ul>
            {/* <p>Hello {getUsername}</p> */}
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

 Header.propTypes = {};

 export default withRouter (Header);

