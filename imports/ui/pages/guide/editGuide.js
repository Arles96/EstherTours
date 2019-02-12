import './editGuide.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { GuideSchema } from '../../../api/guide/guide';
import municipalities from '../../../api/municipalities/municipality';

Template.editGuide.helpers({
  GuideSchema: () => GuideSchema,
  categorization: () => Session.get('editGuideCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditGuide', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditGuide', '(Seleccione Departamento)');
      return [];
    }
  },
  labelCategortization: function (categorization) {
    Session.set('editGuideCategorization', categorization);
    return 'Categorización';
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditGuide')
});

AutoForm.addHooks('editGuideForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro del guía exitosamente.');
    Router.go('/list-guide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

Template.updateStarGuide.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('editGuideCategorization'), 10)) {
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

Template.updateStarGuide.events({
  'click #start1': function () {
    Session.set('editGuideCategorization', '1');
  },
  'click #start2': function () {
    Session.set('editGuideCategorization', '2');
  },
  'click #start3': function () {
    Session.set('editGuideCategorization', '3');
  },
  'click #start4': function () {
    Session.set('editGuideCategorization', '4');
  },
  'click #start5': function () {
    Session.set('editGuideCategorization', '5');
  }
});
