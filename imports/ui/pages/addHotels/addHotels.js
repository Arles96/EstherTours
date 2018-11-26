import './addHotels.html';
import toastr from 'toastr';
import { HotelSchema } from '../../../api/hotels/hotels';

Template.addHotels.helpers({
  HotelSchema: () => HotelSchema
});

AutoForm.addHooks('addHotelsForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el hotel exitosamente.');
  },
  onError: function (formtype, error) {
    if (error.error === 403) {
      toastr.error('Error el correo ya existe.');
    } else {
      toastr.error(error);
    }
  }
});
