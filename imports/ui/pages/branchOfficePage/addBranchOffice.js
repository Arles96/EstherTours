import './addBranchOffice.html';
import toastr from 'toastr';
import { branchOfficeSchema } from '../../../api/branchOffices/Offices';
import municipalities from '../../../api/municipalities/municipality';

Template.addBranchOffice.helpers({
  branchOfficeSchema: () => branchOfficeSchema,
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityOffice', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityOffice', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityOffice')
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
