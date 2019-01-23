import './findRenters.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import RentersQuarySchema from '../../../api/renters/rentersQuary';
import municipalities from '../../../api/municipalities/municipality';

Template.findRenters.helpers({
  RentersQuarySchema: () => RentersQuarySchema,
  categorization: () => Session.get('categorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityRenter', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityRenter', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityRenter')
});
Template.findRenters.events({
  'change .categorization [type=radio]' (event) {
    Session.set('categorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('findRentersForms', {
  onSuccess: function (formtype, result) {
    Session.set('categorization', undefined);
    Session.set('findRenter', result);
    Router.go('/show-renterQuary');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
