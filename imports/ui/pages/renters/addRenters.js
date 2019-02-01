import './addRenters.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { RentersSchema, Renters } from '../../../api/renters/renters';
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
  mainOffices: () => Renters.find({ branchOffice: false })
    .map(doc => ({ value: doc._id, label: doc.name })),
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
