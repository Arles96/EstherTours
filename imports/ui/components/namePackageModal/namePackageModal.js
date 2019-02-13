import './namePackageModal.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';

Template.namePackageModal.events({
  'submit #namePackage': function (event) {
    event.preventDefault();
    const name = event.target.name.value;
    localStorage.setItem('namePackage', name);
    localStorage.setItem('createPackage', true);
    toastr.success('Iniciando creación de paquete');
    Session.set('isCreatePackage', true);
  }
});
