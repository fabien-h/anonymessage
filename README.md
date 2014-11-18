anonymessage
============

Deployed here : http://anonymessage.meteor.com/, http://anonymessage-2.meteor.com/ and http://anonymessage.meteor-3.com/

This is a messaging application where every connected user access the last 1000 posted messages and a stream of the new messages posted by any other user on any of the servers of the cluster.

When you send a message, it's encrypted with AES (and CryptoJS https://code.google.com/p/crypto-js/). So everyone gets your messages but only the ones with your passphrase will be able to actually read them.

This is a conceptual test to think about decentralized communication system where no non-ecrypted data would be transfered. The problem would be that the server would not know who it should deliver the informations. Mabye the solution is to deliver eveything to everyone and let people pick what they own.
