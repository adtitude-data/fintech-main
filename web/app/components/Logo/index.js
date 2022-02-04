/**
 *
 * Logo
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Logo() {
  return <img width="150" src={require('images/industry-fintech_white.png')}/>
}

Logo.propTypes = {};

export default memo(Logo);
