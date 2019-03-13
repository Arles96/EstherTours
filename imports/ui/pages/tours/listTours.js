import './listTours.html';
import { Meteor } from 'meteor/meteor';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { Tours } from '../../../api/tours/tours';

Template.listTours.onCreated(() => {
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

Template.showButtonTours.events({
  'click .deleteTour': function () {
    const id = this._id;
    const rest = Tours.findOne({ _id: id });
    Swal({
      title: 'Eliminar Registro de Atracciones',
      text: `Esta seguro de eliminar este registro de ${rest.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('removeTour', this._id, error => {
          if (!error) {
            toastr.error('Se elimino el registro exitosamente.');
          } else {
            toastr.error('Error al eliminar el registro');
          }
        });
      }
    });
  }
});
