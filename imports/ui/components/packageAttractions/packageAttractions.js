import './packageAttractions.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Attractions } from '../../../api/attractions/attractions';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import AttractionImages from '../../../api/attractions/attractionImage';

Template.packageAttractions.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(2500);
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('packageAttractionStars', '');
});

Template.packageAttractions.helpers({
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
  buscar () {
    const precioMax = Template.instance().precioMax.get();
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();
    const query = {};
    if (name) {
      query.name = new RegExp(`.*${name}.*`, 'i');
    }
    if (precioMax) {
      query.price = {
        $lt: parseInt(precioMax, 10)
      };
    }
    if (Session.get('packageAttractionStars')) {
      query.categorization = Session.get('packageAttractionStars');
    }
    if (department) {
      query.departament = department;
    }
    if (municipality) {
      query.municipality = municipality;
    }
    if (street) {
      query.street = new RegExp(`.*${street}.*`, 'i');
    }
    if (city) {
      query.city = new RegExp(`.*${city}.*`, 'i');
    }
    return Attractions
      .find(query, { sort: { price: 1 } })
      .map(doc => doc);
  }
});

Template.packageAttractions.events({
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

Template.packageResultAttraction.helpers({
  selected (id) {
    return id === Session.get('packageAttractionId');
  },
  findImg (_id) {
    return AttractionImages.find({ _id }).map(doc => doc)[0];
  },
  first (index) {
    return index === 0;
  }
});

Template.packageResultAttraction.events({
  'click #packageAddAttraction' () {
    Session.set('packageAttractionId', this._id);
    toastr.info('Se guardo la atraccion al paquete!');
  },
  'click #packageRemoveAttraction' () {
    Session.set('packageAttractionId', null);
    toastr.info('Se quito la atraccion del paquete!');
  }
});

Template.packageStarAttraction.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('packageAttractionStars'), 10)) {
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

Template.packageStarAttraction.events({
  'click #star1': function () {
    Session.set('packageAttractionStars', '1');
  },
  'click #star2': function () {
    Session.set('packageAttractionStars', '2');
  },
  'click #star3': function () {
    Session.set('packageAttractionStars', '3');
  },
  'click #star4': function () {
    Session.set('packageAttractionStars', '4');
  },
  'click #star5': function () {
    Session.set('packageAttractionStars', '5');
  }
});
