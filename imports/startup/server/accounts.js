import { Meteor } from 'meteor/meteor';
import { SSR } from 'meteor/meteorhacks:ssr';

if (!process.env.MAIL_URL) {
  process.env.MAIL_URL = Meteor.settings.private.smtp;
}

SSR.compileTemplate('resetPassword', Assets.getText('Cambiar-Contraseña.html'));
SSR.compileTemplate('confirmEmail', Assets.getText('Confirmar-Correo.html'));
SSR.compileTemplate('userData', Assets.getText('Datos-Usuario.html'));

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
    return 'Confirmar correo';
  },
  text (user, url) {
    const html = SSR.render('confirmEmail',
      {
        subject: 'Confirmar correo.',
        firstname: `${user.firstname}`,
        token: `${url}`
      });
    return html;
  }
};

Accounts.emailTemplates.resetPassword = {
  subject () {
    return 'Reseteando tu contraseña';
  },
  text (user, url) {
    const html = SSR.render('resetPassword',
      {
        subject: 'Cambiar contraseña.',
        firstname: `${user.firstname}`,
        token: `${url}`
      });
    return html;
  }
};

AccountsTemplates.configure({
  sendVerificationEmail: true
});
