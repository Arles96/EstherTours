import './showInfoRenter.html';
import '../../components/addFleetRenter/addFleetRenter';
import '../../components/infoFleetRenter/infoFleetRenter';
import './editFleetRenter';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FleetRenter } from '../../../api/renters/fleetRenter';
import { Renters } from '../../../api/renters/renters';

Template.showInfoRenter.onCreated(() => {
  $.extend(true, $.fn.dataTable.defaults, {
    language: {
      sLengthMenu: 'Mostrar _MENU_ registros',
      sProcessing: 'Procesando ...',
      sZeroRecords: 'No se encontraron resultados',
      sEmptyTable: 'Nigún dato disponible ',
      sInfo: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
      sInfoPostFix: ' ',
      sSearch: 'Buscar:',
      sUrl: '',
      sInfoThousands: ',',
      sLoadingRecords: 'Cargando...',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior'
      },
      oAria: {
        sSortAscending: ': Activar para ordenar la columna de manera ascendente',
        sSortDescending: ': Activar para ordenar la columna de manera descendente'
      }
    }
  });
});

Template.showInfoRenter.helpers({
  selector: function () {
    return { idRenter: Session.get('idRenter') };
  },
  branchSelector: function (_id) {
    return { mainOffice: _id, branchOffice: true };
  },
  showBranches: function (isOperator) {
    if (!isOperator || this.restaurant.branchOffice) {
      return false;
    }
    return true;
  },
  getMainOffice: function (_id) {
    return Renters.findOne({ _id }).name;
  },
  getBranchOffices: function (_id) {
    return Renters.find({ mainOffice: _id, branchOffice: true }).map(doc => doc.name);
  }
});

Template.showButtonFleetRenters.events({
  'click .deleteFleetRenter': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Flota',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteFleetRenter', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se eliminó el registro exitósamente.');
          }
        });
      }
    });
  },
  'click .infoFleetRenter': function () {
    Session.set('fleetRenter', FleetRenter.findOne({ _id: this._id }));
  }
});

Template.showButtonRenterBranches.events({
  'click .deleteRenter': function () {
    const id = this._id;
    const renter = Renters.findOne({ _id: id });
    Swal({
      title: 'Eliminar Registro de Arrendadora',
      text: `Esta seguro de eliminar este registro de ${renter.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteRenter', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se ha eliminado el registro.');
          }
        });
      }
    });
  }
});
