
/**
 *
 * Header
 *
 */

 import React, { memo , useEffect , useState , useContext } from 'react';
 import { FormattedMessage } from 'react-intl';
 import { withRouter } from 'react-router-dom';
 import {
   usePlaidLink,
   PlaidLinkOptions,
   PlaidLinkOnSuccess,
   PlaidLinkOnExit,
   PlaidLinkOnExitMetadata,
   PlaidLinkError
 } from "react-plaid-link";
 import Button from "plaid-threads/Button";
 
 function PlaidAddAccountButton(props) {
 
   const [linkToken , setLinkToken] = useState("");
   const [linkSuccess , setLinkSuccess] = useState(false);
   const [accessToken , setAccessToken] = useState("no access_token retrieved");
   const [itemId , setItemId] = useState("no item_id retrieved");
   const [isItemAccess , setIsItemAccess] = useState(false);
   const [clientId , setClientId] = useState(0);
 
 
 
   var onSuccess = React.useCallback(
     (public_token) => {
       const setToken = async (pt , clid) => {
         const response = await fetch(process.env.REACT_APP_SERVER_PATH + "plaid/set_access_token", {
           method: "POST",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
           },
           body: `public_token=${pt}&clientid=` + clid,
         });
         if (!response.ok) return;
         const data = await response.json();
         setItemId(data.item_id);
         setAccessToken(data.access_token);
         setIsItemAccess(true);
         props.onChange({
           'status' : data.status
         });
       };
       setToken(public_token,props.match.params.id);
       setLinkSuccess(true);
       //location.reload();
       //window.history.pushState("", "", "/");
     },
     []
   );
 
   var onExit = React.useCallback (
     (error) => {
     exit({ force: true });
     // log and save error and metadata
     // handle invalid link token
     console.log('exit error'  , error);
     if (error != null /* && error.error_code === 'INVALID_LINK_TOKEN' */) {
       //alert(error);
       //open();
     }
     
     // to handle other error codes, see https://plaid.com/docs/errors/
     },
     /* (public_token) => {
       const setToken = async (pt , clid) => {
         const response = await fetch(process.env.REACT_APP_SERVER_PATH + "plaid/set_access_token", {
           method: "POST",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
           },
           body: `public_token=${pt}&clientid=` + clid,
         });
         if (!response.ok) return;
         const data = await response.json();
         setItemId(data.item_id);
         setAccessToken(data.access_token);
         setIsItemAccess(true);
         props.onChange({
           'status' : data.status
         });
       };
       setToken(public_token,props.match.params.id);
       setLinkSuccess(false);
       //location.reload();
       //window.history.pushState("", "", "/");
     }, */
     []
   );
 
   let isOauth = false;
   const config = {
       token: props.linktoken,
       onSuccess: onSuccess,
       onExit : onExit 
   };
 
 
   if (window.location.href.includes("?oauth_state_id=")) {
     config.receivedRedirectUri = encodeURIComponent(window.location.href);
     isOauth = true;
   }
   console.log('config',config);
   const { open, exit ,  ready } = usePlaidLink(config);
 
     useEffect(() => {
       setClientId(props.clientid);
       if (isOauth && ready) {
       console.log('linked token is called');
       open();
       }
     }, [ready, open, isOauth]);
 
     return (
       <a href="javascript:;" onClick={() => open()} disabled={!ready}  >Add New Account</a>
     );
   }
 
   PlaidAddAccountButton.propTypes = {};
 
   export default withRouter(PlaidAddAccountButton);
 
 