const hre = require("hardhat");

async function main() {
	const [deployer] = await hre.ethers.getSigners();

	const startBalanceWei = await hre.ethers.provider.getBalance(deployer.address);
	const startBalanceEth = hre.ethers.formatEther(startBalanceWei);

	console.log("🚀 Deploying with address:", deployer.address);
	console.log("💰 Start balance:", startBalanceEth, "ETH\n");

	// Helper để deploy & log gas + số thứ tự
	async function deployAndLog(index, name, args = []) {
		const contract = await hre.ethers.deployContract(name, args);
		await contract.waitForDeployment();

		const tx = contract.deploymentTransaction();
		const receipt = await tx.wait();

		const gasUsed = receipt.gasUsed;
		const gasPrice = receipt.gasPrice;
		const costWei = gasUsed * gasPrice;
		const costEth = hre.ethers.formatEther(costWei);

		console.log(`${index}. ${name} deployed at: ${contract.target}`);
		console.log(`   Gas used: ${gasUsed.toString()}`);
		console.log(`   Cost: ${costEth} ETH\n`);

		return contract;
	}

	// Danh sách deploy
	await deployAndLog(1, "BasicMath");
	await deployAndLog(2, "ControlStructures");
	await deployAndLog(3, "EmployeeStorage", [1000, "Pat", 50000, 112358132134]);
	await deployAndLog(4, "ArraysExercise");

	const approvedRecords = [
		"Thriller",
		"Back in Black",
		"The Bodyguard",
		"The Dark Side of the Moon",
		"Their Greatest Hits (1971-1975)",
		"Hotel California",
		"Come On Over",
		"Rumours",
		"Saturday Night Fever",
	];
	await deployAndLog(5, "FavoriteRecords", [approvedRecords]);

	await deployAndLog(6, "GarageManager");

	const salesperson = await deployAndLog(7, "Salesperson", [55_555, 12_345, 20]);
	const engineeringManager = await deployAndLog(8, "EngineeringManager", [54_321, 11_111, 200_000]);

	await deployAndLog(9, "InheritanceSubmission", [
		salesperson.target,
		engineeringManager.target,
	]);

	await deployAndLog(10, "ImportsExercise");
	await deployAndLog(11, "ErrorTriageExercise");
	await deployAndLog(12, "AddressBookFactory");
	await deployAndLog(13, "UnburnableToken");
	await deployAndLog(14, "WeightedVoting", ["Test Weighted", "TESTW"]);
	await deployAndLog(15, "HaikuNFT", ["Test Haiku NFT", "Test"]);

	// Balance cuối
	const endBalanceWei = await hre.ethers.provider.getBalance(deployer.address);
	const endBalanceEth = hre.ethers.formatEther(endBalanceWei);

	console.log("✅ Deploy finished");
	console.log("💰 End balance:", endBalanceEth, "ETH");
	console.log("🔻 Total spent:", (startBalanceEth - endBalanceEth).toString(), "ETH");
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
// npx hardhat run scripts/deploy.js --network baseSepolia
