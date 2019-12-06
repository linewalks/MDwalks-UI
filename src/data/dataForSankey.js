export default {
  nodes: [
    {
      name: 'ECG',
    },
    {
      name: 'elective',
    },
    {
      name: 'MICU',
    },
    {
      name: 'ECHO',
    },
    {
      name: 'CMED',
    },
    {
      name: 'VSURG',
    },
    {
      name: 'urgent',
    },

    {
      name: 'CSRU',
    },

    {
      name: 'SURG',
    },
    {
      name: 'MED',
    },
    {
      name: 'CABG',
    },
    {
      name: 'PCI',
    },

    {
      name: 'died',
    },

    {
      name: 'CSURG',
    },
    {
      name: 'emergency',
    },

    {
      name: 'CCU',
    },
  ],
  links: [
    {
      source: 'emergency',
      target: 'CMED',
      value: 4463,
    },
    {
      source: 'emergency',
      target: 'MICU',
      value: 2958,
    },
    {
      source: 'emergency',
      target: 'CCU',
      value: 1607,
    },
    {
      source: 'emergency',
      target: 'SURG',
      value: 860,
    },
    {
      source: 'emergency',
      target: 'CSURG',
      value: 531,
    },
    {
      source: 'emergency',
      target: 'CABG',
      value: 469,
    },
    {
      source: 'emergency',
      target: 'VSURG',
      value: 357,
    },
    {
      source: 'elective',
      target: 'CSURG',
      value: 233,
    },
    {
      source: 'elective',
      target: 'ECG',
      value: 95,
    },
    {
      source: 'emergency',
      target: 'CSRU',
      value: 338,
    },
    {
      source: 'emergency',
      target: 'ECG',
      value: 63,
    },
    {
      source: 'VSURG',
      target: 'ECG',
      value: 340,
    },
    {
      source: 'VSURG',
      target: 'CSRU',
      value: 114,
    },
    {
      source: 'VSURG',
      target: 'ECHO',
      value: 67,
    },
    {
      source: 'ECG',
      target: 'ECHO',
      value: 8892,
    },
    {
      source: 'CCU',
      target: 'ECG',
      value: 2996,
    },
    {
      source: 'CCU',
      target: 'CMED',
      value: 1736,
    },
    {
      source: 'CCU',
      target: 'ECHO',
      value: 924,
    },
    {
      source: 'CCU',
      target: 'MED',
      value: 386,
    },
    {
      source: 'CSRU',
      target: 'ECG',
      value: 1626,
    },
    {
      source: 'CSRU',
      target: 'CABG',
      value: 1281,
    },
    {
      source: 'CSRU',
      target: 'CSURG',
      value: 1093,
    },
    {
      source: 'CSRU',
      target: 'ECHO',
      value: 459,
    },
    {
      source: 'ECG',
      target: 'died',
      value: 1175,
    },
    {
      source: 'ECHO',
      target: 'died',
      value: 413,
    },
    {
      source: 'MICU',
      target: 'died',
      value: 373,
    },
    {
      source: 'MED',
      target: 'died',
      value: 185,
    },
    {
      source: 'CCU',
      target: 'died',
      value: 134,
    },
    {
      source: 'ECG',
      target: 'PCI',
      value: 2,
    },
    {
      source: 'CMED',
      target: 'PCI',
      value: 1,
    },
    {
      source: 'PCI',
      target: 'CCU',
      value: 1,
    },
    {
      source: 'PCI',
      target: 'died',
      value: 1,
    },
    {
      source: 'PCI',
      target: 'ECHO',
      value: 1,
    },
    {
      source: 'urgent',
      target: 'CMED',
      value: 323,
    },
    {
      source: 'urgent',
      target: 'MED',
      value: 119,
    },
    {
      source: 'urgent',
      target: 'CCU',
      value: 66,
    },
    {
      source: 'urgent',
      target: 'MICU',
      value: 53,
    },
    {
      source: 'urgent',
      target: 'CSURG',
      value: 46,
    },
    {
      source: 'SURG',
      target: 'ECG',
      value: 561,
    },
    {
      source: 'SURG',
      target: 'ECHO',
      value: 144,
    },
    {
      source: 'SURG',
      target: 'MICU',
      value: 83,
    },
    {
      source: 'CSRU',
      target: 'ECG',
      value: 1626,
    },
    {
      source: 'CSRU',
      target: 'CABG',
      value: 1281,
    },
    {
      source: 'CSRU',
      target: 'CSURG',
      value: 1093,
    },
    {
      source: 'CSRU',
      target: 'ECHO',
      value: 459,
    },
  ],
}
