import './findTransport.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import TransportConsultSchema from '../../../api/TransportationEstablishment/transportConsult';
import municipalities from '../../../api/municipalities/municipality';

Template.findTransport.helpers({
  TransportConsultSchema: () => TransportConsultSchema,
  categorization: () => Session.get('findTransportCategorization'),
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
