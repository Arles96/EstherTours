import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages, RegExObj } from '../regEx';
import departments from '../departments/departments';

SimpleSchema.extendOptions(['autoform']);

const branchOffices = new Mongo.Collection('offices');

const branchOfficeSchema = new SimpleSchema({
  municipality: {
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names
  },
  departament: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    }
  },
  city: {
    type: String,
    label: 'Ciudad'
  },
  street: {
    type: String,
    label: 'Calle'
  },
  phone: {
    type: String,
    label: 'Telefono'
  }
}, { check: check, tracker: Tracker });

branchOfficeSchema.messageBox.messages(messages);

export {
  branchOffices,
  branchOfficeSchema
};
