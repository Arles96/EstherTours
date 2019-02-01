import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const branchOffices = new Mongo.Collection('offices');

const branchOfficeSchema = new SimpleSchema({
  location: {
    type: String,
    label: 'Ubicación'
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
