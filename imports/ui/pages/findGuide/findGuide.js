import './findGuide.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import GuideConsultSchema from '../../../api/guide/guideConsult';

Template.findGuide.helpers({
  GuideConsultSchema: () => GuideConsultSchema,
  categorization: () => Session.get('findGuideCategorization')
});

Template.findGuide.events({
  'change .categorization [type=radio]' (event) {
    Session.set('findGuideCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('findGuideForm', {
  onSuccess: function (formtype, result) {
    Session.set('findGuideCategorization', undefined);
    Session.set('resultFindGuide', result);
    Router.go('resultGuide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
