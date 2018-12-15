import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const PackagesSchemaConsult = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    optional: true
  },
  idRenter: {
    type: String,
    optional: true,
    label: 'Arrendadora'
  },
  idFleetRenter: {
    type: String,
    label: 'Flota de Arrendadora',
    optional: true
  },
  idGuide: {
    type: String,
    label: 'Guía',
    optional: true
  },
  idTransport: {
    type: String,
    label: 'Establecimiento de Transporte',
    optional: true
  },
  idTransportRoute: {
    type: String,
    label: 'Ruta del Establecimiento de Transporte',
    optional: true
  },
  idRestaurant: {
    type: String,
    label: 'Restaurante',
    optional: true
  },
  price: {
    type: Number,
    label: 'Precio',
    optional: true
  },
  idHotel: {
    type: String,
    label: 'Hotel',
    optional: true
  },
  idRoom: {
    type: String,
    label: 'Habitación del Hotel',
    optional: true
  },
  observation: {
    type: String,
    label: 'Observación',
    optional: true,
    autoform: {
      type: 'textarea'
    }
  }
}, { check: check, tracker: Tracker });

PackagesSchemaConsult.messageBox.messages(messages);

export default PackagesSchemaConsult;
