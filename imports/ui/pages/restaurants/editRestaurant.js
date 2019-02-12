import './editRestaurant.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RestaurantSchema } from '../../../api/restaurants/restaurants';
import municipalities from '../../../api/municipalities/municipality';
import RestaurantImage from '../../../api/restaurants/restaurantImage';

window.RestaurantImage = RestaurantImage;

Template.editRestaurant.helpers({
  RestaurantSchema: () => RestaurantSchema,
  rating: () => Session.get('editRestaurantRating'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityRestaurant', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityRestaurant', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityRestaurant'),
  textCategorization: function (text) {
    Session.set('editRestaurantRating', text);
    return 'Categorización';
  }
});

Template.editRestaurant.events({
  'change .categorization [type=radio]' (event) {
    Session.set('editRestaurantRating', event.currentTarget.value);
  }
});

AutoForm.addHooks('editRestaurantsForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro del restaurante exitosamente.');
    Router.go('/listRestaurants');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

Template.updateStarRestaurant.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('editRestaurantRating'), 10)) {
        list.push({
          class: 'fas fa-star colorOrange',
          id: `start${index}`
        });
      } else {
        list.push({
          class: 'fas fa-star',
          id: `start${index}`
        });
      }
    }
    return list;
  }
});

Template.updateStarRestaurant.events({
  'click #start1': function () {
    Session.set('editRestaurantRating', '1');
  },
  'click #start2': function () {
    Session.set('editRestaurantRating', '2');
  },
  'click #start3': function () {
    Session.set('editRestaurantRating', '3');
  },
  'click #start4': function () {
    Session.set('editRestaurantRating', '4');
  },
  'click #start5': function () {
    Session.set('editRestaurantRating', '5');
  }
});
