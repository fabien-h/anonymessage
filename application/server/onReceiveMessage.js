/* **********
	When the server recieve a message
********** */

Meteor.methods( {

	sendMessage: function ( message ) {
		Messages.insert( {
			message: message,
			time: new Date().getTime()
		} );
	}

} );
