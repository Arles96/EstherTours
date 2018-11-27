import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { messages, RegExObj } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const updateProfileSchema = new SimpleSchema({
  firstName: {
    type: String,
    label: 'Primer Nombre',
    regEx: RegExObj.names
  },
  lastName: {
    type: String,
    label: 'Primer Apellido',
    regEx: RegExObj.names
  }
}, { check: check, tracker: Tracker });

updateProfileSchema.messageBox.messages(messages);

export default updateProfileSchema;
