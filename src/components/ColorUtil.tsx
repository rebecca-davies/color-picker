export const packHSL = (hue: number, saturation: number, lightness: number) => {
  return (hue << (3 + 7)) | (saturation << 7) | lightness;
};

export const convertToHex = (h: number, s: number, l: number) => {
  let hue = (h / 63) * 360;
  const saturation = (s / 7) * 100;
  const lightness = (l / 127) * 100;

  // Adjusting hue to handle 360 degrees as 0 degrees
  if (hue === 360) {
    hue = 0;
  }

  const chroma = (1 - Math.abs(2 * (lightness / 100) - 1)) * (saturation / 100);
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness / 100 - chroma / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= hue && hue < 60) {
    r = chroma;
    g = x;
    b = 0;
  } else if (60 <= hue && hue < 120) {
    r = x;
    g = chroma;
    b = 0;
  } else if (120 <= hue && hue < 180) {
    r = 0;
    g = chroma;
    b = x;
  } else if (180 <= hue && hue < 240) {
    r = 0;
    g = x;
    b = chroma;
  } else if (240 <= hue && hue < 300) {
    r = x;
    g = 0;
    b = chroma;
  } else if (300 <= hue && hue < 360) {
    r = chroma;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const convertToCSSColor = (h: number, s: number, l: number) => {
  const hue = (h / 63) * 360;
  const saturation = (s / 7) * 100;
  const lightness = (l / 127) * 100;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
