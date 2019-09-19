export default {
  links: [
    { source: "CABG", target: "Aspirin", value: 39 },
    { source: "Chemistry Troponin T", target: "CABG", value: 43 },
    { source: "Chemistry Troponin T", target: "ECG", value: 39 },
    { source: "ECG", target: "CABG", value: 39 },
    { source: "emergency", target: "Chemistry Troponin T", value: 42 },
    {
      source: "emergency,ischemic_hd",
      target: "Chemistry Troponin T",
      value: 41
    },
    { source: "ischemic_hd", target: "Chemistry Troponin T", value: 42 }
  ],
  nodes: [
    { name: "CABG" },
    { name: "Chemistry Troponin T" },
    { name: "ECG" },
    { name: "ischemic_hd" },
    { name: "Aspirin" },
    { name: "emergency,ischemic_hd" },
    { name: "emergency" }
  ]
};
