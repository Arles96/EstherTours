import './addRoomHotel.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RoomHotelSchema } from '../../../api/hotels/roomhotel';

Template.addRoomHotel.helpers({
  RoomHotelSchema: () => RoomHotelSchema,
  idHotel: () => Session.get('idHotel')
});

AutoForm.addHooks('addRoomHotel', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la habitación exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
