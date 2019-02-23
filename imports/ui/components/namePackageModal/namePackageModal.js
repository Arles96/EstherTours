import './namePackageModal.html';
import toastr from 'toastr';
import { namePackage } from '../../../startup/client/packageFunction';

Template.namePackageModal.events({
  'submit #namePackage': function (event) {
    event.preventDefault();
    const name = event.target.name.value;
    namePackage(name);
    toastr.success('Iniciando creación de paquete');
    $('#namePackageModal').modal('hide');
  }
});
