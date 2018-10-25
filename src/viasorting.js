import { list , range , len , map , frame , max } from '@aureooms/js-itertools' ;
import { increasing , attr } from '@aureooms/js-compare' ;

function lexicographical ( compare , array , n ) {

	return function ( i , j ) {

		const len = Math.min( n - i , n - j ) ;

		for ( let k = 0 ; k < len ; ++k ) {

			const d = compare( array[i+k] , array[j+k] ) ;

			if ( d !== 0 ) return d ;

		}

		return j - i ;

	} ;

}

function _lcp ( compare , array , n ) {

	return function ( i , j ) {

		const len = Math.min( n - i , n - j ) ;

		for ( let k = 0 ; k < len ; ++k ) {

			const d = compare( array[i+k] , array[j+k] ) ;

			if ( d !== 0 ) return k ;

		}

		return len ;

	} ;

}

export default function viasorting ( compare , string ) {

	const lex = lexicographical( compare , string , len( string ) ) ;

	const suffixes = list( range( len( string ) ) ).sort( lex ) ;

	const lcp = _lcp( compare , array , n ) ;

	const candidates = map( ( [ i , j ] ) => [ i , j , lcp( i , j ) ], frame( suffixes , 2 ) ) ;

	return max( attr( increasing , 2 ) , candidates , [ 0 , 0 , 0 ] ) ;

}
