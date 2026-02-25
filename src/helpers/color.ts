export function getColorFromText(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return {
    dark: `hsl(${hue}, 65%, 20%)`,
    base: `hsl(${hue}, 65%, 50%)`,
    light: `hsla(${hue}, 65%, 50%, 0.1)`,
  };
}
