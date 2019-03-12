import './editTours.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { ToursSchema } from '../../../api/tours/tours';
import municipalities from '../../../api/municipalities/municipality';
import { Guide } from '../../../api/guide/guide';
import ToursImages from '../../../api/tours/toursImage';

window.ToursImages = ToursImages;

Template.editTours.helpers({
  ToursSchema: () => ToursSchema,
  categorization: () => Session.get('editTourCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditTour', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditTour', '(Seleccione Departamento)');
      return [];
    }
  },
  data: () => Guide.find().map(doc => ({
    value: doc._id,
    label: doc.name
  })),
  firstOption: () => Session.get('firstOptionMunicipalityEditTour'),
  textCategorization: function (text) {
    Session.set('editTourCategorization', text);
    return 'Categorización';
  }
});

AutoForm.addHooks('editToursForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro exitosamente.');
    Router.go('/list-tours');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

Template.updateStarTour.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('editTourCategorization'), 10)) {
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

Template.updateStarTour.events({
  'click #start1': function () {
    Session.set('editTourCategorization', '1');
  },
  'click #start2': function () {
    Session.set('editTourCategorization', '2');
  },
  'click #start3': function () {
    Session.set('editTourCategorization', '3');
  },
  'click #start4': function () {
    Session.set('editTourCategorization', '4');
  },
  'click #start5': function () {
    Session.set('editTourCategorization', '5');
  }
});
