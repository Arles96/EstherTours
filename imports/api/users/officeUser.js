import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const userOfficeSchema = new SimpleSchema({
  idUser: {
    type: String,
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
  idOffice: {
    type: String,
    label: 'Sucursal'
  }
}, { check: check, tracker: Tracker });

userOfficeSchema.messageBox.messages(messages);

export default userOfficeSchema;
