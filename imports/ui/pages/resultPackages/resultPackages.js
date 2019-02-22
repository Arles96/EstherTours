import './resultPackages.html';
import '../../components/toDecimal/toDecimal';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import { Session } from 'meteor/session';

Template.resultPackages.onCreated(() => {
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

Template.resultPackages.helpers({
  data: () => Session.get('resultFindPackage').doc,
  query: () => Session.get('resultFindPackage').query
});

Template.resultPackages.events({
  'click .export-csv': function () {
    Swal({
      title: 'Exportar datos a Excel',
      text: `¿Está seguro de exportar la consulta de paquetes a Excel?`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        // Formatear en serverSide
        Meteor.call('exportToCSV', Session.get('resultFindPackage').doc, (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            // Descargar
            const csv = `data:text/csv;charset=utf-8,
                ${result}`;
            const filename = `Consulta de paquetes (${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}).csv`;
            const data = encodeURI(csv);
            const link = document.createElement('a');
            document.body.appendChild(link);
            link.href = data;
            link.setAttribute('download', filename);
            link.click();
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});
