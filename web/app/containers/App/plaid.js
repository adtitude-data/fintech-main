
class PLAID {
  constructor (){
    this.url = process.env.REACT_APP_SERVER_PATH ;
    this.token = '' ;
    var tk = localStorage.getItem('token');
    if(tk){
      this.token = tk;
    }
  }

  /* Auth Api */

  async getItemInfo () {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var data = await fetch(this.url + 'plaid/info', requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        return result;
      })
      .catch(error => {
        return error;
    });
    console.log('data',data);
    return data;
  }
}



export default new PLAID();
