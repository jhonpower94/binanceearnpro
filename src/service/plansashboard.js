export const investmentplans = [
  {
    name: "Plan 1",

    rate: Math.floor(Math.random() * (5 - 10)) + 10,
    min_rate: 5,
    max_rate: 10,
    duration: 24,
    lot: 50,
    max: 500,
    hrs: 24,
  },
  {
    name: "Plan 2",

    rate: Math.floor(Math.random() * (15 - 25)) + 25,
    min_rate: 15,
    max_rate: 25,
    duration: 24,
    lot: 600,
    max: 4000,
    hrs: 24,
  },
  {
    name: "Plan 3",

    rate: Math.floor(Math.random() * (30 - 40)) + 20,
    min_rate: 30,
    max_rate: 40,
    duration: 24,
    lot: 5000,
    max: 30000,
    hrs: 24,
  },
];
