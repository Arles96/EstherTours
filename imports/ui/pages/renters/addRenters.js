import './addRenters.html';
import toastr from 'toastr';
import { RentersSchema } from '../../../api/renters/renters';

Template.addRenters.helpers({
  RentersSchema: () => RentersSchema
});

AutoForm.addHooks('addUserForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el registro de la arrendadora exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
