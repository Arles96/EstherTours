import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';
import { TransportationEstablishments } from './TransportationEstablishment';

const RouteTransportationEstablishment = new Mongo.Collection('RouteTransportationEstablishment');
const types = [
  {
    value: 'Terrestre',
    label: 'Terrestre'
  },
  {
    value: 'Aérea',
    label: 'Aérea'
  },
  {
    value: 'Marítima',
    label: 'Marítima'
  }
];

SimpleSchema.extendOptions(['autoform']);

const RouteTransportationEstablishmentSchema = new SimpleSchema({
  idTransportationEstablishment: {
    type: String,
    label: false,
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
  department: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    }
  },
  street: {
    type: String,
    label: 'Calle',
    regEx: RegExObj.lettersAndNumbers
  },
  city: {
    type: String,
    label: 'Ciudad',
    regEx: RegExObj.names
  },
  town: {
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names
  },
  description: {
    type: String,
    label: 'Indicaciones adicionales',
    autoform: {
      type: 'textarea'
    },
    optional: true
  },
  type: {
    type: String,
    label: 'Tipo de ruta',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => types
    }
  }
}, { check: check, tracker: Tracker });

RouteTransportationEstablishmentSchema.messageBox.messages(messages);

RouteTransportationEstablishment.helpers({
  getTransportationEstablishmentName: function () {
    return TransportationEstablishments.findOne({ _id: this.idTransportationEstablishment }).name;
  }
});

RouteTransportationEstablishment.attachSchema(RouteTransportationEstablishmentSchema);

function routeTransportToExcel (id, headers = true) {
  const route = RouteTransportationEstablishment.findOne({ _id: id });
  const res = [];
  if (route) {
    // headers
    if (headers) {
      res.push(['Ruta']);
      res.push(['Tipo', 'Departamento', 'Municipio', 'Ciudad', 'Calle']);
    }

    // datos que no son arreglos
    res.push([
      route.type,
      route.department,
      route.town,
      route.city,
      route.street
    ]);
    res.push(['Indicaciones adicionales:', route.description]);

    if (headers) {
      res.push([]);
    }
  }
  return res;
}

export {
  RouteTransportationEstablishment,
  RouteTransportationEstablishmentSchema,
  routeTransportToExcel
};
