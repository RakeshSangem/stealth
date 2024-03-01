export const users = [
  {
    id: "1",
    username: "John",
    email: "john@example.com",
    password: "password1",
    points: 100,
    challengesCompleted: ["1", "2", "3"],
  },
  {
    id: "2",
    username: "Jane",
    email: "jane@example.com",
    password: "password2",
    points: 75,
    challengesCompleted: ["2"],
  },
  {
    id: "3",
    username: "Alice",
    email: "alice@example.com",
    password: "password3",
    points: 150,
    challengesCompleted: ["1", "3"],
  },
];

export const challenges = [
  {
    id: "1",
    name: "Workout Challenge",
    startDate: "2024-01-01",
    endDate: "2024-01-21",
    progress: ["1", "2", "3"],
    creator: "1",
  },
  {
    id: "2",
    name: "Reading Challenge",
    startDate: "2024-02-01",
    endDate: "2024-02-21",
    progress: ["4", "5"],
    creator: "2",
  },
  {
    id: "3",
    name: "Meditation Challenge",
    startDate: "2024-03-01",
    endDate: "2024-03-21",
    progress: ["6"],
    creator: "3",
  },
];

export const progress = [
  {
    id: "1",
    date: "2024-01-01",
    completed: true,
    notes: "Completed workout session",
    challenge: "1",
  },
  {
    id: "2",
    date: "2024-01-02",
    completed: true,
    notes: "Ran 5 miles",
    challenge: "1",
  },
  {
    id: "3",
    date: "2024-01-03",
    completed: false,
    notes: "Skipped workout",
    challenge: "1",
  },
  {
    id: "4",
    date: "2024-02-01",
    completed: true,
    notes: "Read 50 pages",
    challenge: "2",
  },
  {
    id: "5",
    date: "2024-02-02",
    completed: true,
    notes: "Read 30 pages",
    challenge: "2",
  },
  {
    id: "6",
    date: "2024-03-01",
    completed: true,
    notes: "Meditated for 30 minutes",
    challenge: "3",
  },
];
