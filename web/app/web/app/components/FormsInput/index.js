/**
 *
 * FormsInput
 *
 */

 import React, { memo } from 'react';
 // import PropTypes from 'prop-types';
 // import styled from 'styled-components';
 function FormsInput(props) {
   return (
     <div>
       <div className="form-group">
         <input type={props.type} placeholder={props.placeholder} id={props.id} name={props.name} className={props.className} />
       </div>
     </div>
   );
 }

 FormsInput.propTypes = {};

 export default memo(FormsInput);
