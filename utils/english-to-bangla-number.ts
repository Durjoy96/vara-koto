export const englishToBanglaNumber = (
  num: number | string | undefined | null,
) => {
  if (num === undefined || num === null) return "০";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};
