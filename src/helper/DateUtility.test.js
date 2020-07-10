import * as DateUtility from '@src/helper/DateUtility'

describe('timeFormatConvert', () => {
  it('defalut', () => {
    const date = new Date('2020-1-09')
    expect(DateUtility.timeFormatConvert(date)).toBe('2020-01-09')
    expect(DateUtility.timeFormatConvert(date, 'YYYY.MM.DD')).toBe('2020.01.09')
    expect(DateUtility.timeFormatConvert(date, 'HH:mm')).toBe('00:00')
  })
})

describe('getDateDiff', () => {
  let startTime;
  let endTime;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  })

  it('2019-01-30, 2019-01-30', () => {
    startTime = '2019-01-30';
    endTime = '2019-01-30';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('');
  })

  it('2019-01-30, 2019-02-01', () => {
    startTime = '2019-01-30';
    endTime = '2019-02-01';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('1 month');
  });

  it('2019-01-30, 2019-03-01', () => {
    startTime = '2019-01-30';
    endTime = '2019-03-01';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('2 months');
  });

  it('2019-01-30, 2019-01-31', () => {
    startTime = '2019-01-30';
    endTime = '2019-01-31';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('1 day');
  });

  it('2019-01-30, 2020-01-01', () => {
    startTime = '2019-01-30';
    endTime = '2020-01-01';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('1 year');
  });

  it('2019-01-30, 2020-02-01', () => {
    startTime = '2019-01-30';
    endTime = '2020-02-01';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('1 year 1 month');
  });

  it('2019-01-30, 2019-02-21', () => {
    startTime = '2019-01-30';
    endTime = '2019-02-21';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('1 month');
  });

  it('2019-01-30, 2020-01-31', () => {
    startTime = '2019-01-30';
    endTime = '2020-01-31';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('1 year');
  });

  it('2019-01-31, 2019-01-30', () => {
    startTime = '2019-01-31';
    endTime = '2019-01-30';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('-');
  });

  it('2019-03-31, 2019-01-30', () => {
    startTime = '2019-03-31';
    endTime = '2019-01-30';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('-');
  });

  it('2020-01-31, 2019-01-30', () => {
    startTime = '2020-01-31';
    endTime = '2019-01-30';
    expect(DateUtility.getDateDiff(startTime, endTime)).toBe('-');
  });
})

describe('isDate', () => {
  let date
  it('emtpy', () => {
    date = new Date();
    expect(DateUtility.isDate(date)).toBeTruthy();
  })
  it('asb', () => {
    date = new Date('asb');
    expect(DateUtility.isDate(date)).toBeFalsy();
  })
  it('1234', () => {
    date = '1234';
    expect(DateUtility.isDate(date)).toBeFalsy();
  })
})

describe('isValidPeriod', () => {
  let startTime
  let endTime
  it('2019-01-31, 2019-01-30', () => {
    startTime = '2019-01-31'
    endTime = '2019-01-30'
    expect(() => DateUtility.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('2019-03-31, 2019-01-30', () => {
    startTime = '2019-03-31'
    endTime = '2019-01-30'
    expect(() => DateUtility.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('2020-01-31. 2019-01-30', () => {
    startTime = '2020-01-31'
    endTime = '2019-01-30'
    expect(() => DateUtility.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('123, asdf', () => {
    startTime = '123'
    endTime = 'asdf'
    expect(() => DateUtility.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('2019-01-31, 2019-02-01', () => {
    startTime = '2019-01-31'
    endTime = '2019-02-01'
    expect(() => DateUtility.isValidPeriod(startTime, endTime)).toBeTruthy();
  })
})
