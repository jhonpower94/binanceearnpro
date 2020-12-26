export const investmentplans = [
  {
    name: "Plan 1",

    rate: Math.floor(Math.random() * (5 - 8)) + 8,
    min_rate: 5,
    max_rate: 8,
    duration: 24,
    lot: 50,
    max: 3000,
    hrs: 24,
  },
  {
    name: "Plan 2",

    rate: Math.floor(Math.random() * (10 - 14)) + 14,
    min_rate: 10,
    max_rate: 14,
    duration: 24,
    lot: 500,
    max: 5000,
    hrs: 24,
  },
  {
    name: "Plan 3",

    rate: Math.floor(Math.random() * (16 - 20)) + 20,
    min_rate: 16,
    max_rate: 20,
    duration: 24,
    lot: 1000,
    max: 30000,
    hrs: 24,
  },
];
