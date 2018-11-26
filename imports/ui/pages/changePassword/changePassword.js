import './changePassword.html';
import { Accounts } from 'meteor/accounts-base';
import toastr from 'toastr';
import ChangePasswordSchema from '../../../api/users/changePassword';

Template.changePasswordPage.helpers({
  changePasswordSchema: () => ChangePasswordSchema
});

AutoForm.addHooks('changePasswordForm', {
  onSubmit: function (doc) {
    this.event.preventDefault();
    ChangePasswordSchema.validate(doc);
    Accounts.changePassword(doc.oldPassword, doc.newPassword, error => {
      if (error) {
        toastr.error('Contraseña antigua incorrecta.');
      } else {
        toastr.success('Nueva contraseña guardada exitosamente.');
      }
      this.done();
    });
  },
  onError: function (formType, error) {
    toastr.error(error);
  }
});
