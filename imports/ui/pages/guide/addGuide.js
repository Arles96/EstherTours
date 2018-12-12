import './addGuide.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { GuideSchema } from '../../../api/guide/guide';
import municipalities from '../../../api/municipalities/municipality';

Template.addGuide.helpers({
  GuideSchema: () => GuideSchema,
  categorization: () => Session.get('guideCategorization'),
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

Template.addGuide.events({
  'change .categorization [type=radio]' (event) {
    Session.set('guideCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('addGuideForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el registro del guía exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
