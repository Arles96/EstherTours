import './editAttractions.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { AttractionSchema } from '../../../api/attractions/attractions';
import municipalities from '../../../api/municipalities/municipality';
import { Guide } from '../../../api/guide/guide';
import AttractionImages from '../../../api/attractions/attractionImage';

window.AttractionImages = AttractionImages;

Template.editAttractions.helpers({
  AttractionSchema: () => AttractionSchema,
  categorization: () => Session.get('editAttractionCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditAttraction', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditAttraction', '(Seleccione Departamento)');
      return [];
    }
  },
  data: () => Guide.find().map(doc => ({
    value: doc._id,
    label: doc.name
  })),
  firstOption: () => Session.get('firstOptionMunicipalityEditAttraction'),
  textCategorization: function (text) {
    Session.set('editAttractionCategorization', text);
    return 'Categorización';
  }
});

AutoForm.addHooks('editAttractionForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro de la atraccion exitosamente.');
    Router.go('/list-attractions');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

Template.updateStarAttraction.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('editAttractionCategorization'), 10)) {
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

Template.updateStarAttraction.events({
  'click #start1': function () {
    Session.set('editAttractionCategorization', '1');
  },
  'click #start2': function () {
    Session.set('editAttractionCategorization', '2');
  },
  'click #start3': function () {
    Session.set('editAttractionCategorization', '3');
  },
  'click #start4': function () {
    Session.set('editAttractionCategorization', '4');
  },
  'click #start5': function () {
    Session.set('editAttractionCategorization', '5');
  }
});
