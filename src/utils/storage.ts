const PREFIX = "dhruv-birthday.";

export const storageKeys = {
  auth: `${PREFIX}auth`,
  introSeen: `${PREFIX}intro`,
  opened: `${PREFIX}opened`,
};

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // A full or blocked browser store should never stop the surprise.
  }
}
