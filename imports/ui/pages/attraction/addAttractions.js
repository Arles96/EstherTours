import './addAttractions.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { AttractionSchema } from '../../../api/attractions/attractions';
import municipalities from '../../../api/municipalities/municipality';
import { Guide } from '../../../api/guide/guide';

Template.addAttractions.helpers({
  AttractionSchema: () => AttractionSchema,
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityAttraction', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityAttraction', '(Seleccione Departamento)');
      return [];
    }
  },
  data: () => Guide.find().map(doc => ({
    value: doc._id,
    label: doc.name
  })),
  firstOption: () => Session.get('firstOptionMunicipalityAttraction')
});

Template.addAttractions.events({
});

AutoForm.addHooks('addAttractionsForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado la atraccion exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
