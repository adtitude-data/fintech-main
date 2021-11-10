import React from 'react'
import Header from './header.js';
import log from './log.jpg';
import log1 from './log1.png';
import log2 from './log2.jpg';

function search() {
    return (
        <>
         <Header/>
        <div className="form_search">
        <p className="selectbnk">Select your bank</p>
        <section id="search">
        <label for="search-input"><i class="fa fa-search" aria-hidden="true"></i><span class="sr-only">Search</span></label>
        <input id="search-input" class="form-control input-lg" placeholder="Search" autocomplete="off" spellcheck="false" autocorrect="off" tabindex="1"/>
      </section>

      <table className="cList searchlist">
                    
                    <tr>
                        <td><img src={log}  height="30"/></td>
                        <td><img src={log}  height="30"/></td>
                        
                    </tr><br/>
                    <tr>
                        <td><img src={log1}  height="30"/></td>
                        <td><img src={log}  height="30"/></td>
                        
                    </tr><br/>
                    <tr>
                        <td><img src={log2}  height="30"/></td>
                        <td><img src={log}  height="30"/></td>
                        
                    </tr><br/>                    
                    </table>
        </div>
      
        </>
    )
}

export default search
