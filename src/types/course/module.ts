import { Module, ModulesLockConditionType } from "@prisma/client";

export type T_Module = Module & {
  lock?: {
    isLocked: boolean,
    lockType: ModulesLockConditionType,
    lockMetadata: T_LockMetadata
  }
}

type T_LockMetadata = {
  requiredDate?: Date
} 