
class AccountHelper {
  constructor (){

  }

  accountsLogos(name){
    var p = {
      'Chase' : 'logo_chase.svg',
      'City Bank' : 'logo_citibank.png',
      'Robinhood' : 'logo_robinhood.png',
      'Charles' : 'logo_Charles_Schwab.png',
      'Bank of America' : 'bank-of-america.jpg',
    };

    if(p[name] != undefined) return p[name];
    return null;
  }

}

export default new AccountHelper();

