export function removeSpacesAndSpecialChars(inputString: string): string {
  // Remove special characters using a regular expression
  const stringWithoutSpecialChars = inputString.replace(/[^\w\s-]/g, '');

  // Replace spaces with hyphens
  const stringWithHyphens = stringWithoutSpecialChars.replace(/\s+/g, '-');

  return stringWithHyphens;
}
