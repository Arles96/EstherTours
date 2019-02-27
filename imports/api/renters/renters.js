import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';
import { paymentMethods, money } from '../money/money';
import municipalities from '../municipalities/municipality';

const Renters = new Mongo.Collection('renters');

SimpleSchema.extendOptions(['autoform']);

const branchContactsSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    optional: true
  },
  role: {
    type: String,
    label: 'Rol',
    optional: true
  }
});

const RentersSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  email: {
    type: String,
    label: 'Correo',
    regEx: RegExObj.email
  },
  website: {
    type: String,
    label: 'Sitio web',
    regEx: RegExObj.website,
    optional: true
  },
  street: {
    type: String,
    label: 'Calle'
  },
  municipality: {
    type: String,
    label: 'Municipio',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => municipalities
    },
    optional: true
  },
  city: {
    type: String,
    label: 'Ciudad',
    regEx: RegExObj.names
  },
  department: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    }
  },
  categorization: {
    type: String,
    label: 'Categorización',
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
  telephone: {
    type: Array,
    label: 'Teléfono',
    custom: function () {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.value.length; i++) {
        // eslint-disable-next-line no-plusplus
        for (let j = i + 1; j < this.value.length; j++) {
          if (this.value[j] === this.value[i]) {
            return 'duplicatePhones';
          }
        }
      }
      return 1;
    }
  },
  'telephone.$': {
    type: String,
    label: 'Teléfono',
    regEx: RegExObj.isNumber,
    min: 8,
    max: 8
  },
  services: {
    type: Array,
    label: 'Información de Servicios'
  },
  'services.$': {
    type: String,
    label: 'Servicio'
  },
  paymentMethods: {
    type: Array,
    label: 'Métodos de Pago',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => paymentMethods
    }
  },
  'paymentMethods.$': {
    type: String,
    label: 'Método de Pago'
  },
  money: {
    type: Array,
    label: 'Monedas',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => money
    }
  },
  'money.$': {
    type: String,
    label: 'Moneda'
  },
  branchOffice: {
    type: Boolean,
    label: 'Es sucursal',
    defaultValue: false
  },
  mainOffice: {
    type: String,
    label: 'Oficina principal',
    custom: function () {
      if (!this.value && this.field('branchOffice').value) {
        return 'required';
      } else {
        return 1;
      }
    },
    optional: true
  },
  branchContacts: {
    type: Array,
    label: 'Contactos',
    minCount: 1,
    maxCount: 10,
    optional: true
  },
  'branchContacts.$': {
    type: branchContactsSchema,
    label: ''
  },
  createAt: {
    type: Date,
    optional: true,
    autoValue: () => new Date()
  }
}, { check: check, tracker: Tracker });

RentersSchema.messageBox.messages(messages);

Renters.attachSchema(RentersSchema);

function renterToExcel (id, headers = true) {
  const renter = Renters.findOne({ _id: id });
  const res = [];
  if (renter) {
    // headers
    if (headers) {
      res.push([`Arrendadora ${renter.name}`]);
      res.push([
        'Sucursal',
        'Correo',
        'Sitio web',
        'Estrellas',
        'Departamento',
        'Municipio',
        'Ciudad',
        'Calle',
        'Monedas aceptadas',
        'Telefonos',
        'Servicios',
        'Metodos de pago'
      ]);
    }

    // datos que no son arreglos
    res.push([
      renter.branchOffice ? 'Si' : 'No',
      renter.email,
      renter.website,
      renter.categorization,
      renter.department,
      renter.municipality,
      renter.city,
      renter.street,
      renter.money[0] ? renter.money[0] : '',
      renter.telephone[0] ? renter.telephone[0] : '',
      renter.services[0] ? renter.services[0] : '',
      renter.paymentMethods[0] ? renter.paymentMethods[0] : ''
    ]);

    // datos que son arreglos
    const max = Math.max(...[
      renter.money.length,
      renter.telephone.length,
      renter.services.length,
      renter.paymentMethods.length
    ]);

    for (let i = 1; i < max; i += 1) {
      res.push([
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        renter.money[i] ? renter.money[i] : '',
        renter.telephone[i] ? renter.telephone[i] : '',
        renter.services[i] ? renter.services[i] : '',
        renter.paymentMethods[i] ? renter.paymentMethods[i] : ''
      ]);
    }

    res.push([]);
  }
  return res;
}

export {
  Renters,
  RentersSchema,
  renterToExcel
};
