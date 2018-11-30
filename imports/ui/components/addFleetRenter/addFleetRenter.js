import './addFleetRenter.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { FleetRenterSchema } from '../../../api/renters/fleetRenter';

Template.addFleetRenter.helpers({
  FleetRenterSchema: () => FleetRenterSchema,
  idRenter: () => Session.get('idRenter')
});

AutoForm.addHooks('addFleetForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la flota exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
