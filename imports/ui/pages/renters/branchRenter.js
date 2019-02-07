import './branchRenter.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RentersSchema } from '../../../api/renters/renters';
import municipalities from '../../../api/municipalities/municipality';

Template.branchRenter.helpers({
  RentersSchema: () => RentersSchema,
  rating: () => Session.get('branchRenterRating'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityRenter', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityRenter', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityRenter'),
  textCategorization: function (text) {
    Session.set('branchRenterRating', text);
    return 'Categorización';
  }
});

Template.branchRenter.events({
  'change .categorization [type=radio]' (event) {
    Session.set('branchRenterRating', event.currentTarget.value);
  }
});

AutoForm.addHooks('branchRentersForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la sucursal de la arrendadora exitosamente.');
    Router.go('/list-renters');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

Template.updateBranchStarRenter.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('branchRenterRating'), 10)) {
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

Template.updateBranchStarRenter.events({
  'click #start1': function () {
    Session.set('branchRenterRating', '1');
  },
  'click #start2': function () {
    Session.set('branchRenterRating', '2');
  },
  'click #start3': function () {
    Session.set('branchRenterRating', '3');
  },
  'click #start4': function () {
    Session.set('branchRenterRating', '4');
  },
  'click #start5': function () {
    Session.set('branchRenterRating', '5');
  }
});
