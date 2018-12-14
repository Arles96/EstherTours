import './addRenters.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RentersSchema } from '../../../api/renters/renters';
import municipalities from '../../../api/municipalities/municipality';

Template.addRenters.helpers({
  RentersSchema: () => RentersSchema,
  categorization: () => Session.get('categorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityRenter', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityRenter', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityRenter')
});

Template.addRenters.events({
  'change .categorization [type=radio]' (event) {
    Session.set('categorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('addRentersForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el registro de la arrendadora exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
