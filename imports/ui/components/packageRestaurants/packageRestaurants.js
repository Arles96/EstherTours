import './packageRestaurants.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Restaurants } from '../../../api/restaurants/restaurants';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import RestaurantImages from '../../../api/restaurants/restaurantImage';

const sliderVals = {
  tablesMax: 50,
  tablesStep: 10,
  chairsMax: 200,
  chairsStep: 10,
  babiesMax: 50,
  babiesStep: 5,
  personMax: 300,
  personStep: 10
};

Template.packageRestaurants.onCreated(function createVars () {
  const maxNumbersTables = Restaurants.findOne({}, { sort: { numbersTables: -1 } });
  const maxNumbersChairs = Restaurants.findOne({}, { sort: { numbersChairs: -1 } });
  const maxNumbersChairsBabies = Restaurants.findOne({}, { sort: { numbersChairsBabies: -1 } });
  const maxPersonCapacity = Restaurants.findOne({}, { sort: { maxPersonCapacity: -1 } });

  if (maxNumbersTables) {
    sliderVals.tablesMax = Math.round(maxNumbersTables.numbersTables * 1.2);
    sliderVals.tablesStep = Math.round((maxNumbersTables.numbersTables * 1.2) / 10);
  }

  if (maxNumbersChairs) {
    sliderVals.chairsMax = Math.round(maxNumbersChairs.numbersChairs * 1.2);
    sliderVals.chairsStep = Math.round((maxNumbersChairs.numbersChairs * 1.2) / 10);
  }

  if (maxNumbersChairsBabies) {
    sliderVals.babiesMax = Math.round(maxNumbersChairsBabies.numbersChairsBabies * 1.2);
    sliderVals.babiesStep = Math.round((maxNumbersChairsBabies.numbersChairsBabies * 1.2) / 10);
  }

  if (maxPersonCapacity) {
    sliderVals.personMax = Math.round(maxPersonCapacity.maxPersonCapacity * 1.2);
    sliderVals.personStep = Math.round((maxPersonCapacity.maxPersonCapacity * 1.2) / 10);
  }

  this.numbersTables = new ReactiveVar(Math.round(sliderVals.tablesMax / 4));
  this.numbersChairs = new ReactiveVar(Math.round(sliderVals.chairsMax / 4));
  this.numbersChairsBabies = new ReactiveVar(Math.round(sliderVals.babiesMax / 4));
  this.maxPersonCapacity = new ReactiveVar(Math.round(sliderVals.personMax / 4));
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  this.facilityPeople = new ReactiveVar('');
  this.bar = new ReactiveVar('');
  this.waitingRoom = new ReactiveVar('');
  Session.set('packageRestaurantStars', undefined);
});

Template.packageRestaurants.helpers({
  sliderVals () {
    return sliderVals;
  },
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
  facilityPeople () {
    return Template.instance().facilityPeople.get();
  },
  bar () {
    return Template.instance().bar.get();
  },
  waitingRoom () {
    return Template.instance().waitingRoom.get();
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
    const facilityPeople = Template.instance().facilityPeople.get();
    const bar = Template.instance().bar.get();
    const waitingRoom = Template.instance().waitingRoom.get();

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

    if (facilityPeople === 'true') {
      query.facilityPeople = true;
    }

    if (bar === 'true') {
      query.bar = true;
    }

    if (waitingRoom === 'true') {
      query.waitingRoom = true;
    }

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
  'change #facilityPeople' (event, templateInstance) {
    templateInstance.facilityPeople.set(event.currentTarget.value);
  },
  'change #bar' (event, templateInstance) {
    templateInstance.bar.set(event.currentTarget.value);
  },
  'change #waitingRoom' (event, templateInstance) {
    templateInstance.waitingRoom.set(event.currentTarget.value);
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
  urlTag (url) {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  },
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
  'click #packageAddRestaurant' () {
    Session.set('packageRestaurantId', this._id);
    toastr.info('Se guardo el restaurante al paquete!');
  },
  'click #packageRemoveRestaurant' () {
    Session.set('packageRestaurantId', null);
    toastr.info('Se quito el restaurante del paquete!');
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
