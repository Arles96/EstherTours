// import i18n from 'meteor/universe:i18n';
import { Router } from 'meteor/iron:router';
import toastr from 'toastr';

const submitHook = function (error, state) {
  if (!error) {
    if (state === 'forgotPwd') {
      toastr.success('Por favor revise su correo');
    } else if (state === 'resetPwd') {
      toastr.success('Contraseña guardada exitosamente');
      Router.go('/');
    } else if (state === 'signIn') {
      Router.go('/dashboard');
    }
  } else {
    toastr.error('Error en correo o contraseña.');
  }
};

AccountsTemplates.configure({
  showForgotPasswordLink: true,
  enablePasswordChange: true,
  hideSignInLink: true,
  hideSignUpLink: true,
  onSubmitHook: submitHook,
  texts: {
    title: {
      signIn: '',
      signUp: '',
      forgotPwd: 'Restablecer su contraseña',
      resetPwd: 'Restablecer su contraseña'
    },
    button: {
      signIn: 'Iniciar Sesión',
      signUp: 'signUp',
      forgotPwd: 'Enviar',
      resetPwd: 'Guardar'
    },
    errors: {
      loginForbidden: 'Error en el correo o contraseña.',
      pwdMismatch: 'Contraseñas no coincide',
      accountsCreationDisabled: 'La creación de cuentas del lado del cliente está deshabilitada',
      cannotRemoveService: 'No se puede eliminar el único servicio activo!',
      captchaVerification: 'La verificación de Captcha falló!',
      mustBeLoggedIn: 'error.accounts.Must estar conectado',
      validationErrors: 'Errores de validación',
      verifyEmailFirst: 'Por favor verifique su correo electrónico primero. ¡Consulta el correo electrónico y sigue el enlace!'
    },
    inputIcons: {
      isValidating: 'fa fa-spinner fa-spin',
      hasSuccess: 'fa fa-check',
      hasError: 'fa fa-times'
    },
    info: {
      emailSent: ''
    }
  }
});
