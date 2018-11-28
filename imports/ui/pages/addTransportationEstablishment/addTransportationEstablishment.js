import './addTransportationEstablishment.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import TransportationEstablishmentSchema from '../../../api/TransportationEstablishment/TransportationEstablishment';


Template.addTransportationEstablishment.helpers({
  TransportationEstablishmentSchema: () => TransportationEstablishmentSchema,
  categorization: () => Session.get('categorization')
});

Template.addTransportationEstablishment.events({
  'change .categorization [type=radio]'(event) {
    Session.set('categorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('addTransportationEstablishmentForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado el establecimiento de transporte exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
