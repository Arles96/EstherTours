import './editGuide.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { GuideSchema } from '../../../api/guide/guide';
import municipalities from '../../../api/municipalities/municipality';

Template.editGuide.helpers({
  GuideSchema: () => GuideSchema,
  categorization: () => Session.get('editGuideCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityGuide', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityGuide', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityGuide')
});

Template.editGuide.events({
  'change .categorization [type=radio]' (event) {
    Session.set('editGuideCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('editGuideForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro del guía exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
