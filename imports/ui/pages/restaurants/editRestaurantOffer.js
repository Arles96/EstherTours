import './editRestaurantOffer.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { restaurantOffersSchema } from '../../../api/restaurants/restaurantOffers';

Template.editRestaurantOffer.helpers({
  restaurantOffersSchema: () => restaurantOffersSchema,
  restaurantOffers: () => Session.get('restaurantOffers')
});

AutoForm.addHooks('editOffersForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la oferta exitosamente.');
    $('#editRestaurantOffer').modal('hide');
  },
  onError: function (formtype, error) {
    console.log(error);
    toastr.error(error);
  }
});
