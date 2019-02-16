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
  position: {
    type: String,
    label: 'Cargo'
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
  },
  idOffice: {
    type: String,
    label: 'Sucursal'
  },
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

ProfileUserSchema.messageBox.messages(messages);

export default ProfileUserSchema;
