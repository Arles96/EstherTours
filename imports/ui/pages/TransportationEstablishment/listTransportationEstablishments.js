import './listTransportationEstablishments.html';
import '../../components/addFleetTransportationEstablishment/addFleetTransportationEstablishment';
import '../../components/addRouteTransportationEstablishment/addRouteTransportationEstablishment';
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
      showCancelButton: true
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
