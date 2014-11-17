// Events for the About template
Template.About.events( {

	// Display the about contents
	'click #aboutButton': function () {
		Session.set( 'aboutDisplayed', true );
	}

} );

// Helpers for the About template
Template.About.helpers( {

	aboutDisplayed: function () {
		return Session.get( 'aboutDisplayed' );
	},

} );

// When the About template is rendered
Template.About.rendered = function () {

	// Display the button
	TweenLite.fromTo( this.find( '#aboutButton' ), 0.6, {
		opacity: 0,
		x: 50
	}, {
		opacity: 1,
		x: 0,
		ease: 'Back.easeOut',
		delay: 0.5
	} );

};

// Events for the AboutContents template
Template.AboutContents.events( {

	// Display the about contents
	'click header button': function ( e, tmpl ) {
		// Display the elements
		TweenLite.to( tmpl.find( '.contents' ), 0.5, {
			y: 150,
			ease: 'Back.easeIn'
		} );
		TweenLite.to( tmpl.find( '#aboutContents' ), 0.4, {
			opacity: 0,
			ease: 'Power2.easeOut',
			delay: 0.3,
			onComplete: function () {
				Session.set( 'aboutDisplayed', false );
			}
		} );
	}

} );
// When the AboutContents template is rendered
Template.AboutContents.rendered = function () {

	// Display the elements
	TweenLite.fromTo( this.find( '#aboutContents' ), 0.4, {
		opacity: 0
	}, {
		opacity: 1,
		ease: 'Power2.easeOut'
	} );
	TweenLite.fromTo( this.find( '.contents' ), 0.6, {
		y: 150
	}, {
		y: 0,
		ease: 'Back.easeOut',
	} );

};
