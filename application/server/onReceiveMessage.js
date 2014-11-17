/* **********
	When the server recieve a message
********** */

Meteor.methods( {

	sendMessage: function ( message ) {
		// If the message is less than 400 characters
		if ( message.length < 400 )
			Messages.insert( {
				message: message,
				time: new Date().getTime()
			} );
	}

} );
