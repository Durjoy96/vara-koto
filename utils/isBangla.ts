// This function return true if the text has Bengali letters, false if English/Banglish
export default function isBangla(text: string): boolean {
  return /[\u0980-\u09FF]/.test(text);
}

const res = isBangla("জগন্নাথগঞ্জ ঘাট");

console.log(res);
