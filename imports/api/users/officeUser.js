import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const userOfficeSchema = new SimpleSchema({
  idOffice: {
    type: String,
    label: 'Sucursal'
  }
}, { check: check, tracker: Tracker });

userOfficeSchema.messageBox.messages(messages);

export default userOfficeSchema;
