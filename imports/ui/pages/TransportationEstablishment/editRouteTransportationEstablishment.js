import './editRouteTransportationEstablishment.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RouteTransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/RouteTransportationEstablishment';

Template.editRouteTransportationEstablishment.helpers({
  RouteTransportationEstablishmentSchema: () => RouteTransportationEstablishmentSchema,
  routeTransportationEstablishment: () => Session.get('routeTransportationEstablishment')
});

AutoForm.addHooks('editRouteForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la flota exitosamente.');
    $('#editRouteTransportationEstablishment').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
