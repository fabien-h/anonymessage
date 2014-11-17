// Events for the Main template
Template.Main.events( {

	// When the user adds a conversation
	'submit #addConversation': function ( e ) {
		// Prevent page reloading
		e.preventDefault();
		Session.set( 'conversations', _.uniq( _.union( Session.get( 'conversations' ), [ e.target[ 0 ].value ] ) ) );
		// Reset the form
		e.target.reset();
	}

} );

// Helpers for the Main template
Template.Main.helpers( {

	conversations: function () {
		return Session.get( 'conversations' );
	},

	messages: function () {
		return _.map( Messages.find().fetch(), function ( m ) {
			return {
				message: m.message,
				time: moment( m.time ).format( 'HH:mm:ss' ),
				author: m.author
			}
		} );
	}

} );

// When the conversation template is rendered
Template.Main.rendered = function () {

	// Display the header
	TweenLite.fromTo( this.find( 'header' ), 0.3, {
		opacity: 0,
		y: -50
	}, {
		opacity: 1,
		y: 0,
		ease: 'Power2.easeOut',
		delay: 0.2
	} );
	// Display the elements
	_.each( [ this.find( 'svg' ), this.find( 'input[type=text]' ), this.find( 'input[type=submit]' ) ], function ( element, index ) {
		TweenLite.fromTo( element, 0.4, {
			opacity: 0,
			y: -50
		}, {
			opacity: 1,
			y: 0,
			ease: 'Back.easeOut',
			delay: 0.3 + 0.1 * index
		} );
	} );

};

// When the EmptyStateConversations template is rendered
Template.EmptyStateConversations.rendered = function () {

	// Display the text
	TweenLite.fromTo( this.find( 'span' ), 0.6, {
		opacity: 0,
		y: 50
	}, {
		opacity: 1,
		y: 0,
		ease: 'Back.easeOut',
		delay: 0.2
	} );

};
