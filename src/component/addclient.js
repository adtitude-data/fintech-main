import React from 'react'
import Header from './header.js';


function addclient() {
    return (
        <div>
            <Header/>
            <div><h2>CHASE</h2></div>
            <div className="form_group">
                <form>
                    <input type="text" placeholder="Username"/><br/>
                    <input type="password" placeholder="Password"/><br/>
                    <select name="cars" id="cars">
                        <option value="volvo">Client</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select><br/>
                    <div className="buttonGroup">
                        <button className="backbtn">Back</button>
                        <button className="submitbtn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default addclient
