import './infoBranchHotel.html';
import { Session } from 'meteor/session';

Template.infoBranchHotel.helpers({
  branchHotel: () => Session.get('branchHotel')
});
