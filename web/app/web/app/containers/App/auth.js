
class Auth {
  constructor (){
    this.authenticated = false;

  }

  async isAuthenticated () {
    var rt = {
      pass: false,
      role: null
    }
    var tk = localStorage.getItem('token');
    if(tk){
      var data = await this.validateToken(tk);
      if(data) {
        rt.pass = true;
        rt.role = data.role;
      }
    }
    return rt;
  }

  getUsername (){
    var user = localStorage.getItem('user');
    if(user != undefined || user != null){
      user = JSON.parse(user);
      return user.email;
    }
    return '';
  }

  userRole (){
    var user = localStorage.getItem('user');
    if(user != undefined || user != null){
      user = JSON.parse(user);
      return user.role.toLowerCase();
    }
    return false;
  }

  loggedIn (){
    var user = localStorage.getItem('user');
    if(user != undefined || user != null){
      return true;
    }
    return false;
  }


  logout (cb){
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    cb();
  }



  async TwoFaCodeServerAccess (accountType){
    const {generateSecret, verify} = require('2fa-util');
    var data = await generateSecret(accountType, 'FinTech Inc');
    return data;
  }
  async TwoFaCodeVerify (code,sec){
    const {generateSecret, verify} = require('2fa-util');
    var data = await verify(code, sec);
    return data;
  }

  async validateToken (tk){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", tk);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var res = await  fetch(process.env.REACT_APP_SERVER_PATH+"auth/me", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        if(result.errors != undefined){
          return false;
        }else{
          localStorage.setItem('user',JSON.stringify(result.data));
          return result.data;
        }
        return false;
      })
      .catch(error => {
    });
    return res;
  }
}

export default new Auth();
