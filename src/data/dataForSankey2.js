export default {
  links: [
    { source: "emergency", target: "discharge", value: 3482.0 },
    { source: "emergency", target: "ECG", value: 2095.0 },
    { source: "emergency", target: "MICU", value: 2401.0 },
    { source: "emergency", target: "MED", value: 3375.9999999999995 },
    { source: "discharge", target: "emergency,HYPOTHYROIDISM", value: 1911.0 },
    { source: "discharge", target: "CMED", value: 3754.0 },
    { source: "discharge", target: "Aspirin,ECG", value: 2606.0 },
    { source: "discharge", target: "Aspirin", value: 1976.0 },
    { source: "discharge", target: "ECG", value: 2447.0 },
    { source: "discharge", target: "Statin", value: 3320.0 },
    { source: "discharge", target: "ECHO", value: 2248.0 },
    { source: "discharge", target: "CCU", value: 2113.0 },
    { source: "discharge", target: "Statin,ECG", value: 3994.0 },
    { source: "discharge", target: "MED", value: 1908.0 },
    { source: "discharge", target: "discharge", value: 2134.0 },
    {
      source: "discharge",
      target: "ischemic_hd,CONGESTIVE_HEART_FAILURE,HYPERTENSION",
      value: 2887.0
    },
    { source: "discharge", target: "Aspirin,Statin", value: 3659.0 },
    { source: "discharge", target: "HYPERTENSION", value: 2384.0 },
    { source: "discharge", target: "MICU", value: 1851.0 },
    { source: "discharge", target: "congestive_hf", value: 1874.0 },
    { source: "discharge", target: "ECHO,ECG", value: 2095.0 },
    {
      source: "discharge",
      target: "emergency,CONGESTIVE_HEART_FAILURE",
      value: 1851.0
    },
    { source: "discharge", target: "emergency,HYPERTENSION", value: 2447.0 },
    { source: "ECG", target: "ECG", value: 2095.0 },
    { source: "ECG", target: "MED,MICU", value: 2197.0 },
    { source: "ECG", target: "ECHO", value: 1976.0 },
    {
      source: "ECG",
      target: "CONGESTIVE_HEART_FAILURE,CARDIAC_ARRHYTHMIAS",
      value: 2446.0
    },
    { source: "ECG", target: "Aspirin", value: 1976.0 },
    {
      source: "ECG",
      target: "emergency,ischemic_hd,HYPERTENSION",
      value: 1844.0
    },
    { source: "ECG", target: "emergency,HYPERTENSION", value: 3320.0 },
    { source: "ECG", target: "Statin", value: 3320.0 },
    { source: "ECG", target: "MICU", value: 1860.0 },
    {
      source: "ECG",
      target: "emergency,CARDIAC_ARRHYTHMIAS,HYPERTENSION",
      value: 2248.0
    },
    {
      source: "ECG",
      target:
        "emergency,CONGESTIVE_HEART_FAILURE,HYPERTENSION,FLUID_ELECTROLYTE",
      value: 2029.0
    },
    {
      source: "ECG",
      target: "congestive_hf,emergency,ischemic_hd,HYPERTENSION",
      value: 2067.0
    },
    { source: "ECG", target: "CSRU", value: 3230.0 },
    {
      source: "ECG",
      target: "emergency,CONGESTIVE_HEART_FAILURE,CHRONIC_PULMONARY",
      value: 2661.0
    },
    { source: "ECG", target: "congestive_hf,emergency", value: 5437.0 },
    { source: "ECG", target: "emergency,CHRONIC_PULMONARY", value: 3760.0 },
    { source: "ECG", target: "FLUID_ELECTROLYTE", value: 1860.0 },
    { source: "ECG", target: "ECHO,ECG", value: 2095.0 },
    { source: "ECG", target: "CCU", value: 1899.0000000000002 },
    {
      source: "ECG",
      target: "CARDIAC_ARRHYTHMIAS,HYPERTENSION",
      value: 5519.0
    },
    { source: "CARDIAC_ARRHYTHMIAS", target: "CMED", value: 3754.0 },
    { source: "CARDIAC_ARRHYTHMIAS", target: "MED", value: 2627.0000000000005 },
    { source: "CARDIAC_ARRHYTHMIAS", target: "Aspirin", value: 2440.0 },
    { source: "CARDIAC_ARRHYTHMIAS", target: "Aspirin,ECG", value: 3409.0 },
    { source: "CMED", target: "HYPERTENSION", value: 2431.0 },
    { source: "CMED", target: "Statin", value: 2431.0 },
    { source: "CMED", target: "ischemic_hd", value: 1958.0 },
    { source: "CMED", target: "ECHO,ECG", value: 1958.0 },
    { source: "HYPERTENSION", target: "Aspirin,ECG", value: 4344.0 },
    {
      source: "Aspirin,ECG",
      target: "congestive_hf,emergency,CONGESTIVE_HEART_FAILURE",
      value: 2606.0
    },
    {
      source: "congestive_hf,CONGESTIVE_HEART_FAILURE",
      target: "ECHO,ECG",
      value: 1881.0
    },
    { source: "ECHO,ECG", target: "Aspirin", value: 2415.0 },
    { source: "ECHO,ECG", target: "emergency,HYPERTENSION", value: 2415.0 },
    { source: "Aspirin", target: "ECHO", value: 2036.0000000000002 },
    { source: "Aspirin", target: "Statin", value: 2036.0000000000002 },
    {
      source: "Aspirin",
      target: "ischemic_hd,DIABETES_UNCOMPLICATED",
      value: 2151.0
    },
    {
      source: "Aspirin",
      target: "HYPERTENSION,elective",
      value: 2036.9999999999998
    },
    { source: "Aspirin", target: "Aspirin,Statin", value: 2265.0 },
    { source: "Aspirin", target: "MED", value: 3375.9999999999995 },
    { source: "Aspirin", target: "CSRU", value: 3230.0 },
    { source: "congestive_hf", target: "MED,MICU", value: 2308.0 },
    { source: "congestive_hf", target: "ECHO", value: 1976.0 },
    {
      source: "MED,MICU",
      target: "congestive_hf,emergency,CONGESTIVE_HEART_FAILURE",
      value: 2197.0
    },
    { source: "ECHO", target: "MED", value: 2627.0000000000005 },
    { source: "ECHO", target: "RENAL_FAILURE", value: 2020.0 },
    {
      source: "MED",
      target: "congestive_hf,CONGESTIVE_HEART_FAILURE,RENAL_FAILURE",
      value: 1908.0
    },
    {
      source: "emergency,CONGESTIVE_HEART_FAILURE",
      target: "CCU",
      value: 3271.0
    },
    {
      source: "emergency,CONGESTIVE_HEART_FAILURE",
      target: "MICU",
      value: 1851.0
    },
    {
      source: "CCU",
      target: "congestive_hf,CARDIAC_ARRHYTHMIAS",
      value: 2113.0
    },
    {
      source: "CCU",
      target: "CONGESTIVE_HEART_FAILURE",
      value: 1899.0000000000002
    },
    { source: "emergency,HYPERTENSION", target: "Statin,ECG", value: 2600.0 },
    { source: "Aspirin,Statin", target: "HYPERLIPIDEMIA", value: 3659.0 }
  ],
  nodes: [
    { name: "emergency" },
    { name: "discharge" },
    { name: "ECG" },
    { name: "emergency,HYPOTHYROIDISM" },
    { name: "CARDIAC_ARRHYTHMIAS" },
    { name: "CMED" },
    { name: "HYPERTENSION" },
    { name: "Aspirin,ECG" },
    { name: "congestive_hf,CONGESTIVE_HEART_FAILURE" },
    { name: "ECHO,ECG" },
    { name: "Aspirin" },
    { name: "congestive_hf" },
    { name: "MED,MICU" },
    { name: "ECHO" },
    { name: "Statin" },
    { name: "MED" },
    { name: "RENAL_FAILURE" },
    { name: "CONGESTIVE_HEART_FAILURE,CARDIAC_ARRHYTHMIAS" },
    { name: "emergency,CONGESTIVE_HEART_FAILURE" },
    { name: "CCU" },
    { name: "emergency,ischemic_hd,HYPERTENSION" },
    { name: "emergency,HYPERTENSION" },
    { name: "ischemic_hd,DIABETES_UNCOMPLICATED" },
    { name: "MICU" },
    { name: "congestive_hf,CARDIAC_ARRHYTHMIAS" },
    { name: "congestive_hf,emergency,CONGESTIVE_HEART_FAILURE" },
    { name: "HYPERTENSION,elective" },
    { name: "emergency,CARDIAC_ARRHYTHMIAS,HYPERTENSION" },
    {
      name: "emergency,CONGESTIVE_HEART_FAILURE,HYPERTENSION,FLUID_ELECTROLYTE"
    },
    { name: "Statin,ECG" },
    { name: "congestive_hf,CONGESTIVE_HEART_FAILURE,RENAL_FAILURE" },
    { name: "congestive_hf,emergency,ischemic_hd,HYPERTENSION" },
    { name: "ischemic_hd,CONGESTIVE_HEART_FAILURE,HYPERTENSION" },
    { name: "Aspirin,Statin" },
    { name: "HYPERLIPIDEMIA" },
    { name: "CSRU" },
    { name: "emergency,CONGESTIVE_HEART_FAILURE,CHRONIC_PULMONARY" },
    { name: "congestive_hf,emergency" },
    { name: "congestive_hf, FLUID_ELECTROLYTE" },
    { name: "emergency,CHRONIC_PULMONARY" },
    { name: "FLUID_ELECTROLYTE" },
    { name: "ischemic_hd" },
    { name: "CONGESTIVE_HEART_FAILURE" },
    { name: "CARDIAC_ARRHYTHMIAS,HYPERTENSION" }
  ]
};
