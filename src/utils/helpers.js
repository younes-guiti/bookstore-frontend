export function capitalize(text) {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncate(text, length) {
  if (text.length <= length) return text;

  return text.substring(0, length) + "...";
}

export function randomId() {
  return Math.floor(Math.random() * 1000000);
}