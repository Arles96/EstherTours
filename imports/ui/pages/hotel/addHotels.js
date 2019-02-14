import './addHotels.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { HotelSchema } from '../../../api/hotels/hotels';
import municipalities from '../../../api/municipalities/municipality';
import HotelImage from '../../../api/hotels/hotelImage';

window.HotelImage = HotelImage;

Template.addHotels.helpers({
  HotelSchema: () => HotelSchema,
  categorization: () => Session.get('hotelCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityHotel', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityHotel', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityHotel')
});

Template.addHotels.events({
  'change .categorization [type=radio]' (event) {
    Session.set('hotelCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('addHotelsForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el hotel exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
