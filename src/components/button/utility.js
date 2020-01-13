import _ from 'lodash'

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

export const timeFormatConvert = (time, format = 'YYYY-MM-DD') => {
  const d = new Date(time)

  return format
    .replace('YYYY', d.getFullYear())
    .replace('MM', (`0${d.getMonth() + 1}`).slice(-2))
    .replace('DD', (`0${d.getDate()}`).slice(-2))
    .replace('HH', (`0${d.getHours()}`).slice(-2))
    .replace('mm', (`0${d.getMinutes()}`).slice(-2))
}

export const isDate = (arg) => (_.isDate(arg) && !_.isNaN(arg.valueOf()));

export const isValidPeriod = (startTime, endTime) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (!isDate(startDate) || !isDate(endDate)) {
    throw new Error('Parameter is wrong.');
  }

  if (startDate.valueOf() > endDate.valueOf()) {
    throw new Error(`Can't be faster "startTime" than "endTime".`);
  }

  return true;
}

const getMonthDiff = (dateFrom, dateTo) => (
  dateTo.getMonth() - dateFrom.getMonth()
    + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
)

const getDayDiff = (dateFrom, dateTo) => (
  Math.ceil(Math.abs(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24))
)

export const pathwayTableTimeFormatter = (dateFrom, dateTo) => {
  const month = getMonthDiff(dateFrom, dateTo)
  const day = getDayDiff(dateFrom, dateTo)

  if (month === 0 && day === 0) return ''

  if (month === 0) {
    return `${day} ${day > 1 ? 'days' : 'day'}`;
  }

  const arr = []

  const calYear = Math.floor(month / 12);
  const calMonth = month % 12

  if (calYear !== 0) {
    arr.push(`${calYear} ${calYear > 1 ? 'years' : 'year'}`)
  }

  if (calMonth !== 0) {
    arr.push(`${calMonth} ${calMonth > 1 ? 'months' : 'month'}`)
  }

  return arr.join(' ')
}

export const getDateDiff = (startTime, endTime) => {
  let rStr = '';
  try {
    isValidPeriod(startTime, endTime);
    rStr = pathwayTableTimeFormatter(new Date(startTime), new Date(endTime))
  } catch (error) {
    rStr = '-';
    console.error(error.message);
  }
  return rStr;
}
