/**
 * Created by wilson.campusano on 10/24/2014.
 */
var Book = function Book( title, price ) {
	var priceChangingCallbacks = [],
			priceChangedCallbacks = [];

	this.price = function ( val ) {
		if ( val !== undefined && val !== price ) {
			for ( var idx = 0; idx < priceChangingCallbacks.length; idx++ ) {
				if ( !priceChangingCallbacks[idx]( this, val ) ) {
					return price;
				}
			}
			price = val;

			for ( var idx = 0; idx < priceChangedCallbacks.length; idx++ ) {
				priceChangedCallbacks[idx]( this );
			}
		}
		return price;
	};

	this.title = function ( val ) {
		title = val;
		return title;
	};

	this.onPriceChanging = function onPriceChanging( callback ) {
		priceChangingCallbacks.push( callback );
	};

	this.onPriceChanged = function onPriceChanged( callback ) {
		priceChangedCallbacks.push( callback );
	};

};

var theGodParts = new Book( 'Javascript the good parts', 33.99 );

theGodParts.onPriceChanged( function ( context ) {
	console.log( 'The price has changed to ' + context.price() );
} );

theGodParts.onPriceChanging( function ( context, val ) {
	if ( val > 100 ) {
		console.log( 'Warning! the price cannot be changed to ' + val );
		return false;
	}
	return true;
} );


theGodParts.price( 200 );
theGodParts.price( 55.08 );

console.log( 'Book created : 	' + theGodParts.title() + '  ' + theGodParts.price() );