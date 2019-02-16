import './editRenter.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RentersSchema } from '../../../api/renters/renters';
import municipalities from '../../../api/municipalities/municipality';

Template.editRenter.helpers({
  RentersSchema: () => RentersSchema,
  categorization: () => Session.get('editRenterCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditRenter', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditRenter', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditRenter'),
  textCategorization: function (text) {
    Session.set('editRenterCategorization', text);
    return 'Categorización';
  }
});

AutoForm.addHooks('editRentersForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro de la arrendadora exitosamente.');
    if (this.currentDoc.branchOffice) {
      Router.go(`/show-renter/${this.currentDoc.mainOffice}`);
    } else {
      Router.go('/list-renters');
    }
  },
  onError: function (formtype, error) {
    if (error.error === 'Repeated Branch') {
      toastr.error(new Error('Ya existe una sucursal con esas direcciones!'));
    } else {
      toastr.error(error);
    }
  }
});

Template.updateStarRenter.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('editRenterCategorization'), 10)) {
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

Template.updateStarRenter.events({
  'click #start1': function () {
    Session.set('editRenterCategorization', '1');
  },
  'click #start2': function () {
    Session.set('editRenterCategorization', '2');
  },
  'click #start3': function () {
    Session.set('editRenterCategorization', '3');
  },
  'click #start4': function () {
    Session.set('editRenterCategorization', '4');
  },
  'click #start5': function () {
    Session.set('editRenterCategorization', '5');
  }
});
