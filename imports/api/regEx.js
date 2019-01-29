/* import i18n from 'meteor/universe:i18n'; */
import SimpleSchema from 'simpl-schema';

const RegExObj = {
  names: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^[a-zA-Z\d]{6,}$/,
  lettersAndNumbers: /([A-Z||\u00f1\u00d1]*)([A-Z]*)([a-z]*)([a-z||\u00f1\u00d1]*)\w+/,
  isNumber: /^-?\d+\.?\d*$/,
  phone: SimpleSchema.RegEx.Phone,
  website: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
};

const RegExMessages = [
  { exp: RegExObj.names, msg: 'invalido, solo debe contener letras.' },
  { exp: RegExObj.email, msg: 'inválido' },
  { exp: RegExObj.lettersAndNumbers, msg: 'inválido' },
  { exp: RegExObj.password, msg: 'inválida. Debe ser mayor de 6 caracteres, tener al menos una mayúscula y un numero' },
  { exp: RegExObj.isNumber, msg: 'inválido. Solo debe contener numeros.' },
  { exp: RegExObj.phone, msg: 'inválido' },
  { exp: RegExObj.website, msg: 'inválido' }
];

const messages = {
  en: {
    exceedWithdrawLimit: ({ label }) => `${label} excede el limite`,
    passwordMismatch: 'Contraseñas no coinciden',
    existFleetRenter: 'Debe seleccionar una flota',
    existRenter: 'Debe seleccionar una arrendadora',
    existRouteTransport: 'Debe seleccionar una ruta',
    existTransport: 'Debe seleccionar un establecimiento de transporte',
    existRoomHotel: 'Debe seleccionar una habitación',
    existHotel: 'Debe seleccionar un hotel',
    lessZero: 'No puede ser menor que cero.',
    required: ({ label }) => `Se requiere ${label}`,
    minString: ({ label, min }) => `${label} debe tener como mínimo ${min} caracteres`,
    maxString: ({ label, max }) => `${label} no puede exceder de ${max} caracteres`,
    regEx: function ({ label, regExp }) {
      let msgObj;
      if (regExp) {
        msgObj = RegExMessages.find((o) => { return o.exp && o.exp.toString() === regExp; }); // eslint-disable-line
      }
      const regExpMessage = msgObj ? msgObj.msg : 'inválido';
      return `${label} ${regExpMessage}`;
    }
  }
};

export {
  RegExObj,
  messages
};
