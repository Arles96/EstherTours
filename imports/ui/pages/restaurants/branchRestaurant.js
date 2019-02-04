import './branchRestaurant.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RestaurantSchema, Restaurants } from '../../../api/restaurants/restaurants';
import municipalities from '../../../api/municipalities/municipality';

Template.branchRestaurant.helpers({
  RestaurantSchema: () => RestaurantSchema,
  rating: () => Session.get('branchRestaurantRating'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityRestaurant', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityRestaurant', '(Seleccione Departamento)');
      return [];
    }
  },
  mainOffices: _id => Restaurants.find({ branchOffice: false, _id: { $ne: _id } })
    .map(doc => ({ value: doc._id, label: doc.name })),
  firstOption: () => Session.get('firstOptionMunicipalityRestaurant'),
  textCategorization: function (text) {
    Session.set('branchRestaurantRating', text);
    return 'Categorización';
  }
});

Template.branchRestaurant.events({
  'change .categorization [type=radio]' (event) {
    Session.set('branchRestaurantRating', event.currentTarget.value);
  }
});

AutoForm.addHooks('branchRestaurantsForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la sucursal del restaurante exitosamente.');
    Router.go('/listRestaurants');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

Template.updateBranchStarRestaurant.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('branchRestaurantRating'), 10)) {
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

Template.updateBranchStarRestaurant.events({
  'click #start1': function () {
    Session.set('branchRestaurantRating', '1');
  },
  'click #start2': function () {
    Session.set('branchRestaurantRating', '2');
  },
  'click #start3': function () {
    Session.set('branchRestaurantRating', '3');
  },
  'click #start4': function () {
    Session.set('branchRestaurantRating', '4');
  },
  'click #start5': function () {
    Session.set('branchRestaurantRating', '5');
  }
});
