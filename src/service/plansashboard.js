export const investmentplans = [
  {
    name: "Plan 1",

    rate: Math.floor(Math.random() * (10 - 25)) + 25,
    min_rate: 10,
    max_rate: 25,
    duration: 24,
    lot: 50,
    max: 3000,
    hrs: 24,
  },
  {
    name: "Plan 2",

    rate: Math.floor(Math.random() * (35 - 50)) + 50,
    min_rate: 35,
    max_rate: 50,
    duration: 24,
    lot: 500,
    max: 5000,
    hrs: 24,
  },
  {
    name: "Plan 3",

    rate: Math.floor(Math.random() * (60 - 95)) + 95,
    min_rate: 60,
    max_rate: 95,
    duration: 34,
    lot: 1000,
    max: 30000,
    hrs: 34,
  },
];
