// Shared training-program data for the landing page teaser cards and each
// program's module-list page, so module counts and availability never drift
// between the two.
export const trainingPrograms = {
  awp: {
    key: 'awp',
    number: '01',
    name: 'AWP',
    subtitle: 'Advanced Wastewater Purification System',
    description: 'This training will guide you through the operation of the onboard wastewater treatment and disposal systems. You will learn how to operate the equipment, understand the different waste streams it handles, and follow the correct procedures for safe and efficient operation.',
    route: '/training/awp',
    modules: [
      { number: 1, title: 'Introduction to Wastewater Systems', route: '/module/1' },
      { number: 2, title: 'Pre-Treatment Operation and Maintenance', route: null },
      { number: 3, title: 'Mixing and Bioreactor Tanks', route: null },
      { number: 4, title: 'Flocculation Unit', route: null },
      { number: 5, title: 'Polymer Unit', route: null },
      { number: 6, title: 'Coagulant Unit', route: null },
      { number: 7, title: 'Dissolved Air Flotation Unit', route: null },
      { number: 8, title: 'Polishing Filter Unit', route: null },
      { number: 9, title: 'UV Unit', route: null },
      { number: 10, title: 'Effluent Holding and Discharge', route: null },
      { number: 11, title: 'Ventilation Systems', route: null },
      { number: 12, title: 'Automation', route: null },
    ],
  },
  eap: {
    key: 'eap',
    number: '02',
    name: 'EAP',
    subtitle: 'Electrically Assisted Pyrolysis Technology',
    description: 'This training will introduce you to the operation of the Electrically Assisted Pyrolysis (EAP) system and the process of converting waste into valuable by-products. You will be guided through the drying and pelletizing processes, followed by the pyrolysis stage, where waste is converted into biochar and pyrogas. You will also learn how pyrogas is used to generate energy and how biochar is collected, handled, and managed.',
    route: '/training/eap',
    modules: [],
  },
  incinerator: {
    key: 'incinerator',
    number: '03',
    name: 'Incinerator',
    subtitle: 'Onboard Incinerator Operation',
    description: 'This training will guide you through the safe and effective operation of the onboard incinerator. You will learn about the different stages of the incineration process, including system preparation, waste loading, startup, operation and monitoring, and safe shutdown procedures.',
    route: '/training/incinerator',
    modules: [],
  },
}
