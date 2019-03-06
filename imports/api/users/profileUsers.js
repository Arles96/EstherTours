import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import {
  admin,
  consultant,
  operator,
  supervisor
} from '../roles/roles';
import { messages, RegExObj } from '../regEx';
import { Position } from '../position/position';

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
    label: 'Cargo',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: function () {
        return Position.find().fetch().map(doc => ({
          label: doc.name,
          value: doc._id
        }));
      }
    }
  },
  role: {
    type: String,
    label: 'Rol',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: function () {
        if (Roles.userIsInRole(Meteor.userId(), admin)) {
          return [
            {
              value: supervisor,
              label: supervisor
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
        } else {
          return [
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
