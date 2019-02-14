import './editBranchOffice.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { branchOfficeSchema } from '../../../api/branchOffices/Offices';
import municipalities from '../../../api/municipalities/municipality';

Template.editBranchOffice.helpers({
  branchOfficeSchema: () => branchOfficeSchema,
  officeBranch: () => Session.get('officeBranch'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityOffice', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityOffice', '(Seleccione Departamento)');
      return [];
    }
  }
});

AutoForm.addHooks('editOfficeForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la sucursal exitosamente.');
    $('#editOffice').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
