export function removeSpacesAndSpecialChars(inputString: string): string {
  // Use a regular expression to match spaces and special characters
  const regex = /[\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

  // Replace matched characters with an empty string
  const cleanedString = inputString.replace(regex, '');

  return cleanedString;
}
