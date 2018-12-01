import './editHotel.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { HotelSchema } from '../../../api/hotels/hotels';

Template.editHotel.helpers({
  HotelSchema: () => HotelSchema,
  categorization: () => Session.get('editHotelCategorization')
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
