import './consultRestaurant.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { Router } from 'meteor/iron:router';
import RestaurantConsultSchema from '../../../api/restaurants/restaurantConsult';
import municipalities from '../../../api/municipalities/municipality';

Template.consultRestaurant.helpers({
  RestaurantConsultSchema: () => RestaurantConsultSchema,
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

Template.consultRestaurant.events({
  'change .categorization [type=radio]' (event) {
    Session.set('findRestaurantRating', event.currentTarget.value);
  }
});

AutoForm.addHooks('consultRestaurantsForms', {
  onSuccess: function (formtype, result) {
    Session.set('findRestaurantRating', undefined);
    Session.set('restaurantQuery', result);
    Router.go('/show-restaurantResult');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
