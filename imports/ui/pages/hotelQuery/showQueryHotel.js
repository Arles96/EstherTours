import './showQueryHotel.html';
import '../../components/addRoomHotel/addRoomHotel';
import '../../components/addRateHotel/addRateHotel';
import '../../components/infoRoomHotel/infoRoomHotel';
import '../../components/infoRateHotel/infoRateHotel';
import '../hotel/editRateHotel';
import '../hotel/editRoomHotel';
import { Session } from 'meteor/session';

Template.showQueryHotel.onCreated(() => {
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

Template.showQueryHotel.helpers({
  selector: function () {
    console.log(Session.get('hotelQueryDoc'));
    return Session.get('hotelQueryDoc').doc;
  }
});
