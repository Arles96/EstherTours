import './editRateAttraction.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { RateAttractionSchema } from '../../../api/attractions/rateattraction';

Template.editRateAttraction.helpers({
  RateAttractionSchema: () => RateAttractionSchema,
  rateAttraction: () => Session.get('rateAttraction')
});

AutoForm.addHooks('editRateForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la tarifa exitosamente.');
    $('#editRateAttraction').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
