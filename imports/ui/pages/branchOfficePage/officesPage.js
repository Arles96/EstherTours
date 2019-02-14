import './officesPage.html';
import './addBranchOffice';
import './editBranchOffice';
import { Meteor } from 'meteor/meteor';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { Session } from 'meteor/session';
import { branchOffices } from '../../../api/branchOffices/Offices';

Template.officePage.onCreated(() => {
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

Template.showButtonOffice.events({
  'click .deleteOffice': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Sucursal',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteOffice', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se eliminó el registro exitósamente.');
          }
        });
      }
    });
  },
  'click .infoOffice': function () {
    Session.set('branchOffices', branchOffices.findOne({ _id: this._id }));
  }
});
