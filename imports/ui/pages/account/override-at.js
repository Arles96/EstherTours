import './override-atError.html';
import './override-atInput.html';
import './override-atForm.html';
import './override-atPwdForm.html';
import './override-atPwdFormBtn.html';
import './override-atPwdLink.html';
import './override-atSigninLink.html';
import './override-atTitle.html';
import { Template } from 'meteor/templating';

Template.overrideAtTextInput.helpers({
  labelName: function (displayName) {
    if (displayName === 'Email') {
      return 'Correo';
    } else if (displayName === 'Password') { // eslint-disable-line
      return 'Contraseña';
    } else if (displayName === 'Password (again)') {
      return 'Confirmar Contraseña';
    } else {
      return displayName;
    }
  }
});

Template.overrideAtError.helpers({
  errorLabel: function (displayName) {
    if (displayName === 'Email: Invalid email') {
      return 'Correo Inválido.';
    } else if (displayName === 'Password: Minimum required length: 6') { // eslint-disable-line
      return 'Contraseña deben tener como mínimo 6 caracteres. ';
    } else if (displayName === 'Password (again): Minimum required length: 6') {
      return 'Confirmar Contraseña deben tener como mínimo 6 caracteres. ';
    } else if (displayName === 'Password (again): Contraseñas no coincide') {
      return 'Contraseñas no coinciden';
    } else if (displayName === 'Token expired') {
      return 'Token expirado';
    } else if (displayName === 'User not found') {
      return 'Este correo no existe';
    } else {
      return displayName;
    }
  }
});

Template.overrideAtForm.replaces('atForm');
Template.overrideAtPwdForm.replaces('atPwdForm');
Template.overrideAtInput.replaces('atInput');
Template.overrideAtTextInput.replaces('atTextInput');
Template.atTextInput.inheritsHelpersFrom('overrideAtTextInput');
Template.overrideAtCheckboxInput.replaces('atCheckboxInput');
Template.overrideAtSelectInput.replaces('atSelectInput');
Template.overrideAtRadioInput.replaces('atRadioInput');
Template.overrideAtHiddenInput.replaces('atHiddenInput');
Template.overrideAtPwdFormBtn.replaces('atPwdFormBtn');
Template.overrideAtPwdLink.replaces('atPwdLink');
Template.overrideAtError.replaces('atError');
Template.atError.inheritsHelpersFrom('overrideAtError');
Template.overrideAtSigninLink.replaces('atSigninLink');
Template.overrideAtTitle.replaces('atTitle');
