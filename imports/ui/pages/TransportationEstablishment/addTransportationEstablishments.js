import './addTransportationEstablishments.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { TransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import municipalities from '../../../api/municipalities/municipality';

Template.addTransportationEstablishments.helpers({
  TransportationEstablishmentSchema: () => TransportationEstablishmentSchema,
  categorization: () => Session.get('transportCategorization'),
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

Template.addTransportationEstablishments.events({
  'change .categorization [type=radio]' (event) {
    Session.set('transportCategorization', event.currentTarget.value);
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
