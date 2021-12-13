/**
 *
 * Loader
 *
 */

import React from 'react';
import './style.css';
function Loader(props) {

  return (
    <div className="loader center">
      <div className="center-content">
          <i className="fa fa-spiner fa-spin" />
          <span>{props.name}</span>
      </div>
    </div>
  );
}

Loader.propTypes = {};

export default Loader;
