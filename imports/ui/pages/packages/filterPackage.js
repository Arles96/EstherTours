import './filterPackage.html';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';

Template.filterPackage.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(2500);
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterPackages', []);
});

Template.filterPackage.helpers({
  precioMax () {
    return Template.instance().precioMax.get();
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
  data () {
    // filtrar por hotel primero
    const precioMax = Template.instance().precioMax.get();
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();
    const queryE = {};
    const queryP = {};
    if (name) {
      queryP.name = new RegExp(`.*${name}.*`, 'i');
    }
    if (street) {
      queryE.street = new RegExp(`.*${street}.*`, 'i');
    }
    if (city) {
      queryE.city = new RegExp(`.*${city}.*`, 'i');
    }
    if (department) {
      queryE.departament = department;
    }
    if (municipality) {
      queryE.municipality = municipality;
    }
    queryP.price = {
      $lte: parseInt(precioMax, 10)
    };
    Meteor.call('filterPackages', { queryE, queryP }, (error, result) => {
      if (!error) {
        Session.set('filterPackages', result);
      }
    });
    return Session.get('filterPackages');
  }
});

Template.filterPackage.events({
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
