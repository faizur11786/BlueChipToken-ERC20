// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require( "hardhat" );
const { mkdirSync, existsSync, readFileSync, writeFileSync } = require( "fs" );
const { BigNumber } = require( "ethers" );
const GasEstimator = require( "./gasEstimator" );

async function main () {
  mkdirSync( "abi", { recursive: true } );
  const gasEstimator = new GasEstimator( "polygon" );

  // We get the contract to deploy
  const BlueChipToken = await hre.ethers.getContractFactory( "BlueChipToken" );
  console.log( BigNumber.from( "210000000" ).mul( BigNumber.from( 10 ).pow( BigNumber.from( 8 ) ) ).toString() );
  console.log( {
    gasPrice: hre.ethers.utils.parseUnits(
      Math.ceil( await gasEstimator.estimate() ).toString(),
      "gwei"
    ),
  } );
  const blueChipToken = await BlueChipToken.deploy( BigNumber.from( "210000000" ).mul( BigNumber.from( 10 ).pow( BigNumber.from( 8 ) ) ).toString(), {
    gasPrice: hre.ethers.utils.parseUnits(
      Math.ceil( await gasEstimator.estimate() ).toString(),
      "gwei"
    ),
  } ); //210 M (21000000000000000)
  await blueChipToken.deployed();
  console.log( "BlueChipToken deployed to:", blueChipToken.address );
  const reciept = await blueChipToken.deployTransaction.wait();
  createAbiJSON( blueChipToken, "BlueChipToken", reciept );

}

function createAbiJSON ( artifact, filename, reciept ) {
  const { chainId } = hre.network.config;
  if ( existsSync( `${__dirname}../abi/${filename}.json` ) ) {
    const prevData = JSON.parse( readFileSync( `${__dirname}../abi/${filename}.json`, "utf8" ) );
    const data = {
      abi: JSON.parse( artifact.interface.format( "json" ) ),
      networks: { ...prevData.networks }
    };
    data.networks[chainId] = { "address": artifact.address, blockNumber: reciept.blockNumber };
    writeFileSync( `${__dirname}../abi/${filename}.json`, JSON.stringify( data ) );
  } else {
    const data = {
      abi: JSON.parse( artifact.interface.format( "json" ) ),
      networks: {}
    };
    data.networks[chainId] = { "address": artifact.address, blockNumber: reciept.blockNumber };
    writeFileSync( `${__dirname}../abi/${filename}.json`, JSON.stringify( data ) );
  }

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch( ( error ) => {
  console.error( error );
  process.exitCode = 1;
} );
