import { Meteor } from 'meteor/meteor';
import { Chats } from './Chats';
import { Notifications } from '../Notifications/Notification';

Meteor.methods({
  sendMessage: function (doc) {
    try {
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
    } catch (error) {
      throw new Meteor.Error('ErrorSendMessage');
    }
  },
  lookMessage: function (doc) {
    Chats.update(
      doc,
      {
        $set: {
          status: 3
        }
      },
      { multi: true }
    );
    Notifications.remove(doc);
  },
  recieveMessage: function (doc) {
    Chats.update(
      {
        idIssuer: doc.idIssuer,
        idReceiver: doc.idReceiver,
        status: 1
      },
      {
        $set: {
          status: 2
        }
      },
      { multi: true }
    );
  }
});
