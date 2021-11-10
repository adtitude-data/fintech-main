import React from 'react'
import Header from './header.js';
import log from './log.jpg';
import log1 from './log1.png';
import log2 from './log2.jpg';


function account() {
    return (
        <div>
            <Header/>
            <div className="form_group">
                <form>
                    <input type="text" placeholder="Add Account"/><br/>
                </form>
                <table className="cList">
                    
                    <tr>
                        <td><img src={log}  height="30"/></td>
                        <td colspan="2"> $20,056</td>
                        <td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td><img src={log1}  height="30"/></td>
                        <td colspan="2">$101,016</td>
                        <td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td><img src={log2}  height="30"/></td>
                        <td colspan="2">$10,050</td>
                        <td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td><img src={log}  height="30"/></td>
                        <td colspan="2">$100,056</td>
                        <td><i class="fa fa-pencil" aria-hidden="true"></i><i class="fa fa-trash" aria-hidden="true"></i></td>
                    </tr>
                    </table>
            </div>
        </div>
    )
}

export default account