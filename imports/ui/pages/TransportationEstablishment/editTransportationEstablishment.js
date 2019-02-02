import './editTransportationEstablishment.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { TransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import municipalities from '../../../api/municipalities/municipality';
import TransportationImage from '../../../api/TransportationEstablishment/transportationImage';

window.TransportationImage = TransportationImage;

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
  firstOption: () => Session.get('firstOptionMunicipalityEditTransport'),
  textCategorization: function (text) {
    Session.set('editTransportationEstablishmentCategorization', text);
    return 'Categorización';
  }
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

Template.updateStarTransport.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('editTransportationEstablishmentCategorization'), 10)) {
        list.push({
          class: 'fas fa-star colorOrange',
          id: `start${index}`
        });
      } else {
        list.push({
          class: 'fas fa-star',
          id: `start${index}`
        });
      }
    }
    return list;
  }
});

Template.updateStarTransport.events({
  'click #start1': function () {
    Session.set('editTransportationEstablishmentCategorization', '1');
  },
  'click #start2': function () {
    Session.set('editTransportationEstablishmentCategorization', '2');
  },
  'click #start3': function () {
    Session.set('editTransportationEstablishmentCategorization', '3');
  },
  'click #start4': function () {
    Session.set('editTransportationEstablishmentCategorization', '4');
  },
  'click #start5': function () {
    Session.set('editTransportationEstablishmentCategorization', '5');
  }
});
