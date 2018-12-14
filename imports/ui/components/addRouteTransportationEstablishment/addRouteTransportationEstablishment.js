import './addRouteTransportationEstablishment.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RouteTransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/RouteTransportationEstablishment';
import municipalities from '../../../api/municipalities/municipality';

Template.addRouteTransportationEstablishment.helpers({
  RouteTransportationEstablishmentSchema: () => RouteTransportationEstablishmentSchema,
  idTransportationEstablishment: () => Session.get('idTransportationEstablishment'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityTransport', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityTransport', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityTransport')
});

AutoForm.addHooks('addTransportationEstablishmentRouteForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la flota exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
