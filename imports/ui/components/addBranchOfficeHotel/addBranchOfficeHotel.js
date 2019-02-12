import './addBranchOfficeHotel.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { BranchOfficeHotelSchema } from '../../../api/hotels/branchofficehotel';
import municipalities from '../../../api/municipalities/municipality';

Template.addBranchHotel.helpers({
  // categorization: () => Session.get('hotelBranchCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityBranchHotel', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityBranchHotel', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityBranchHotel'),
  BranchOfficeHotelSchema: () => BranchOfficeHotelSchema,
  idHotel: () => Session.get('idHotel')
});

/* Template.addBranchHotel.events({
  'change .categorization [type=radio]' (event) {
    Session.set('hotelCategorization', event.currentTarget.value);
  }
}); */

AutoForm.addHooks('addBranchForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la habitación exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
