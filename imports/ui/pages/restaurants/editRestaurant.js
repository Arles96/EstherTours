import './editRestaurant.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RestaurantSchema } from '../../../api/restaurants/restaurants';

Template.editRestaurant.helpers({
  RestaurantSchema: () => RestaurantSchema,
  categorization: () => Session.get('editRestaurantRating')
});

Template.editRestaurant.events({
  'change .categorization [type=radio]' (event) {
    Session.set('editRestaurantRating', event.currentTarget.value);
  }
});

AutoForm.addHooks('editRestaurantsForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro del restaurante exitosamente.');
    Router.go('/list-renters');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
