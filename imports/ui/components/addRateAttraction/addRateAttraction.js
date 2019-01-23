import './addRateAttraction.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RateAttractionSchema } from '../../../api/attractions/rateattraction';

Template.addRateAttraction.helpers({
  RateAttractionSchema: () => RateAttractionSchema,
  idAttraction: () => Session.get('idAttraction')
});

AutoForm.addHooks('addRateForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la tarifa exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
