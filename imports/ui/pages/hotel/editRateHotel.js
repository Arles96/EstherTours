import './editRateHotel.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RateHotelSchema } from '../../../api/hotels/ratehotel';

Template.editRateHotel.helpers({
  RateHotelSchema: () => RateHotelSchema,
  rateHotel: () => Session.get('rateHotel')
});

AutoForm.addHooks('editRateHotel', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la tarifa exitosamente.');
    $('#editRateHotel').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
