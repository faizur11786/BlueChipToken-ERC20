const axios = require( "axios" );

module.exports = class GasPriceEstimator {
  constructor (
    network,
    { level = "instant", adjustment = 0, requestTimeout = 30000 } = {}
  ) {
    this.network = network;
    this.level = level;
    this.adjustment = adjustment;
    this.fetcher = axios.create( { timeout: requestTimeout } );
  }

  async estimate () {
    let gasInfo;
    switch ( this.network ) {
      case "polygon":
        gasInfo = await this.onPolygon();
        break;
      default:
        throw new Error( `unsupported network: ${this.network}` );
    }
    const gasPriceInGwei = gasInfo[this.level];
    return gasPriceInGwei * ( 1 + this.adjustment );
  }

  async onPolygon () {
    const res = await this.fetcher.get(
      "https://gasstation-mainnet.matic.network"
    );
    const data = res.data;
    console.log( "gas: ", data );
    return {
      instant: data.fastest,
      fast: data.fast,
      standard: data.standard,
      slow: data.safeLow,
    };
  }
};
