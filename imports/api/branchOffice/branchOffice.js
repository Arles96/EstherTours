import SimpleSchema from 'simpl-schema';
import departments from '../departments/departments';
import { messages, RegExObj } from '../regEx';

const branchOfficeSchema = new SimpleSchema({
  municipality: {
    type: String,
    label: 'Municipio',
    regEx: RegExObj.names
  },
  departament: {
    type: String,
    label: 'Departamento',
    autoform: {
      firstOption: '(Seleccione Uno)',
      options: () => departments
    }
  }
});

branchOfficeSchema.messageBox.messages(messages);

export default branchOfficeSchema;
