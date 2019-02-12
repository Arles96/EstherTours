import './editBranchHotel.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { BranchOfficeHotelSchema } from '../../../api/hotels/branchofficehotel';

Template.editBranchHotel.helpers({
  // categorization: () => Session.get('hotelBranchCategorization'),
  BranchOfficeHotelSchema: () => BranchOfficeHotelSchema,
  branchHotel: () => Session.get('brachHotel')
});

AutoForm.addHooks('editBranchForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la sucursal exitosamente.');
    $('#editBranchHotel').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
