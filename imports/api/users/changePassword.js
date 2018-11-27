import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { messages } from '../regEx';

SimpleSchema.extendOptions(['autoform']);

const changePasswordSchema = new SimpleSchema({
  oldPassword: {
    type: String,
    label: 'Antigua Contraseña',
    min: 6,
    autoform: {
      type: 'password'
    }
  },
  newPassword: {
    type: String,
    label: 'Nueva Contraseña',
    min: 6,
    autoform: {
      type: 'password'
    }
  },
  confirmNewPassword: {
    type: String,
    label: 'Confirmar Nueva Contraseña',
    min: 6,
    custom: function () {
      if (this.value !== this.field('newPassword').value) {
        return 'passwordMismatch';
      } else {
        return 1;
      }
    },
    autoform: {
      type: 'password'
    }
  }
}, { check: check, tracker: Tracker });

changePasswordSchema.messageBox.messages(messages);

export default changePasswordSchema;
