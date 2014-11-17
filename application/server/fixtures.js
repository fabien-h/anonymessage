if ( Messages.find().fetch().length === 0 ) {

	Messages.insert( {
		time: new Date().getTime(),
		message: CryptoJS.AES.encrypt( JSON.stringify( {
			author: 'fabien',
			message: 'un petit message'
		} ), '123456' ).toString()
	} );
	Messages.insert( {
		time: new Date().getTime(),
		message: CryptoJS.AES.encrypt( JSON.stringify( {
			author: 'fabien',
			message: 'un petit message 2'
		} ), '123456' ).toString()
	} );
	Messages.insert( {
		time: new Date().getTime(),
		message: CryptoJS.AES.encrypt( JSON.stringify( {
			author: 'agathe',
			message: 'un petit message 3'
		} ), '123456' ).toString()
	} );
	Messages.insert( {
		time: new Date().getTime(),
		message: CryptoJS.AES.encrypt( JSON.stringify( {
			author: 'agathe',
			message: 'un petit message 4'
		} ), '123456' ).toString()
	} );


	Messages.insert( {
		time: new Date().getTime(),
		message: CryptoJS.AES.encrypt( JSON.stringify( {
			author: 'fabien',
			message: 'un petit message'
		} ), 'azertyuipo 123456' ).toString()
	} );
	Messages.insert( {
		time: new Date().getTime(),
		message: CryptoJS.AES.encrypt( JSON.stringify( {
			author: 'fabien',
			message: 'un petit message 2'
		} ), 'azertyuipo 123456' ).toString()
	} );
	Messages.insert( {
		time: new Date().getTime(),
		message: CryptoJS.AES.encrypt( JSON.stringify( {
			author: 'agathe',
			message: 'un petit message 3'
		} ), 'azertyuipo 123456' ).toString()
	} );
	Messages.insert( {
		time: new Date().getTime(),
		message: CryptoJS.AES.encrypt( JSON.stringify( {
			author: 'agathe',
			message: 'un petit message 4'
		} ), 'azertyuipo 123456' ).toString()
	} );

}
