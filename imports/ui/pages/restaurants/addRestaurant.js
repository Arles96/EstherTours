import './addRestaurant.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RestaurantSchema } from '../../../api/restaurants/restaurants';
import municipalities from '../../../api/municipalities/municipality';
import RestaurantImage from '../../../api/restaurants/restaurantImage';

window.RestaurantImage = RestaurantImage;

Template.addRestaurant.helpers({
  RestaurantSchema: () => RestaurantSchema,
  rating: () => Session.get('rating'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityRestaurant', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityRestaurant', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityRestaurant')
});

Template.addRestaurant.events({
  'change .categorization [type=radio]' (event) {
    Session.set('rating', event.currentTarget.value);
  }
});

AutoForm.addHooks('addRestaurantsForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el registro del restaurante exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
