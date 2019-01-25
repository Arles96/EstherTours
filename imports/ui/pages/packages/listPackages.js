import './listPackages.html';
import Swal from 'sweetalert2';
import toastr from 'toastr';

Template.listPackages.onCreated(() => {
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

Template.listPackages.events({
  'click .export-csv': function () {
    Swal({
      title: 'Exportar datos a Excel',
      text: `¿Está seguro de exportar los paquetes a Excel?`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        Meteor.call('exportToCSV', (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const filename = 'Paquetes.csv';
            const data = encodeURI(result);
            const link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
            console.log(result);
            toastr.success('Se ha exportada a Excel exitosamente.');
          }
        });
      }
    });
  }
});

Template.showButtonPackages.events({
  'click .deletePackages': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Registro de Paquete',
      text: `¿Está seguro de eliminar este paquete?`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deletePackage', id, (error, result) => {
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
