import './addRenters.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RentersSchema } from '../../../api/renters/renters';

Template.addRenters.helpers({
  RentersSchema: () => RentersSchema,
  categorization: () => Session.get('categorization')
});

Template.addRenters.events({
  'change .categorization [type=radio]' (event) {
    Session.set('categorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('addRentersForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el registro de la arrendadora exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
