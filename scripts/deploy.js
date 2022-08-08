const hre = require('hardhat');

async function main() {
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const deploy_BMAC = await BuyMeACoffee.deploy();
    await deploy_BMAC.deployed();
    console.log("BuyMeACoffee deployed to:", deploy_BMAC.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
