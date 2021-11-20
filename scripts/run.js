const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // Compile contract
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // Deploy to the blockchain
  const waveContract = await waveContractFactory.deploy();
  // Wait to be mined
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  let waveCount = await waveContract.getTotalWaves();

  // Owner waves
  let waveTxn = await waveContract.wave("Puma");
  await waveTxn.wait();

  await waveContract.getFavoriteAnimal();

  waveCount = await waveContract.getTotalWaves();

  // Random user waves
  waveTxn = await waveContract.connect(randomPerson).wave("Leopard");
  await waveTxn.wait();

  await waveContract.connect(randomPerson).getFavoriteAnimal();

  // Get total waves
  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runMain();
