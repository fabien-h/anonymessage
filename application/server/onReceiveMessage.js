/* **********
	When the server recieve a message
********** */

// The list of servers in the cluster
var serverList = [
	'http://anonymessage.meteor.com/',
	'http://anonymessage-2.meteor.com/',
	'http://anonymessage-3.meteor.com/'
];

// From a connected user
Meteor.methods( {

	sendMessage: function ( message, fromServer ) {
		// If the message is less than 400 characters
		if ( message.length < 400 ) {
			// Insert to the local data base
			Messages.insert( {
				message: message,
				time: new Date().getTime()
			} );
			// If the message is not already from a server, send to the other servers in the cluster
			if ( !fromServer ) {
				this.unblock();
				_.each( _.without( serverList, Meteor.absoluteUrl() ), function ( server ) {
					HTTP.post( server + 'postMessage', {
						data: {
							message: message
						}
					}, function () {} );
				} );
			}
		}
	}
} );

// From another server
Router.route( '/postMessage', {
		where: 'server'
	} )
	.post( function ( req ) {
		Meteor.call( 'sendMessage', req.body.message, true );
	} )
