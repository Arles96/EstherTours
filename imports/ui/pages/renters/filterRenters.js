import './filterRenters.html';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Renters } from '../../../api/renters/renters';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';

// TODO mostrar por paginas

Template.filterRenters.onCreated(function createVars () {
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterRenterStars', '0');
});

Template.filterRenters.helpers({
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

    const queryR = {
      name: new RegExp(`.*${name}.*`, 'i'),
      street: new RegExp(`.*${street}.*`, 'i'),
      city: new RegExp(`.*${city}.*`, 'i')
    };

    if (Session.get('filterRenterStars')) {
      queryR.categorization = Session.get('filterRenterStars');
    }

    if (department) {
      queryR.department = department;
    }

    if (municipality) {
      queryR.municipality = municipality;
    }

    return Renters
      .find(queryR)
      .map(doc => doc);
  }
});

Template.filterRenters.events({
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

Template.filterResultRenter.helpers({
  first (index) {
    return index === 0;
  },
  urlTag (url) {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  }
});

Template.filterStarRenter.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('filterRenterStars'), 10)) {
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

Template.filterStarRenter.events({
  'click #star1': function () {
    Session.set('filterRenterStars', '1');
  },
  'click #star2': function () {
    Session.set('filterRenterStars', '2');
  },
  'click #star3': function () {
    Session.set('filterRenterStars', '3');
  },
  'click #star4': function () {
    Session.set('filterRenterStars', '4');
  },
  'click #star5': function () {
    Session.set('filterRenterStars', '5');
  }
});
