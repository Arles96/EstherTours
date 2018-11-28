import './editRenter.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RentersSchema } from '../../../api/renters/renters';

Template.editRenter.helpers({
  RentersSchema: () => RentersSchema
});

Template.editRenter.events({
  'change .categorization [type=radio]' (event) {
    Session.set('categorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('editRentersForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro de la arrendadora exitosamente.');
    Router.go('/list-renters');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
