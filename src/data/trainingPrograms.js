// Shared training-program data for the landing page teaser cards and each
// program's module-list page, so module counts and availability never drift
// between the two.
export const trainingPrograms = {
  awp: {
    key: 'awp',
    number: '01',
    name: 'AWP',
    subtitle: 'AWP Training Program',
    description: 'A structured curriculum covering the full set of procedures crew need to work toward AWP certification.',
    route: '/training/awp',
    modules: [
      { number: 1, title: 'Introduction to Wastewater Systems', route: '/module/1' },
      { number: 2, title: 'Module 2', route: null },
      { number: 3, title: 'Module 3', route: null },
      { number: 4, title: 'Module 4', route: null },
      { number: 5, title: 'Module 5', route: null },
      { number: 6, title: 'Module 6', route: null },
      { number: 7, title: 'Module 7', route: null },
    ],
  },
  ep: {
    key: 'ep',
    number: '02',
    name: 'EP',
    subtitle: 'EP Training Program',
    description: 'A structured curriculum covering the full set of procedures crew need to work toward EP certification.',
    route: '/training/ep',
    modules: [1, 2, 3, 4, 5, 6, 7].map(n => ({ number: n, title: `Module ${n}`, route: null })),
  },
}
