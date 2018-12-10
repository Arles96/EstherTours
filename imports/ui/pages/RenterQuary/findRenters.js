import './findRenters.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import RentersQuarySchema from '../../../api/renters/rentersQuary';

Template.findRenters.helpers({
  RentersQuarySchema: () => RentersQuarySchema,
  categorization: () => Session.get('categorization')
});

Template.findRenters.events({
  'change .categorization [type=radio]' (event) {
    Session.set('categorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('findRentersForms', {
  onSuccess: function (formtype, result) {
    console.log(result);
    toastr.success('Elemento buscado');
    Session.set('findRenter', result);
    Router.go('/show-renterQuary');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
