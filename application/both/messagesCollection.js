// Declare the Messages collection for both server and client
Messages = new Meteor.Collection( 'messages' );

if ( Meteor.isServer ) {

	// Denies any updates from the client
	Messages.deny( {
		insert: function ( userId, doc ) {
			return true;
		},
		update: function ( userId, doc, fieldNames, modifier ) {
			return true;
		},
		remove: function ( userId, doc ) {
			return true;
		}

	} );

	// Publish all messages for all clients
	Meteor.publish( 'messages', function () {
		return Messages.find();
	} );

	// Delete messages when there are more than 1000 messages
	var queryMessages = Messages.find(),
		queryObserver = queryMessages.observeChanges( {
			// Triggers when a message is added
			added: function ( id, m ) {
				while ( Messages.find().count() > 1000 ) {
					Messages.remove( Messages.findOne()._id );
				}
			}
		} );

}
