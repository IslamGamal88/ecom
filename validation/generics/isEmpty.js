const isEmpty = input =>
  input === null ||
  input === undefined ||
  (typeof input === "object" && Object.keys(input).length === 0) ||
  (typeof input === "string" && input.trim().length === 0);

module.exports = isEmpty;
