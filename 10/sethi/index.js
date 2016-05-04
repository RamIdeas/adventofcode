const regex = new RegExp( '123456789'.split('').map( n => n + '+' ).join('|'), 'g' );
const pronounce = sequence => sequence.replace( regex, run => run.length.toString() + run.charAt(0) );
const recursivePronunciation = (sequence,i) => {
  let pronunciation = sequence;
  while( i-- ) pronunciation = pronounce(pronunciation);
  return pronunciation;
}

console.log( 'Part One:', recursivePronunciation( '1321131112', 40 ).length );
console.log( 'Part Two:', recursivePronunciation( '1321131112', 50 ).length );
