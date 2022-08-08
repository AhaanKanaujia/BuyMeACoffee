const hre = require("hardhat")
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

async function getBalance(provider, address) {
    const balance = await provider.getBalance(address);
    return hre.ethers.utils.formatEther(balance);
}

async function main() {
    const contractAddress = "0xbD01835D2D833FFEEcdbF68A15C1f5Cb54726Eed";
    const contractABI = abi.abi;

    const provider = new hre.ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API);

    const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const deploy_BMAC = new hre.ethers.Contract(contractAddress, contractABI, provider);

    console.log("Current balance of owner:", await getBalance(provider, signer.address), "ETH");
    const balance = await getBalance(provider, deploy_BMAC.address);
    console.log("Current balance of contract:", await getBalance(provider, deploy_BMAC.address), "ETH");

    if (balance !== "0.0") {
        console.log("-- withdrawing funds --");
        const withdrawTxn = await deploy_BMAC.withdrawTips();
        await withdrawTxn.wait();
    } else {
        console.log("no funds to withdraw.");
    }

    console.log("current balance of owner:", await getBalance(provider, signer.address), "ETH");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
