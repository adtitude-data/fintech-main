
class API {
  constructor (){
    this.url = process.env.REACT_APP_SERVER_PATH ;
    this.token = '' ;
    var tk = localStorage.getItem('token');
    if(tk){
      this.token = tk;
    }
  }

  /* Auth Api */


  async loginCall (inputs) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("email", inputs.username);
      urlencoded.append("password", inputs.password);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      var data = await fetch(this.url + "auth/login", requestOptions)
        .then(response => response.text())
        .then(result => {
          var res =  result;
          res = JSON.parse(res) ;
          return res;
        })
        .catch(error => {
          return error;
      });

      return data ;

  }

  /* Auth Api */

  async addAdminNewAgent (inputs , edit , id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("x-access-token", this.token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("fullname", inputs.fullname);
    urlencoded.append("email", inputs.email);
    urlencoded.append("phone", inputs.phone);
    if(!edit) urlencoded.append("password", inputs.password);

    var targetEndpoint = 'add';
    if(edit) targetEndpoint = 'edit/' + id;

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'agents/' + targetEndpoint , requestOptions)
      .then(response => response.text())
      .then(result => {
        var res =  result;
        res = JSON.parse(res) ;
        return res;
      })
      .catch(error => {
        return error;
    });

    return data;
  }

  /* Get All Agents Admin */
  async getAdminNewAgents (){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'agents/list', requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }
  /* Get All Agents Admin */
  async getAdminNewAgentSingle (id){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'agents/single/' + id, requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }

  /* Get All Agents Admin */
  async deleteAdminNewAgent (id){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'agents/remove/' + id, requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }



  /* Admin Clients Apis */


  async addAdminNewClient (inputs , edit , id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("x-access-token", this.token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("fullname", inputs.fullname);
    urlencoded.append("email", inputs.email);
    urlencoded.append("phone", inputs.phone);
    if(!edit) urlencoded.append("password", inputs.password);

    var targetEndpoint = 'add';
    if(edit) targetEndpoint = 'edit/' + id;

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'clients/' + targetEndpoint , requestOptions)
      .then(response => response.text())
      .then(result => {
        var res =  result;
        res = JSON.parse(res) ;
        return res;
      })
      .catch(error => {
        return error;
    });

    return data;
  }

  /* Get All Clients Admin */
  async getAdminNewClients (){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'clients/list', requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }
  /* Get All Clients Admin */
  async getAdminNewClientSingle (id){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'clients/single/' + id, requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }

  /* Get All Clients Admin */
  async deleteAdminNewClient (id){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'clients/remove/' + id, requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }

  /*  */


  /* Agent Clients */
  async getAgentsClients (){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'agent/clients/list', requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }
  /*  */



  async getAcgentsClientSingle (id){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'agent/clients/single/' + id, requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }
  /*  */

   /* Clients Accounts */
   async getClientsAccounts (clientId){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'clients/accounts/list/' + clientId , requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }

   async getPlaidBalanceLive (item_id , clientId){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var urlencoded = new URLSearchParams();
    urlencoded.append("item_id", item_id);
    urlencoded.append("clientId", clientId);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    var data = await fetch(this.url + 'clients/accounts/live/balance' , requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }

  async deleteAgentAccounts (id , account_id){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'clients/accounts/remove/' + id + '/' + account_id, requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    return data;
  }


}



export default new API();
