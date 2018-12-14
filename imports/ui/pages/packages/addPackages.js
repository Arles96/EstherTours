import './addPackages.html';
import toastr from 'toastr';
import { PackagesSchema } from '../../../api/packages/packages';

Template.addPackages.helpers({
  PackagesSchema: () => PackagesSchema
});

AutoForm.addHooks('addPackagesForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el paquete exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
