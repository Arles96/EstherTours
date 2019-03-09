import './filterRestaurants.html';
import Swal from 'sweetalert2';
import XLSX from 'xlsx';
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
  this.facilityPeople = new ReactiveVar('');
  this.bar = new ReactiveVar('');
  this.waitingRoom = new ReactiveVar('');
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
  },
  'click #export-filtered' (event, templateInstance) {
    Swal({
      title: 'Exportar datos a Excel',
      text: '¿Está seguro de exportar los restaurantes a Excel?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        const name = templateInstance.name.get();
        const street = templateInstance.street.get();
        const city = templateInstance.city.get();
        const department = templateInstance.department.get();
        const municipality = templateInstance.municipality.get();
        const numbersTables = templateInstance.numbersTables.get();
        const numbersChairs = templateInstance.numbersChairs.get();
        const numbersChairsBabies = templateInstance.numbersChairsBabies.get();
        const maxPersonCapacity = templateInstance.maxPersonCapacity.get();
        const facilityPeople = templateInstance.facilityPeople.get();
        const bar = templateInstance.bar.get();
        const waitingRoom = templateInstance.waitingRoom.get();

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

        Meteor.call('exportRestaurantsToExcel', query, (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            const filename = `Restaurantes ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filename);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});

Template.filterResultRestaurant.helpers({
  urlTag (url) {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  },
  findImg (_id) {
    return RestaurantImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
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
