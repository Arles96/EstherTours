import './listAttractions.html';
import XLSX from 'xlsx';
import toastr from 'toastr';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { Attractions } from '../../../api/attractions/attractions';
import { packageAttraction, unpackageAttraction } from '../../../startup/client/packageFunction';

Template.listAttractions.onCreated(() => {
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

Template.listAttractions.events({
  'click #export-excel': function () {
    Swal({
      title: 'Exportar datos a Excel',
      text: '¿Está seguro de exportar las atracciones a Excel?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        Meteor.call('exportAttractionsToExcel', (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            const filename = `Atracciones ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filename);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});

Template.showButtonAttractions.events({
  'click .deleteAttraction': function () {
    const id = this._id;
    const rest = Attractions.findOne({ _id: id });
    Swal({
      title: 'Eliminar Registro de Atracciones',
      text: `Esta seguro de eliminar este registro de ${rest.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteAttraction', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se ha eliminado el registro.');
          }
        });
      }
    });
  },
  'click .packageEntity': function () {
    const { name, _id } = Attractions.findOne({ _id: this._id });
    packageAttraction(_id);
    toastr.success(`Se ha empaquetado la atracción ${name}`);
  },
  'click .unPackageEntity': function () {
    const { name } = Attractions.findOne({ _id: this._id });
    unpackageAttraction();
    toastr.info(`Se ha desempaquetado la atracción ${name}`);
  }
});
