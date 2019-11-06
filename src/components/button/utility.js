
/* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
export const addLight = function(color, amount){
  let cc = parseInt(color,16) + amount;
  let c = (cc > 255) ? 255 : (cc);
  c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
  return c;
}

/* const hexToRGB = (color) => {
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  let colorRGB = [color.substring(0,2)]
} */

/* Aclara un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
export const lighten = (color, amount)=> {
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  amount = parseInt((255*amount)/100);
  return color = `#${addLight(color.substring(0,2), amount)}${addLight(color.substring(2,4), amount)}${addLight(color.substring(4,6), amount)}`;
}

/* Resta el porcentaje indicado a un color (RR, GG o BB) hexadecimal para oscurecerlo */
export const subtractLight = function(color, amount){
  let cc = parseInt(color,16) - amount;
  let c = (cc < 0) ? 0 : (cc);
  c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
  return c;
}

/* Oscurece un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
export const darken = (color, amount) =>{
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  amount = parseInt((255*amount)/100);
  return color = `#${subtractLight(color.substring(0,2), amount)}${subtractLight(color.substring(2,4), amount)}${subtractLight(color.substring(4,6), amount)}`;
}

export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  const rgb = [r,g,b]

  if (alpha) {
    return `rgba(${rgb.join(',')},${alpha})`;
  } else {
    return `rgb(${rgb.join(',')})`;
  }
}