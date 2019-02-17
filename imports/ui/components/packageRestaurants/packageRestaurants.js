import './packageRestaurants.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Restaurants } from '../../../api/restaurants/restaurants';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import RestaurantImages from '../../../api/restaurants/restaurantImage';

// TODO mostrar por paginas

Template.packageRestaurants.onCreated(function createVars () {
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('packageRestaurantStars', undefined);
});

Template.packageRestaurants.helpers({
  name () {
    return Template.instance().name.get();
  },
  street () {
    return Template.instance().street.get();
  },
  city () {
    return Template.instance().city.get();
  },
  department () {
    return Template.instance().department.get();
  },
  municipality () {
    return Template.instance().municipality.get();
  },
  listDepartment () {
    return departments;
  },
  listMunicipality () {
    const department = Template.instance().department.get();
    return municipalities[department];
  },
  deptSelected () {
    const department = Template.instance().department.get();
    return department !== '';
  },
  buscar () {
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();

    const query = {};

    if (Session.get('packageRestaurantStars')) {
      query.rating = Session.get('packageRestaurantStars');
    }

    if (name) {
      query.name = new RegExp(`.*${name}.*`, 'i');
    }

    if (street) {
      query.street = new RegExp(`.*${street}.*`, 'i');
    }

    if (city) {
      query.city = new RegExp(`.*${city}.*`, 'i');
    }

    if (department) {
      query.department = department;
    }

    if (municipality) {
      query.municipality = municipality;
    }

    return Restaurants
      .find(query)
      .map(doc => doc);
  }
});

Template.packageRestaurants.events({
  'input #sliderMax' (event, templateInstance) {
    templateInstance.precioMax.set(event.currentTarget.value);
  },
  'input #name' (event, templateInstance) {
    templateInstance.name.set(event.currentTarget.value);
  },
  'input #street' (event, templateInstance) {
    templateInstance.street.set(event.currentTarget.value);
  },
  'input #city' (event, templateInstance) {
    templateInstance.city.set(event.currentTarget.value);
  },
  'change #department' (event, templateInstance) {
    templateInstance.department.set(event.currentTarget.value);
    templateInstance.municipality.set('');
  },
  'change #municipality' (event, templateInstance) {
    templateInstance.municipality.set(event.currentTarget.value);
  }
});

Template.packageResultRestaurant.helpers({
  selected (id) {
    return id === Session.get('packageRestaurantId');
  },
  findImg (_id) {
    return RestaurantImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});

Template.packageResultRestaurant.events({
  'click #packageAddRestaurant' (event, templateInstance) {
    Session.set('packageRestaurantId', this._id);
    toastr.info('Se guardo el restaurante al paquete!');
  }
});

Template.packageStarRestaurant.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('packageRestaurantStars'), 10)) {
        list.push({
          class: 'fas fa-star colorOrange',
          id: `star${index}`
        });
      } else {
        list.push({
          class: 'fas fa-star',
          id: `star${index}`
        });
      }
    }
    return list;
  }
});

Template.packageStarRestaurant.events({
  'click #star1': function () {
    Session.set('packageRestaurantStars', '1');
  },
  'click #star2': function () {
    Session.set('packageRestaurantStars', '2');
  },
  'click #star3': function () {
    Session.set('packageRestaurantStars', '3');
  },
  'click #star4': function () {
    Session.set('packageRestaurantStars', '4');
  },
  'click #star5': function () {
    Session.set('packageRestaurantStars', '5');
  }
});
