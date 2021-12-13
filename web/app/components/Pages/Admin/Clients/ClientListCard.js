

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

function ClientListCard(props) {

  function _editButton (id){
    props.onChange({
      'call' : 'edit',
      'id' : id
    });
  }

  function randInBetween(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function _removeButton (id){
    props.onChange({
      'call' : 'remove',
      'id' : id
    });
  }

  var avatarClassName = 'avatar avatar-' + randInBetween(1,6);
  var showAccountButton = process.env.REACT_APP_ROUTEPATH;
  return (
        <li>
          <div className="list-view">
            <div className={avatarClassName}></div>
            <div className="v-box-list">
            <h3>{ (props.data.fullname) ? props.data.fullname : props.data.email}</h3>
            </div>
            <div className="actions">
                {props.role == 'agent' &&
                  <a href={process.env.REACT_APP_ROUTEPATH + 'agent/clients/' + props.data.id} ><i className="fa fa-cube"></i></a>
                }
                <a href="javascript:;" onClick={() => {_editButton(props.data.id)}} ><i className="fa fa-edit"></i></a>
                <a href="javascript:;" onClick={() => {_removeButton(props.data.id)}} ><i className="fa fa-trash"></i></a>
            </div>
          </div>
        </li>
    );
  }

  ClientListCard.propTypes = {};

  export default memo(ClientListCard);

