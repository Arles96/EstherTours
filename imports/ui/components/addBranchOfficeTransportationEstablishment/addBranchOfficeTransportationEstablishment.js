import './addBranchOfficeTransportationEstablishment.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { TransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import municipalities from '../../../api/municipalities/municipality';

Template.addBranchOfficeTransportationEstablishment.helpers({
  BranchOfficeTransportationEstablishmentSchema:
    () => TransportationEstablishmentSchema,
  idTransportationEstablishment: () => Session.get('idTransportationEstablishment'),
  categorization: () => Session.get('branchOfficeTransportCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditBranchOfficeTransportationEstablishment', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditBranchOfficeTransportationEstablishment', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditBranchOfficeTransportationEstablishment'),
  imABranch: true,
  isBranch: function (branchOffice) {
    return !branchOffice;
  }
});

Template.addBranchOfficeTransportationEstablishment.events({
  'change .categorization [type=radio]' (event) {
    Session.set('branchOfficeTransportCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('addBranchOfficeTransportationEstablishmentForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la sucursal exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
