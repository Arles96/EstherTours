import './editRestaurantOffer.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { restaurantOffersSchema } from '../../../api/restaurants/restaurantOffers';

Template.editRestaurantOffer.helpers({
  restaurantOffersSchema: () => restaurantOffersSchema,
  fleetRenter: () => Session.get('fleetRenter')
});

AutoForm.addHooks('editFleetForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la flota exitosamente.');
    $('#editRestaurantOffer').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
