export const hasLetter = (value: string) => /[a-zA-Z]/.test(value);
export const hasNumberOrSpecial = (value: string) => /[\d#?!&]/.test(value);
export const isLongEnough = (value: string) => value.length >= 10;
