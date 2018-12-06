import './findTransport.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import TransportConsultSchema from '../../../api/TransportationEstablishment/transportConsult';

Template.findTransport.helpers({
  TransportConsultSchema: () => TransportConsultSchema,
  categorization: () => Session.get('transportCategorization')
});

Template.findTransport.events({
  'change .categorization [type=radio]' (event) {
    Session.set('transportCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('findTransportForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado el establecimiento de transporte exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
