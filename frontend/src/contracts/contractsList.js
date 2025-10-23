import BasicMath from "../contracts/BasicMath.json";
import ControlStructures from "../contracts/ControlStructures.json";
import EmployeeStorage from "../contracts/EmployeeStorage.json";
import ArraysExercise from "../contracts/ArraysExercise.json";
import FavoriteRecords from "../contracts/FavoriteRecords.json";
import GarageManager from "../contracts/GarageManager.json";
import Salesperson from "../contracts/07_Salesperson.json";
import EngineeringManager from "../contracts/07_EngineeringManager.json";
import InheritanceSubmission from "../contracts/07_InheritanceSubmission.json";
import ImportsExercise from "../contracts/ImportsExercise.json";
import ErrorTriageExercise from "../contracts/ErrorTriageExercise.json";
import AddressBookFactory from "../contracts/10_AddressBookFactory.json";
import UnburnableToken from "../contracts/UnburnableToken.json";
import WeightedVoting from "../contracts/WeightedVoting.json";
import HaikuNFT from "../contracts/HaikuNFT.json";

// ✅ Danh sách phê duyệt cho FavoriteRecords
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

const contractsList = [
  { name: "BasicMath", abi: BasicMath.abi, bytecode: BasicMath.bytecode, args: [] },
  { name: "ControlStructures", abi: ControlStructures.abi, bytecode: ControlStructures.bytecode, args: [] },
  { name: "EmployeeStorage", abi: EmployeeStorage.abi, bytecode: EmployeeStorage.bytecode, args: [1000, "Pat", 50000, 112358132134] },
  { name: "ArraysExercise", abi: ArraysExercise.abi, bytecode: ArraysExercise.bytecode, args: [] },
  { name: "FavoriteRecords", abi: FavoriteRecords.abi, bytecode: FavoriteRecords.bytecode, args: [approvedRecords] },
  { name: "GarageManager", abi: GarageManager.abi, bytecode: GarageManager.bytecode, args: [] },
  { name: "Salesperson", abi: Salesperson.abi, bytecode: Salesperson.bytecode, args: [55555, 12345, 20] },
  { name: "EngineeringManager", abi: EngineeringManager.abi, bytecode: EngineeringManager.bytecode, args: [54321, 11111, 200000] },
  { name: "InheritanceSubmission", abi: InheritanceSubmission.abi, bytecode: InheritanceSubmission.bytecode, args: null },
  { name: "ImportsExercise", abi: ImportsExercise.abi, bytecode: ImportsExercise.bytecode, args: [] },
  { name: "ErrorTriageExercise", abi: ErrorTriageExercise.abi, bytecode: ErrorTriageExercise.bytecode, args: [] },
  { name: "AddressBookFactory", abi: AddressBookFactory.abi, bytecode: AddressBookFactory.bytecode, args: [] },
  { name: "UnburnableToken", abi: UnburnableToken.abi, bytecode: UnburnableToken.bytecode, args: [] },
  { name: "WeightedVoting", abi: WeightedVoting.abi, bytecode: WeightedVoting.bytecode, args: ["Test Weighted", "TESTW"] },
  { name: "HaikuNFT", abi: HaikuNFT.abi, bytecode: HaikuNFT.bytecode, args: ["Test Haiku NFT", "HAIKU"] },
];

export default contractsList;
