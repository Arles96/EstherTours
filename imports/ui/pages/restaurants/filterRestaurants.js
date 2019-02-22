import './filterRestaurants.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Restaurants } from '../../../api/restaurants/restaurants';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import RestaurantImages from '../../../api/restaurants/restaurantImage';

Template.filterRestaurants.onCreated(function createVars () {
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  this.numbersTables = new ReactiveVar(50);
  this.numbersChairs = new ReactiveVar(50);
  this.numbersChairsBabies = new ReactiveVar(50);
  this.maxPersonCapacity = new ReactiveVar(50);
  Session.set('filterRestaurantStars', undefined);
});

Template.filterRestaurants.helpers({
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
  numbersTables () {
    return Template.instance().numbersTables.get();
  },
  numbersChairs () {
    return Template.instance().numbersChairs.get();
  },
  numbersChairsBabies () {
    return Template.instance().numbersChairsBabies.get();
  },
  maxPersonCapacity () {
    return Template.instance().maxPersonCapacity.get();
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
    const numbersTables = Template.instance().numbersTables.get();
    const numbersChairs = Template.instance().numbersChairs.get();
    const numbersChairsBabies = Template.instance().numbersChairsBabies.get();
    const maxPersonCapacity = Template.instance().maxPersonCapacity.get();

    const query = {
      numbersTables: {
        $lte: parseInt(numbersTables, 10)
      },
      numbersChairs: {
        $lte: parseInt(numbersChairs, 10)
      },
      numbersChairsBabies: {
        $lte: parseInt(numbersChairsBabies, 10)
      },
      maxPersonCapacity: {
        $lte: parseInt(maxPersonCapacity, 10)
      }
    };

    if (Session.get('filterRestaurantStars')) {
      query.rating = Session.get('filterRestaurantStars');
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

Template.filterRestaurants.events({
  'input #sliderNumbersTables' (event, templateInstance) {
    templateInstance.numbersTables.set(event.currentTarget.value);
  },
  'input #sliderNumbersChairs' (event, templateInstance) {
    templateInstance.numbersChairs.set(event.currentTarget.value);
  },
  'input #sliderNumbersChairsBabies' (event, templateInstance) {
    templateInstance.numbersChairsBabies.set(event.currentTarget.value);
  },
  'input #sliderMaxPersonCapacity' (event, templateInstance) {
    templateInstance.maxPersonCapacity.set(event.currentTarget.value);
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

Template.filterResultRestaurant.helpers({
  branches () {
    return Restaurants.find({ branchOffice: true, mainOffice: this._id });
  },
  urlTag (url) {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  },
  selected (id) {
    return id === Session.get('filterRestaurantId');
  },
  findImg (_id) {
    return RestaurantImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});

Template.filterResultRestaurant.events({
  'click #filterAddRestaurant' (event, templateInstance) {
    Session.set('filterRestaurantId', this._id);
    toastr.info('Se guardo el restaurante al paquete!');
  }
});

Template.filterStarRestaurant.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('filterRestaurantStars'), 10)) {
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

Template.filterStarRestaurant.events({
  'click #star1': function () {
    Session.set('filterRestaurantStars', '1');
  },
  'click #star2': function () {
    Session.set('filterRestaurantStars', '2');
  },
  'click #star3': function () {
    Session.set('filterRestaurantStars', '3');
  },
  'click #star4': function () {
    Session.set('filterRestaurantStars', '4');
  },
  'click #star5': function () {
    Session.set('filterRestaurantStars', '5');
  }
});
