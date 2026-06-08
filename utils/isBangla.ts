// This function return true if the text has Bengali letters, false if English/Banglish
export default function isBangla(text: string): boolean {
  if (/[a-zA-Z]/.test(text)) {
    return false;
  }
  return /[\u0980-\u09FF]/.test(text);
}
