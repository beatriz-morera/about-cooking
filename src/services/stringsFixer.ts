export default function tagsHandler(str: string) {
  if (str) {
    return `* ${str.split(',')[0]}`;
  }
  return null;
}
