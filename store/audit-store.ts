import { create } from "zustand";

import type {
  AuditResult,
} from "@/types/audit";

type AuditStore = {
  result: AuditResult | null;

  setResult: (
    result: AuditResult
  ) => void;
};

export const useAuditStore =
  create<AuditStore>((set) => ({
    result: null,

    setResult: (result) =>
      set({
        result,
      }),
  }));