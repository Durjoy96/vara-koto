export default async function BanglishToBangla(
  banglishText: string,
): Promise<String> {
  const res = await fetch(
    `https://inputtools.google.com/request?text=${banglishText}&itc=bn-t-i0-und&num=1`,
  );
  const data = await res.json();
  const banglaText = data[1][0][1][0];
  return banglaText;
}
