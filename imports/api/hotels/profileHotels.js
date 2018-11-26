import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages, RegExObj } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const ProfileHotelsSchema = new SimpleSchema({
  code: {
    type: String,
    label: 'Codigo',
    regEx: RegExObj.names
  },
  name: {
    type: String,
    label: 'Nombre',
    regEx: RegExObj.names
  },
  street: {
    type: String,
    label: 'Calle',
    regEx: RegExObj.names
  },
  municipality: {
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names
  },
  departament: {
    type: String,
    label: 'Departamento',
    regEx: RegExObj.names
  },
  phone: {
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.phone
  },
  categorization: {
    type: Number,
    label: 'Categorización',
    regEx: RegExObj.names
  },
  money: {
    type: Array,
    label: 'Moneda',
    regEx: RegExObj.names
  },
  services: {
    type: Array,
    label: 'Servicios',
    regEx: RegExObj.names
  },
  paymentsMethod: {
    type: Array,
    label: 'Metodos de pago',
    regEx: RegExObj.names
  },
  informationsAB: {
    type: Array,
    label: 'Información A y B',
    regEx: RegExObj.names
  },
  activities: {
    type: Array,
    label: 'Actividades',
    regEx: RegExObj.names
  }
}, { check: check, tracker: Tracker });

ProfileHotelsSchema.messageBox.messages(messages);

export default ProfileHotelsSchema;
