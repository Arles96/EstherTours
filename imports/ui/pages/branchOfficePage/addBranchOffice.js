import './addBranchOffice.html';
import toastr from 'toastr';
import { branchOfficeSchema } from '../../../api/branchOffices/Offices';

Template.addBranchOffice.helpers({
  branchOfficeSchema: () => branchOfficeSchema
});

AutoForm.addHooks('addOfficeForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado la sucursal exitosamente.');
  },
  onError: function (formtype, error) {
    if (error.error === 403) {
      toastr.error('Error la sucursal ya existe.');
    } else {
      toastr.error(error);
    }
  }
});
