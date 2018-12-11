import './editTransportationEstablishment.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { TransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import municipalities from '../../../api/municipalities/municipality';

Template.editTransportationEstablishment.helpers({
  TransportationEstablishmentSchema: () => TransportationEstablishmentSchema,
  categorization: () => Session.get('editTransportationEstablishmentCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditTransport', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditTransport', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditTransport')
});

Template.editTransportationEstablishment.events({
  'change .categorization [type=radio]' (event) {
    Session.set('editTransportationEstablishmentCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('editTransportationEstablishmentsForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro del transporte exitosamente.');
    Router.go('/list-transportation-establishment');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});