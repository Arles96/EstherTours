import './addHotels.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { HotelSchema } from '../../../api/hotels/hotels';

Template.addHotels.helpers({
  HotelSchema: () => HotelSchema,
  categorization: () => Session.get('hotelCategorization')
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
