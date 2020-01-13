import _ from 'lodash'

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
