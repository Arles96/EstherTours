import './addRouteTransportationEstablishment.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RouteTransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/RouteTransportationEstablishment';

Template.addRouteTransportationEstablishment.helpers({
  RouteTransportationEstablishmentSchema: () => RouteTransportationEstablishmentSchema,
  idTransportationEstablishment: () => Session.get('idTransportationEstablishment')
});

AutoForm.addHooks('addTransportationEstablishmentRouteForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la flota exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
