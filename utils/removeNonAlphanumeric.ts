export function removeNonAlphanumeric(str) {
  return str.replace(/[^a-z0-9]/gi, "");
}
