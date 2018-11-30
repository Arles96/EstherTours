import './showInfoRestaurant.html';
import '../../components/addRestaurantOffer/addRestaurantOffer';
import '../../components/infoRestaurantOffer/infoRestaurantOffer';
import './editRestaurantOffer';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { restaurantOffers } from '../../../api/restaurants/restaurantOffers';

Template.showInfoRestaurant.onCreated(() => {
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

Template.showInfoRestaurant.helpers({
  selector: function () {
    return { idRestaurant: Session.get('idRestaurant') };
  }
});

Template.showButtonRestaurantOffers.events({
  'click .deleteRestaurantOffer': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Oferta',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteRestaurantOffer', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se eliminó el registro exitósamente.');
          }
        });
      }
    });
  },
  'click .infoRestaurantOffer': function () {
    Session.set('restaurantOffers', restaurantOffers.findOne({ _id: this._id }));
  }
});