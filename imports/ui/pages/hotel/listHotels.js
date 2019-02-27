import './listHotels.html';
import '../../components/addRoomHotel/addRoomHotel';
import '../../components/addRateHotel/addRateHotel';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import XLSX from 'xlsx';
import { Hotels } from '../../../api/hotels/hotels';

Template.listHotels.onCreated(() => {
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

Template.listHotels.helpers({
  selector: () => ({ branchOffice: false })
});

Template.listHotels.events({
  'click #export-excel': function () {
    Swal({
      title: 'Exportar datos a Excel',
      text: '¿Está seguro de exportar los paquetes a Excel?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        Meteor.call('exportHotelsToExcel', (error, result) => {
          if (error) {
            toastr.error('Error al exportar a Excel.');
          } else {
            const date = new Date();
            const filename = `Hoteles ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}.xlsx`;
            XLSX.writeFile(result, filename);
            toastr.success('Se ha exportado a Excel exitosamente.');
          }
        });
      }
    });
  }
});

Template.showButtonHotels.events({
  'click .addRoomHotel': function () {
    Session.set('idHotel', this._id);
  },
  'click .addRateHotel': function () {
    Session.set('idHotel', this._id);
  },
  'click .deleteHotel': function () {
    const id = this._id;
    const hotel = Hotels.findOne({ _id: id });
    Swal({
      title: 'Eliminar Registro de Hotel',
      text: `Esta seguro de eliminar este registro de ${hotel.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteHotel', id, (error, result) => {
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
