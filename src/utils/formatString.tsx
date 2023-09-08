export const formatString = (string: string) => {
  const firstLetter = string.charAt(0).toUpperCase();
  const remaining = string.slice(1).split('_').join(' ');
  return firstLetter + remaining;
};
