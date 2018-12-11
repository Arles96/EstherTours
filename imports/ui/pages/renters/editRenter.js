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
  },
  loadStars: function (stars) {
    $('p label').css('color: orange');
  }
});

Template.editRenter.events({
  'change .categorization [type=radio]' (event) {
    Session.set('editRenterCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('editRentersForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro de la arrendadora exitosamente.');
    Router.go('/list-renters');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
