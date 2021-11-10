import React from 'react'
import logo from './newlogo.jpg';


function Login() {
    return (
        <div class="loginbody">
            <div className="logfo">
            <div className="logo">           
             <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="log_form">
                <div className="inform">
                <input type="text" name="" placeholder="Online ID"/><br/>
                <input type="text" name="" placeholder="Password"/><br/>
                <input className="losave" type="submit" name="" value="Sign In"/><br/>
                </div>
                <button className="createacc">Create an account</button>
            </div>
            </div>
            
        </div>
    )
}

export default Login
