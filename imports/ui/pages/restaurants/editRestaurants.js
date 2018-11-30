import './addRestaurant.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RestaurantSchema } from '../../../api/restaurants/restaurants';

Template.addRestaurant.helpers({
  RestaurantSchema: () => RestaurantSchema,
  rating: () => Session.get('rating')
});

Template.addRestaurant.events({
  'change .categorization [type=radio]' (event) {
    Session.set('editRating', event.currentTarget.value);
  }
});

AutoForm.addHooks('addRestaurantsForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro del restaurante exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
