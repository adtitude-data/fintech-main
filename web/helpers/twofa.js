import * as speakeasy from 'speakeasy';

class TwoFaAuthenticationService {
    
    getTwoFactorAuthenticationCode() {

        console.log('process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,', process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME);

        const secretCode = speakeasy.generateSecret({
        name: process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
        });
        return {
            otpauthUrl : secretCode.otpauth_url,
            base32: secretCode.base32,
        };
  }
}

export default TwoFaAuthenticationService();