export const users = [
  {
    id: 1,
    username: "john_doe",
    password: "test123",
    email: "john@example.com",
    canCheckout: true
  },
  {
    id: 2,
    username: "jane_smith",
    password: "pass456",
    email: "jane@example.com",
    canCheckout: true
  },
  {
    id: 3,
    username: "mike_wilson",
    password: "secure789",
    email: "mike@example.com",
    canCheckout: true
  },
  {
    id: 4,
    username: "joe_blow",
    password: "test999",
    email: "test@example.com",
    canCheckout: false // Defect: This user can't checkout
  }
];