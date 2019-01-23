import './editAttraction.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { AttractionSchema } from '../../../api/attractions/attractions';
import municipalities from '../../../api/municipalities/municipality';

Template.editAttraction.helpers({
  AttractionSchema: () => AttractionSchema,
  categorization: () => Session.get('editAttractionCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditAttraction', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditAttraction', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditAttraction')
});

Template.editAttraction.events({
  'change .categorization [type=radio]' (event) {
    Session.set('editAttractionCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('editAttractionForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro de la atraccion exitosamente.');
    Router.go('/list-attractions');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
