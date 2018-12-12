import './editHotel.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { HotelSchema } from '../../../api/hotels/hotels';
import municipalities from '../../../api/municipalities/municipality';

Template.editHotel.helpers({
  HotelSchema: () => HotelSchema,
  categorization: () => Session.get('editHotelCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditHotel', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditHotel', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditHotel')
});

Template.editHotel.events({
  'change .categorization [type=radio]' (event) {
    Session.set('editHotelCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('editHotelForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro del hotel exitosamente.');
    Router.go('/list-hotels');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
