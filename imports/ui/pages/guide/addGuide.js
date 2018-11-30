import './addGuide.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { GuideSchema } from '../../../api/guide/guide';

Template.addGuide.helpers({
  GuideSchema: () => GuideSchema,
  categorization: () => Session.get('guideCategorization')
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
