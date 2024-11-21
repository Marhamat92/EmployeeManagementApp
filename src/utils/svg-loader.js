export async function loadSVG(url) {
  const response = await fetch(url);
  return await response.text();
}