import { consumeContractAllowance } from "./consume-contract-allowance";
import { createContractAllowance } from "./create-contract-allowance";
import { getAvailableContractAllowances } from "./get-available-contract-allowance";
import { getNextContractAllowance } from "./get-next-contract-allowance";
import { isContractConsumed } from "./is-contract-consumeed";
import { refillContractAllowanceForUser } from "./refill-contract-allowance-for-user";

const ContractAllowanceService = {
    createContractAllowance,
    refillContractAllowanceForUser,
    getAvailableContractAllowances,
    getNextContractAllowance,
    consumeContractAllowance,
    isContractConsumed,
}

export default ContractAllowanceService