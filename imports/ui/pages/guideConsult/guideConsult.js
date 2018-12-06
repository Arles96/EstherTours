import './guideConsult.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import GuideConsultSchema from '../../../api/guideConsult/guideConsult';

Template.guideConsult.helpers({
  GuideConsultSchema: () => GuideConsultSchema,
  categorization: () => Session.get('guideCategorization')
});

Template.guideConsult.events({
  'change .categorization [type=radio]' (event) {
    Session.set('guideCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('guideConsultForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha logrado consultar el registro del guía exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
