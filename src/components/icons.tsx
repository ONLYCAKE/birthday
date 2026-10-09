export function LockIcon() {
  return (
    <svg className="lock-icon" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M16 21v-5.5a8 8 0 0 1 16 0V21" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="11" y="20" width="26" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="24" cy="29" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 20s-7-4.4-7-9.1C5 8 6.8 6.2 9 6.2c1.3 0 2.4.6 3 1.6.6-1 1.7-1.6 3-1.6 2.2 0 4 1.8 4 4.7C19 15.6 12 20 12 20z"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 17V6l10-2v11" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="17" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="15" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
