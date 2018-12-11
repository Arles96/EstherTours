import './findTransport.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import TransportConsultSchema from '../../../api/TransportationEstablishment/transportConsult';

Template.findTransport.helpers({
  TransportConsultSchema: () => TransportConsultSchema,
  categorization: () => Session.get('findTransportCategorization')
});

Template.findTransport.events({
  'change .categorization [type=radio]' (event) {
    Session.set('findTransportCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('findTransportForm', {
  onSuccess: function (formtype, result) {
    Session.set('findTransportCategorization', undefined);
    Session.set('resultFindTransport', result);
    Router.go('resultTransport');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
