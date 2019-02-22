import './addRestaurantOffer.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { restaurantOffersSchema } from '../../../api/restaurants/restaurantOffers';

Template.addRestaurantOffer.helpers({
  restaurantOffersSchema: () => restaurantOffersSchema,
  idRestaurant: () => Session.get('idRestaurant')
});

AutoForm.addHooks('addOffersForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la oferta exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
