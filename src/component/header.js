import React from 'react'
import logo from './newlogo.jpg';

function header() {
    return (
        <div className="header">
            <div className="logo-div">
            <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="log_user">
            <p >Hello Sandy</p>
            </div>
        </div>
    )
}

export default header
