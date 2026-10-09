export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function answersMatch(input: string, expected: string): boolean {
  const given = normalizeAnswer(input);
  return given.length > 0 && given === normalizeAnswer(expected);
}
