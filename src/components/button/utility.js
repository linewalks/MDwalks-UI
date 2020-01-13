/* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
export const addLight = (color, amount) => {
  const cc = parseInt(color, 16) + amount;
  let c = (cc > 255) ? 255 : (cc);
  c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;
  return c;
}

/* const hexToRGB = (color) => {
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  let colorRGB = [color.substring(0,2)]
} */

/* Aclara un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
export const lighten = (colorOrigin, amountOrigin) => {
  const color = (colorOrigin.indexOf('#') >= 0) ? colorOrigin.substring(1, colorOrigin.length) : colorOrigin;
  const amount = parseInt((255 * amountOrigin) / 100, 10)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(color.substring(4, 6), amount)}`;
}

/* Resta el porcentaje indicado a un color (RR, GG o BB) hexadecimal para oscurecerlo */
export const subtractLight = (color, amount) => {
  const cc = parseInt(color, 16) - amount;
  let c = (cc < 0) ? 0 : (cc);
  c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;
  return c;
}

/* Oscurece un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
export const darken = (colorOrigin, amountOrigin) => {
  const color = (colorOrigin.indexOf('#') >= 0) ? colorOrigin.substring(1, colorOrigin.length) : colorOrigin;
  const amount = parseInt((255 * amountOrigin) / 100, 10);
  return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(color.substring(2, 4), amount)}${subtractLight(color.substring(4, 6), amount)}`;
}

export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const rgb = [r, g, b]

  if (alpha) {
    return `rgba(${rgb.join(',')},${alpha})`;
  }
  return `rgb(${rgb.join(',')})`;
}
