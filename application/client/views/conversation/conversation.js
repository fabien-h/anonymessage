// Events for the conversation template
Template.Conversation.events( {

	// When the user send a message
	'submit form': function ( e, tmpl ) {
		// Prevent page reloading
		e.preventDefault();
		// Send only if there is a message content
		if ( e.target[ 0 ].value )
			Meteor.call( 'sendMessage', CryptoJS.AES.encrypt( JSON.stringify( {
				author: tmpl.find( '.userName' ).value || 'anonymous',
				message: e.target[ 0 ].value
			} ), this.passPhrase ).toString() );
		// Reset the form
		e.target.reset();
	},

	// When the user close the conversation, erase the elements
	'click header button': function ( e, tmpl ) {
		var self = this;
		// Start with a small transition
		TweenLite.to( tmpl.find( '.conversation' ), 0.5, {
			opacity: 0,
			y: 200,
			ease: 'Back.easeIn',
			onComplete: function () {
				// Reset the messages in the session object
				Session.set( self.passPhrase, [] );
				// Remove the onversation form the onversations list
				Session.set( 'conversations', _.without( Session.get( 'conversations' ), self.passPhrase ) );
			}
		} );
	}

} );

// Helpers for the conversation template
Template.Conversation.helpers( {

	messages: function () {
		return Session.get( this.passPhrase );
	}

} );

// When an instance of the conversation template is rendered
Template.Conversation.rendered = function () {

	/* **********
		Manage the animation to display the conversation
	********** */
	TweenLite.fromTo( this.find( '.conversation' ), 0.5, {
		opacity: 0,
		y: 200,
	}, {
		opacity: 1,
		y: 0,
		ease: 'Back.easeOut'
	} );

	/* **********
		Manage the datas
	********** */
	// Store the passPhrase
	var passPhrase = this.data.passPhrase,
		self = this;
	// Init the messages for this conversation to []
	Session.set( passPhrase, [] );
	// Observes changes in the messages collections
	// When a change occurs, tries to decrypt it
	// If it's possible, displays it
	this.queryMessages = Messages.find();
	this.queryObserver = this.queryMessages.observeChanges( {
		// Triggers when an element is added to the local collection
		added: function ( id, m ) {
			// Try to avoid error throwing
			try {
				// Try to decrypt a message with the current passPhrase
				var message = CryptoJS.AES.decrypt( m.message, passPhrase ).toString( CryptoJS.enc.Utf8 );
				// If there was a decrypted message
				if ( message ) {
					// Check if the element is scrollable and if it is currently at its max scroll
					var container = $( self.find( '.conversation section' ) )[ 0 ];
					if ( container.scrollHeight > container.offsetHeight && ( container.scrollHeight - container.offsetHeight ) === container.scrollTop ) {
						// Wait 100ms to make sure that the rendering happended and then scroll to the botom
						Meteor.setTimeout( function () {
							$( self.find( '.conversation section' ) ).scrollTop( container.scrollHeight - container.offsetHeight );
						}, 100 );
					}
					// Adds it to the current message list
					Session.set( passPhrase, _.union( Session.get( passPhrase ), [ _.extend( JSON.parse( message ), {
						time: m.time
					} ) ] ) );
				}
			} catch ( err ) {
				// nothing
			}
		}
	} );

};

// When an instance of the conversation template is destroyed
Template.Conversation.destroyed = function () {
	// Cleanup the observer on the messages
	this.queryObserver.stop();
	delete( this.queryMessages );
	delete( this.queryObserver );
}
