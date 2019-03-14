import './addTours.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { ToursSchema } from '../../../api/tours/tours';
import municipalities from '../../../api/municipalities/municipality';
import { Guide } from '../../../api/guide/guide';
import ToursImages from '../../../api/tours/toursImage';

window.ToursImages = ToursImages;

Template.addTours.helpers({
  ToursSchema: () => ToursSchema,
  categorization: () => Session.get('tourCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityTours', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityTours', '(Seleccione Departamento)');
      return [];
    }
  },
  data: () => Guide.find().map(doc => ({
    value: doc._id,
    label: doc.name
  })),
  firstOption: () => Session.get('firstOptionMunicipalityTours')
});

Template.addTours.events({
  'change .categorization [type=radio]' (event) {
    Session.set('tourCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('addToursForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado la excursión exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
