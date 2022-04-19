const { BigNumber } = require( "ethers" );

module.exports = [
    BigNumber.from( "210000000" ).mul( BigNumber.from( 10 ).pow( BigNumber.from( 8 ) ) ).toString(),
];