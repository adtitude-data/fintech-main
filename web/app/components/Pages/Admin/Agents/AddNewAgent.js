


/**
 *
 * Header
 *
 */

import React, { memo , useState , useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import auth from 'containers/App/auth';
import api from 'containers/App/api';
import Logo from 'components/Logo';
import { withRouter } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewAgent(props) {
  const [inputs, setInputs] = useState({});
  const [loader, setLoader] = useState(false);
  const [canEdit, setEnableEdit] = useState(false);
  const [setEditData, setSetEditData] = useState({});
  var handleToUpdate = props.handleToUpdate;

  const toast_success_message = (v , cb) => {
    toast.success(v, { position: toast.POSITION.TOP_RIGHT , autoClose: 2000 , onClose: () => cb() })
  };
  const toast_error_message = (v) => toast.error(v , { position: toast.POSITION.TOP_RIGHT });


  useEffect(() => {
    if(props.view){
      setEnableEdit(true);
      api.getAdminNewAgentSingle(props.edit).then( (data) => {
        data = data.data;
        console.log('edit data',data)
        setInputs(values => ({...values, fullname: data.fullname}))
        setInputs(values => ({...values, email: data.email}))
        setInputs(values => ({...values, phone: data.phone}))
      });
    }

  }, []);

  const _handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
  }

  function _backButton(event) {
      props.onChange();
  }


  function _handleSubmit (e){
    e.preventDefault();
    setLoader(true);
    api.addAdminNewAgent(inputs , canEdit , props.edit).then( (data) => {
      setLoader(false);
      if(data.errors){
        console.log('data.error',data.errors)
        if(data.errors[0].status == 409)
        toast_error_message(data.errors[0].title);
      }else{
        data = data.data;
        var message = 'Agent has been added successfuly.';
        if(canEdit) message = 'Agent has been updated successfuly.';
        toast_success_message(message , function () {
          props.onChange({
            id: data.id,
            fullname: data.fullname,
            email: data.email,
            phone: data.phone
          } , canEdit);
        });

      }

    });


  }

  return (
      <div className="block-listing">
        <ToastContainer />
        <Loader className="csLoader" type="TailSpin" color="#fff" height={150} width={150} visible={loader} />
        <div className="form-container">
            {!canEdit && <h3>Add new agent</h3>}
            {canEdit && <h3>Edit Agent Data</h3>}
            <form className="form" id="loginForm" onSubmit={_handleSubmit} >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <input type="text" placeholder="Fullname" name="fullname"  value={inputs.fullname || ""} onChange={_handleChange} required />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input type="email" placeholder="Email" name="email"  value={inputs.email || ""}  onChange={_handleChange} required />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input type="text" placeholder="Phone" name="phone"  value={inputs.phone || ""}  onChange={_handleChange}  required />
                    </div>
                  </div>
                  <div className="col-12">
                    {!canEdit &&
                      <div className="form-group">
                        <input type="password" placeholder="Password" name="password"  value={inputs.password || ""}  onChange={_handleChange} required />
                      </div>
                    }
                  </div>
                  <div className="col-12">
                      <div className="form-group buttons">
                        <button onClick={_backButton} > Back </button>
                        {canEdit == false && <button type="submit" > Add </button>}
                        {canEdit == true && <button type="submit" > Update </button>}
                      </div>
                  </div>
                </div>
            </form>
        </div>
      </div>
    );
  }

  AddNewAgent.propTypes = {};

  export default withRouter (AddNewAgent);

