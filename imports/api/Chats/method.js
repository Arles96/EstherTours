import { Meteor } from 'meteor/meteor';
import { Chats } from './Chats';
import { Notifications } from '../Notifications/Notification';

Meteor.methods({
  sendMessage: function (doc) {
    if (doc.idIssuer && doc.idReceiver) {
      Chats.insert(doc);
      const nots = Notifications.findOne({
        idIssuer: doc.idIssuer,
        idReceiver: doc.idReceiver
      });
      if (!nots) {
        Notifications.insert({
          idIssuer: doc.idIssuer,
          idReceiver: doc.idReceiver,
          amount: 1,
          lastMessage: doc.message,
          createAt: doc.createAt
        });
      } else {
        Notifications.update(
          {
            idIssuer: doc.idIssuer,
            idReceiver: doc.idReceiver
          },
          {
            $set: {
              createAt: doc.createAt,
              amount: (nots.amount + 1),
              lastMessage: doc.message
            }
          }
        );
      }
      return 'Success';
    } else {
      return 'Error';
    }
  },
  lookMessage: function (doc) {
    Notifications.remove(doc);
  }
});