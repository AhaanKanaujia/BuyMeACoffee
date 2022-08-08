// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);
}

async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const fromAddress = memo.from;
    const fromName = memo.name;
    const message = memo.message;
    console.log(`At ${timestamp}, ${fromName} (${fromAddress}) bought you a coffee: "${message}"`);
  }
}

async function main() {
  const [owner, tipper1, tipper2, tipper3] = await hre.ethers.getSigners();
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const deploy_BMAC = await BuyMeACoffee.deploy();
  await deploy_BMAC.deployed();
  console.log("BuyMeACoffee deployed to:", deploy_BMAC.address);

  const addresses = [owner.address, tipper1.address, deploy_BMAC.address];
  console.log("-- start --");
  await printBalances(addresses);

  const coffee = {value: hre.ethers.utils.parseEther("1")};
  await deploy_BMAC.connect(tipper1).buyCoffee("Luke", "Enjoy ur coffee", coffee);
  await deploy_BMAC.connect(tipper2).buyCoffee("Yoda", "Enjoy ur coffee", coffee);
  await deploy_BMAC.connect(tipper3).buyCoffee("Vader", "Enjoy ur coffee", coffee);
  console.log("-- bought coffee --");
  await printBalances(addresses);

  await deploy_BMAC.connect(owner).withdrawTips();
  console.log("-- withdrew tips --");
  await printBalances(addresses);

  console.log("-- memos --");
  const memos = await deploy_BMAC.getMemos();
  await printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
