import './editFleetRenter.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { FleetRenterSchema } from '../../../api/renters/fleetRenter';

Template.editFleetRenter.helpers({
  FleetRenterSchema: () => FleetRenterSchema,
  fleetRenter: () => Session.get('fleetRenter')
});

AutoForm.addHooks('editFleetForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la flota exitosamente.');
    $('#editFleetRenter').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
