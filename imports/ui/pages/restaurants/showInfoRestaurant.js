import './showInfoRestaurant.html';
import '../../components/addRestaurantOffer/addRestaurantOffer';
import '../../components/infoRestaurantOffer/infoRestaurantOffer';
import './editRestaurantOffer';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { restaurantOffers } from '../../../api/restaurants/restaurantOffers';
import { Restaurants } from '../../../api/restaurants/restaurants';

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
  },
  branchSelector: function (_id) {
    return { mainOffice: _id, branchOffice: true };
  },
  showBranches: function (isOperator) {
    if (!isOperator || this.restaurant.branchOffice) {
      return false;
    }
    return true;
  },
  urlTag: url => {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  }
});

Template.showButtonRestaurantOffers.events({
  'click .deleteRestaurantOffer': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Oferta',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
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

Template.showButtonRestaurantBranches.events({
  'click .deleteRestaurant': function () {
    const id = this._id;
    const rest = Restaurants.findOne({ _id: id });
    Swal({
      title: 'Eliminar Registro de Restaurante',
      text: `Esta seguro de eliminar este registro de ${rest.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteRestaurant', id, (error, result) => {
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
