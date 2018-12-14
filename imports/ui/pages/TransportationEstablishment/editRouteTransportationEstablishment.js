import './editRouteTransportationEstablishment.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RouteTransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/RouteTransportationEstablishment';
import municipalities from '../../../api/municipalities/municipality';

Template.editRouteTransportationEstablishment.helpers({
  RouteTransportationEstablishmentSchema: () => RouteTransportationEstablishmentSchema,
  routeTransportationEstablishment: () => Session.get('routeTransportationEstablishment'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditRoute', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditRoute', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditRoute')
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
