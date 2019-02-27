import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { messages } from '../regEx';
import { Hotels } from './hotels';

SimpleSchema.extendOptions(['autoform']);

const RoomHotel = new Mongo.Collection('roomhotel');

const RoomHotelSchema = new SimpleSchema({
  idHotel: {
    type: String,
    label: false,
    autoform: {
      readonly: true,
      omit: true,
      afFieldInput: {
        type: 'hidden'
      },
      afFormGroup: {
        label: false
      }
    }
  },
  price: {
    type: Number,
    label: 'Precio',
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  type: {
    type: String,
    label: 'Tipo de habitación'
  },
  extraBed: {
    type: Number,
    label: 'Cantidad de camas extra',
    custom: function () {
      if (this.value < 0) {
        return 'lessZero';
      }
      return 1;
    }
  },
  roomSize: {
    type: String,
    label: 'Tamaño de la habitación'
  },
  menage: {
    type: Array,
    label: 'Menaje de la habitación'
  },
  'menage.$': {
    type: String
  }
}, { check: check, tracker: Tracker });

RoomHotelSchema.messageBox.messages(messages);

RoomHotel.helpers({
  getHotelName: function () {
    return Hotels.findOne({ _id: this.idHotel }).name;
  }
});

function roomToExcel (id, headers = true) {
  const room = RoomHotel.findOne({ _id: id });
  const res = [];
  if (room) {
    // headers
    if (headers) {
      res.push(['Cuarto de Hotel']);
      res.push(['Tipo', 'Tamaño', 'Precio', 'Camas extra', 'Menajes']);
    }

    // datos que no son arreglos
    res.push([
      room.type,
      room.roomSize,
      room.price,
      room.extraBed,
      room.menage[0] ? room.menage[0] : ''
    ]);

    // datos que son arreglos
    for (let i = 1; i < room.menage.length; i += 1) {
      res.push([
        '',
        '',
        '',
        '',
        room.menage[i] ? room.menage[i] : ''
      ]);
    }

    res.push([]);
  }
  return res;
}

export { RoomHotel, RoomHotelSchema, roomToExcel };
