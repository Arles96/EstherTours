import './addRestaurant.html';
import toastr from 'toastr';
import { RestaurantSchema } from '../../../api/restaurants/restaurants';

Template.addRestaurant.helpers({
  RestaurantSchema: () => RestaurantSchema
});

AutoForm.addHooks('addRestaurantForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el registro del restaurante exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
