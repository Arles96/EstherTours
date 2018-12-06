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
    $('#number').on({
      focus: function (event) {
        $(event.target).select();
      },
      keyup: function (event) {
        $(event.target).val(function (index, value) {
          return value.replace(/\D/g, '')
            .replace(/([0-9])([0-9]{2})$/, '$1.$2')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ',');
        });
      }
    });
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});