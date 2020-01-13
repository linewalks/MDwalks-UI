const utility = require('@Components/button/utility');

it('addLight', () => {
  expect(utility.addLight(0, 0)).toBe('00')
  expect(utility.addLight('ff', 0)).toBe('ff')
  expect(utility.addLight('ff', 10)).toBe('ff')
  expect(utility.addLight('f0', 1)).toBe('f1')
})

it('lighten', () => {
  expect(utility.lighten('#ffffff', 0)).toBe('#ffffff')
  expect(utility.lighten('#cccccc', 10)).toBe('#e5e5e5')

  expect(utility.lighten('cccccc', 10)).toBe('#e5e5e5')
})

it('subtractLight', () => {
  expect(utility.subtractLight(0, 0)).toBe('00')
  expect(utility.subtractLight('ff', 0)).toBe('ff')
  expect(utility.subtractLight('ff', 10)).toBe('f5')
  expect(utility.subtractLight('f0', 1)).toBe('ef')

  expect(utility.subtractLight(0, 1)).toBe('00')
})

it('darken', () => {
  expect(utility.darken('#ffffff', 0)).toBe('#ffffff')
  expect(utility.darken('#cccccc', 10)).toBe('#b3b3b3')

  expect(utility.darken('ffffff', 0)).toBe('#ffffff')
})

it('darken', () => {
  expect(utility.hexToRGB('#ffffff', 0)).toBe('rgb(255,255,255)')
  expect(utility.hexToRGB('#cccccc', 0.1)).toBe('rgba(204,204,204,0.1)')
})

describe('timeFormatConvert', () => {
  it('defalut', () => {
    const date = new Date('2020-1-09')
    expect(utility.timeFormatConvert(date)).toBe('2020-01-09')
    expect(utility.timeFormatConvert(date, 'YYYY.MM.DD')).toBe('2020.01.09')
    expect(utility.timeFormatConvert(date, 'HH:mm')).toBe('00:00')
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
    expect(utility.getDateDiff(startTime, endTime)).toBe('');
  })

  it('2019-01-30, 2019-02-01', () => {
    startTime = '2019-01-30';
    endTime = '2019-02-01';
    expect(utility.getDateDiff(startTime, endTime)).toBe('1 month');
  });

  it('2019-01-30, 2019-03-01', () => {
    startTime = '2019-01-30';
    endTime = '2019-03-01';
    expect(utility.getDateDiff(startTime, endTime)).toBe('2 months');
  });

  it('2019-01-30, 2019-01-31', () => {
    startTime = '2019-01-30';
    endTime = '2019-01-31';
    expect(utility.getDateDiff(startTime, endTime)).toBe('1 day');
  });

  it('2019-01-30, 2020-01-01', () => {
    startTime = '2019-01-30';
    endTime = '2020-01-01';
    expect(utility.getDateDiff(startTime, endTime)).toBe('1 year');
  });

  it('2019-01-30, 2020-02-01', () => {
    startTime = '2019-01-30';
    endTime = '2020-02-01';
    expect(utility.getDateDiff(startTime, endTime)).toBe('1 year 1 month');
  });

  it('2019-01-30, 2019-02-21', () => {
    startTime = '2019-01-30';
    endTime = '2019-02-21';
    expect(utility.getDateDiff(startTime, endTime)).toBe('1 month');
  });

  it('2019-01-30, 2020-01-31', () => {
    startTime = '2019-01-30';
    endTime = '2020-01-31';
    expect(utility.getDateDiff(startTime, endTime)).toBe('1 year');
  });

  it('2019-01-31, 2019-01-30', () => {
    startTime = '2019-01-31';
    endTime = '2019-01-30';
    expect(utility.getDateDiff(startTime, endTime)).toBe('-');
  });

  it('2019-03-31, 2019-01-30', () => {
    startTime = '2019-03-31';
    endTime = '2019-01-30';
    expect(utility.getDateDiff(startTime, endTime)).toBe('-');
  });

  it('2020-01-31, 2019-01-30', () => {
    startTime = '2020-01-31';
    endTime = '2019-01-30';
    expect(utility.getDateDiff(startTime, endTime)).toBe('-');
  });
})

describe('isDate', () => {
  let date
  it('emtpy', () => {
    date = new Date();
    expect(utility.isDate(date)).toBeTruthy();
  })
  it('asb', () => {
    date = new Date('asb');
    expect(utility.isDate(date)).toBeFalsy();
  })
  it('1234', () => {
    date = '1234';
    expect(utility.isDate(date)).toBeFalsy();
  })
})

describe('isValidPeriod', () => {
  let startTime
  let endTime
  it('2019-01-31, 2019-01-30', () => {
    startTime = '2019-01-31'
    endTime = '2019-01-30'
    expect(() => utility.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('2019-03-31, 2019-01-30', () => {
    startTime = '2019-03-31'
    endTime = '2019-01-30'
    expect(() => utility.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('2020-01-31. 2019-01-30', () => {
    startTime = '2020-01-31'
    endTime = '2019-01-30'
    expect(() => utility.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('123, asdf', () => {
    startTime = '123'
    endTime = 'asdf'
    expect(() => utility.isValidPeriod(startTime, endTime)).toThrow();
  })
  it('2019-01-31, 2019-02-01', () => {
    startTime = '2019-01-31'
    endTime = '2019-02-01'
    expect(() => utility.isValidPeriod(startTime, endTime)).toBeTruthy();
  })
})
