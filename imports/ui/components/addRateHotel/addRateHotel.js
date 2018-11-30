import './addRateHotel.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RateHotelSchema } from '../../../api/hotels/ratehotel';

Template.addRateHotel.helpers({
  RateHotelSchema: () => RateHotelSchema,
  idHotel: () => Session.get('idHotel')
});

AutoForm.addHooks('addRateForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la tarifa exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
