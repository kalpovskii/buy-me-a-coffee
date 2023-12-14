import { ethers } from "hardhat";

async function main() {
  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  await buyMeACoffee.waitForDeployment();

  console.log(`BuyMeCoffee deployed to: ${buyMeACoffee.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
