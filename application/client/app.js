/* **********
	When the application startup
********** */
Meteor.startup( function () {

	// Subscribe to the messages collection
	Meteor.subscribe( 'messages' );

	// Init the conversations array to null
	Session.set( 'conversations', [] );

} );


Router.route( '/', function () {
	this.render( 'Main' );
} );
