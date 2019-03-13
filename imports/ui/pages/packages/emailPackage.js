import './emailPackage.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { ReactiveVar } from 'meteor/reactive-var';

Template.emailPackage.onCreated(function createVars () {
  this.email = new ReactiveVar('');
});

Template.emailPackage.helpers({
  email () {
    return Template.instance().email.get();
  }
});

Template.emailPackage.events({
  'input #email' (event, templateInstance) {
    templateInstance.email.set(event.currentTarget.value);
  },
  'click #sendEmail' (event, templateInstance) {
    const email = Template.instance().email.get();
    const id = Session.get('emailPackageId');
    Meteor.call('sendEmailPackage', id, email, (error, result) => {
      if (error) {
        console.log(error);
        toastr.error('Error al eliminar enviar el correo.');
      } else {
        toastr.success('Se envío el correo!');
      }
    });
  }
});
