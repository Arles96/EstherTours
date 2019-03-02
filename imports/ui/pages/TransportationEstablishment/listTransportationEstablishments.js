import './listTransportationEstablishments.html';
import '../../components/addFleetTransportationEstablishment/addFleetTransportationEstablishment';
import '../../components/addRouteTransportationEstablishment/addRouteTransportationEstablishment';
import XLSX from 'xlsx';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { TransportationEstablishments } from '../../../api/TransportationEstablishment/TransportationEstablishment';

Template.listTransportationEstablishments.onCreated(() => {
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

Template.listTransportationEstablishments.helpers({
  selector: function () {
    return { branchOffice: false };
  }
});

Template.listTransportationEstablishments.events({
  'click #export-excel': function () {
    Swal({
      title: 'Exportar datos a Excel',
      text: '¿Está seguro de exportar los establecimientos de transporte a Excel?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        Meteor.call('exportTransportsToExcel', (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            const filename = `Transporte ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filename);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});

Template.showButtonTransportationEstablishments.events({
  'click .addFleetTransportationEstablishment': function () {
    Session.set('idTransportationEstablishment', this._id);
  },
  'click .addRouteTransportationEstablishment': function () {
    Session.set('idTransportationEstablishment', this._id);
  },
  'click .deleteTransportationEstablishment': function () {
    const id = this._id;
    const TransportationEstablishment = TransportationEstablishments.findOne({ _id: id });
    Swal({
      title: 'Eliminar Registro de Transporte',
      text: `Esta seguro de eliminar este registro de ${TransportationEstablishment.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteTransportationEstablishment', id, (error, result) => {
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
