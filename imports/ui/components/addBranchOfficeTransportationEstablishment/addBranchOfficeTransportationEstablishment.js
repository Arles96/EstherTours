import './addBranchOfficeTransportationEstablishment.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { BranchOfficeTransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/BranchOfficeTransportationEstablishment';
import municipalities from '../../../api/municipalities/municipality';

Template.addBranchOfficeTransportationEstablishment.helpers({
  BranchOfficeTransportationEstablishmentSchema:
    () => BranchOfficeTransportationEstablishmentSchema,
  idTransportationEstablishment: () => Session.get('idTransportationEstablishment'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditBranchOfficeTransportationEstablishment', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditBranchOfficeTransportationEstablishment', '(Seleccione Departamento)');
      return [];
    }
  },
  labelCategortization: function (categorization) {
    Session.set('editBranchOfficeTransportationEstablishmentCategorization', categorization);
    return 'Categorización';
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditBranchOfficeTransportationEstablishment')
});

AutoForm.addHooks('addBranchOfficeTransportationEstablishmentForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la sucursal exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

Template.updateStarBranchOfficeTransportationEstablishment.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('editBranchOfficeTransportationEstablishmentCategorization'), 10)) {
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

Template.updateStarBranchOfficeTransportationEstablishment.events({
  'click #start1': function () {
    Session.set('editBranchOfficeTransportationEstablishmentCategorization', '1');
  },
  'click #start2': function () {
    Session.set('editBranchOfficeTransportationEstablishmentCategorization', '2');
  },
  'click #start3': function () {
    Session.set('editBranchOfficeTransportationEstablishmentCategorization', '3');
  },
  'click #start4': function () {
    Session.set('editBranchOfficeTransportationEstablishmentCategorization', '4');
  },
  'click #start5': function () {
    Session.set('editBranchOfficeTransportationEstablishmentCategorization', '5');
  }
});
