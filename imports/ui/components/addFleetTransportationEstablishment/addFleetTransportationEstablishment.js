import './addFleetTransportationEstablishment.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { FleetTransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/FleetTransportationEstablishment';

Template.addFleetTransportationEstablishment.helpers({
  FleetTransportationEstablishmentSchema: () => FleetTransportationEstablishmentSchema,
  idTransportationEstablishment: () => Session.get('idTransportationEstablishment')
});

AutoForm.addHooks('addTransportationEstablishmentFleetForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la flota exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
