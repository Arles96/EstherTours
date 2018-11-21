import { Meteor } from 'meteor/meteor';

if (!process.env.MAIL_URL) {
  process.env.MAIL_URL = Meteor.settings.private.smtp;
}

Accounts.urls.verifyEmail = function setVerifyEmailUrl (token) {
  return Meteor.absoluteUrl(`verify-email/${token}`);
};

Accounts.urls.resetPassword = function setResetPassword (token) {
  return Meteor.absoluteUrl(`reset-password/${token}`);
};

Accounts.emailTemplates.siteName = 'https://esthertoursproyect.herokuapp.com/';
Accounts.emailTemplates.from = 'Esther Tours <aulio.maldonado@gmail.com>';

Accounts.emailTemplates.verifyEmail = {
  subject () {
    return 'Activate your account now';
  },
  html (user, url) {
    return `Hey user! verify this email by following this link ${url}`;
  }
};

Accounts.emailTemplates.resetPassword = {
  subject () {
    return 'Reseteando tu contraseña';
  },
  text (user, url) {
    return `Hola, para restablecer su contraseña, haga clic en este enlace ${url}`;
  }
};

AccountsTemplates.configure({
  sendVerificationEmail: true
});
