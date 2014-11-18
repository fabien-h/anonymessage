anonymessage
============

Deployed here : http://anonymessage.meteor.com/, http://anonymessage-2.meteor.com/ and http://anonymessage.meteor-3.com/

This is a messaging application where every connected user access the last 1000 posted messages and a stream of the new messages posted by any other user on any of the servers of the cluster.

When you send a message, it's encrypted with the [CryptoJS](https://code.google.com/p/crypto-js/) AES 256. So everyone gets your messages but only the ones with your passphrase will be able to actually read them.

I did it as a conceptual exercise to think about decentralized communication system where no non-ecrypted data would be transfered to a server that you cannot trust. The problem would be that the server could not know who it should deliver the informations to. Mabye the solution is to make the server deliver eveything to everyone and let people pick what they own. This is what I did there.

Mabye the solution is to get rid of the server and share the messages between the members of a cluster. Mabye to solution is to make the messages travel in a loop until they find their owner. I'll try other solutions :)

### A schema of the architecture

![schema](https://raw.githubusercontent.com/fabien-h/anonymessage/master/assets/schema.png)
