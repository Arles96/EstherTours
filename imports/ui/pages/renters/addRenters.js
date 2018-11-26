import './addRenters.html';
import { RentersSchema } from '../../../api/renters/renters';

Template.addRenters.helpers({
  RentersSchema: () => RentersSchema
});
