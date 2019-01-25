import './attractionQuery.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import AttractionQuerySchema from '../../../api/attractions/attractionQuery';
import municipalities from '../../../api/municipalities/municipality';
import { Guide } from '../../../api/guide/guide';

Template.attractionQuery.helpers({
  AttractionQuerySchema: () => AttractionQuerySchema,
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityAttractionQ', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityAttractionQ', '(Seleccione Departamento)');
      return [];
    }
  },
  data: () => Guide.find().map(doc => ({
    value: doc._id,
    label: doc.name
  })),
  firstOption: () => Session.get('firstOptionMunicipalityAttractionQ')
});

Template.attractionQuery.events({
});

AutoForm.addHooks('attractionQueryForm', {
  onSuccess: function (formtype, result) {
    Session.set('attractionQueryDoc', result);
    Router.go('/show-query-attraction');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
