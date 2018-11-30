import './editRoomHotel.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RoomHotelSchema } from '../../../api/hotels/roomhotel';

Template.editRoomHotel.helpers({
  RoomHotelSchema: () => RoomHotelSchema,
  roomHotel: () => Session.get('roomHotel')
});

AutoForm.addHooks('editRoomForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la habitación exitosamente.');
    $('#editRoomHotel').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
