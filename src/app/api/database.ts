export let USERS = [
  {
    name: "Juan Pablo Sanchez",
    username: "Juan Pa",
    password: "1234",
    letters: [
      {
        id: crypto.randomUUID(),
        label: "Primera vez con carta",
      },
    ],
  },
  {
    name: "Alejandro Peña",
    username: "Alejo",
    password: "soyalejo",
    letters: [
      {
        id: crypto.randomUUID(),
        label: "Primera vez",
      },
    ],
  },
];
