import './packageTours.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tours } from '../../../api/tours/tours';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';

const sliderVals = {
  max: 5000,
  step: 100
};

Template.packageTours.onCreated(function createVars () {
  const maxVal = Tours.findOne({}, { sort: { price: -1 } });
  if (maxVal) {
    sliderVals.max = Math.round(maxVal.price * 1.2);
    sliderVals.step = Math.round((maxVal.price * 1.2) / 10);
  }

  this.precioMax = new ReactiveVar(Math.round(sliderVals.max / 4));
  this.title = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('packageTourStars', '');
});

Template.packageTours.helpers({
  sliderVals () {
    return sliderVals;
  },
  precioMax () {
    return Template.instance().precioMax.get();
  },
  title () {
    return Template.instance().title.get();
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
    const title = Template.instance().title.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();
    const query = {};
    if (title) {
      query.title = new RegExp(`.*${title}.*`, 'i');
    }
    if (precioMax) {
      query.price = {
        $lt: parseInt(precioMax, 10)
      };
    }
    if (Session.get('packageTourStars')) {
      query.categorization = Session.get('packageTourStars');
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
    return Tours
      .find(query, { sort: { price: 1 } })
      .map(doc => doc);
  }
});

Template.packageTours.events({
  'input #sliderMax' (event, templateInstance) {
    templateInstance.precioMax.set(event.currentTarget.value);
  },
  'input #title' (event, templateInstance) {
    templateInstance.title.set(event.currentTarget.value);
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

Template.packageResultTours.helpers({
  first (index) {
    return index === 0;
  },
  selected (id) {
    return id === Session.get('packageToursId');
  }
});

Template.packageResultTours.events({
  'click #packageAddTours' () {
    Session.set('packageToursId', this._id);
    toastr.info('Se guardo el restaurante al paquete!');
  },
  'click #packageRemoveTours' () {
    Session.set('packageToursId', null);
    toastr.info('Se quito el restaurante del paquete!');
  }
});

Template.packageStarTours.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('packageTourStars'), 10)) {
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

Template.packageStarTours.events({
  'click #star1': function () {
    Session.set('packageTourStars', '1');
  },
  'click #star2': function () {
    Session.set('packageTourStars', '2');
  },
  'click #star3': function () {
    Session.set('packageTourStars', '3');
  },
  'click #star4': function () {
    Session.set('packageTourStars', '4');
  },
  'click #star5': function () {
    Session.set('packageTourStars', '5');
  }
});
