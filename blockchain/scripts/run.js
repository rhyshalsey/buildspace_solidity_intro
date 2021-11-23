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
  console.log("Total waves: ", waveCount.toNumber());

  // Owner waves
  let waveTxn = await waveContract.wave("Owner's animal");
  await waveTxn.wait();

  let favoriteAnimal = await waveContract.getFavoriteAnimal();
  console.log("Owner's favorite animal: ", favoriteAnimal);

  waveCount = await waveContract.getTotalWaves();
  console.log("Total waves: ", waveCount.toNumber());

  // Random user waves
  waveTxn = await waveContract
    .connect(randomPerson)
    .wave("Random person's animal");
  await waveTxn.wait();

  await waveContract.connect(randomPerson).getFavoriteAnimal();
  console.log("Random person's favorite animal: ", favoriteAnimal);

  // Get total waves
  waveCount = await waveContract.getTotalWaves();
  console.log("Total waves: ", waveCount.toNumber());

  // Get all favorite animals
  const favoriteAnimals = await waveContract.getAllFavoriteAnimals();
  console.log("All favorite animals: ", favoriteAnimals);
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
