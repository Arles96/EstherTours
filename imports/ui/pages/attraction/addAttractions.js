import './addAttractions.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { AttractionSchema } from '../../../api/attractions/attractions';
import municipalities from '../../../api/municipalities/municipality';

Template.addAttractions.helpers({
  AttractionSchema: () => AttractionSchema,
  categorization: () => Session.get('attractionCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityAttraction', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityAttraction', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityAttraction')
});

Template.addAttractions.events({
  'change .categorization [type=radio]' (event) {
    Session.set('attractionCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('addAttractionsForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado la atraccion exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
