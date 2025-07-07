export const maskEmail = (email: string) => {
  const [localPart, domainPart] = email.split("@");

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedLocal = `${firstChar}${"*".repeat(
    Math.max(0, localPart.length - 2)
  )}${lastChar}`;

  const domainName = domainPart.split(".")[0];
  const domainFirstChar = domainName[0];
  const maskedDomain = `${domainFirstChar}${"*".repeat(
    Math.max(0, domainName.length - 1)
  )}`;
  const domainSuffix = domainPart.slice(domainName.length);

  return `${maskedLocal}@${maskedDomain}${domainSuffix}`;
};
