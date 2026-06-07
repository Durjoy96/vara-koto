export default async function BanglishToBangla(
  banglishText: string,
): Promise<string> {
  const words = banglishText.trim().split(/\s+/);
  const translatedWords = [];

  for (const word of words) {
    if (!word) continue;
    
    // If word is already Bangla, keep it
    if (/[\u0980-\u09FF]/.test(word) && !/[a-zA-Z]/.test(word)) {
      translatedWords.push(word);
      continue;
    }

    try {
      const res = await fetch(
        `https://inputtools.google.com/request?text=${word}&itc=bn-t-i0-und&num=1`,
      );
      const data = await res.json();
      if (data[0] === "SUCCESS" && data[1] && data[1][0] && data[1][0][1] && data[1][0][1][0]) {
        translatedWords.push(data[1][0][1][0]);
      } else {
        translatedWords.push(word);
      }
    } catch (e) {
      translatedWords.push(word);
    }
  }
  
  return translatedWords.join(" ");
}
