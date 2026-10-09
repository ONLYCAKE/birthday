import { useMemo } from "react";
import { useNow } from "./useCountdown";
import { getUnlockSnapshot } from "../utils/birthdayTime";
import type { UnlockSnapshot } from "../types/birthday";

export function useBirthdayUnlock(): UnlockSnapshot {
  const now = useNow();
  return useMemo(() => getUnlockSnapshot(new Date(now)), [now]);
}
