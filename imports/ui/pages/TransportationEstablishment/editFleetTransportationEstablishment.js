import './editFleetTransportationEstablishment.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { FleetTransportationEstablishmentSchema } from '../../../api/TransportationEstablishment/FleetTransportationEstablishment';

Template.editFleetTransportationEstablishment.helpers({
  FleetTransportationEstablishmentSchema: () => FleetTransportationEstablishmentSchema,
  fleetTransportationEstablishment: () => Session.get('fleetTransportationEstablishment')
});

AutoForm.addHooks('editFleetForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la flota exitosamente.');
    $('#editFleetTransportationEstablishment').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
