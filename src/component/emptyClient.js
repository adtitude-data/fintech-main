import React from 'react'
import Header from './header.js';
import avtar from './avtar.png';



function emptyClient() {
    return (
        <div>
            <Header/>
            <div className="form_group">
                <form>
                    <input type="text" placeholder="Add Client"/><br/>
                </form>
                {/* <table className="cList">
                    
                    <tr>
                        <td><img src={avtar} width="30" height="30"/></td>
                        <td colspan="2"> Anders</td>
                        <td><i class="fa fa-pencil" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td><img src={avtar} width="30" height="30"/></td>
                        <td colspan="2">Chang</td>
                        <td><i class="fa fa-pencil" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td><img src={avtar} width="30" height="30"/></td>
                        <td colspan="2">Maria</td>
                        <td><i class="fa fa-pencil" aria-hidden="true"></i></td>
                    </tr>
                    <tr>
                        <td><img src={avtar} width="30" height="30"/></td>
                        <td colspan="2">Francisco</td>
                        <td><i class="fa fa-pencil" aria-hidden="true"></i></td>
                    </tr>
                </table> */}
            </div>
        </div>
    )
}

export default emptyClient