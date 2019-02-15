import './showInfoHotel.html';
import '../../components/addRoomHotel/addRoomHotel';
import '../../components/addRateHotel/addRateHotel';
import '../../components/infoRoomHotel/infoRoomHotel';
import '../../components/infoRateHotel/infoRateHotel';
import './editRateHotel';
import './editRoomHotel';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { RateHotel } from '../../../api/hotels/ratehotel';
import { Hotels } from '../../../api/hotels/hotels';
import HotelImage from '../../../api/hotels/hotelImage';

Template.showInfoHotel.onCreated(() => {
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

Template.showInfoHotel.helpers({
  findImage: _id => HotelImage.findOne({ _id })
});

Template.showButtonRoomHotel.events({
  'click .deleteRoomHotel': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Habitación',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteRoomHotel', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se eliminó el registro exitósamente.');
          }
        });
      }
    });
  },
  'click .infoRoomHotel': function () {
    Session.set('roomHotel', RoomHotel.findOne({ _id: this._id }));
  },
  'click .packageEntity': function () {
    const {
      _id,
      idHotel,
      price,
      type
    } = RoomHotel.findOne({ _id: this._id });
    const { name } = Hotels.findOne({ _id: idHotel });
    localStorage.setItem('packageRoomHotel', {
      _id,
      idHotel,
      price,
      type,
      name
    });
    toastr.success('Se ha empaquetado la habitación exitosamente');
  }
});

Template.showButtonRateHotel.events({
  'click .deleteRateHotel': function () {
    const id = this._id;
    Swal({
      title: 'Eliminar Tarifa',
      text: 'Esta seguro de eliminar este registro.',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteRateHotel', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se eliminó el registro exitósamente.');
          }
        });
      }
    });
  },
  'click .infoRateHotel': function () {
    Session.set('rateHotel', RateHotel.findOne({ _id: this._id }));
  }
});

Template.showInfoHotel.helpers({
  selector: function () {
    return { idHotel: Session.get('idHotel') };
  },
  urlTag: url => {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  }
});
