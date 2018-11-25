import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { admin, consultant, operator } from '../roles/roles';
import { messages, RegExObj } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const ProfileUserSchema = new SimpleSchema({
  firstName: {
    type: String,
    label: 'Primer Nombre',
    regEx: RegExObj.names
  },
  lastName: {
    type: String,
    label: 'Primer Apellido',
    regEx: RegExObj.names
  },
  email: {
    type: String,
    label: 'Correo',
    regEx: RegExObj.email
  },
  role: {
    type: String,
    label: 'Rol',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: function () {
        return [
          {
            value: admin,
            label: admin
          },
          {
            value: operator,
            label: operator
          },
          {
            value: consultant,
            label: consultant
          }
        ];
      }
    }
  }
}, { check: check, tracker: Tracker });

ProfileUserSchema.messageBox.messages(messages);

export default ProfileUserSchema;
