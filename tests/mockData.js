export const mockIngredients = {
  success: true,
  data: [
    {
      _id: "60d3b41abdacab0026a733c6",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://yandex.net",
    },
    {
      _id: "60d3b41abdacab0026a733c8",
      name: "Филе Люминесцентного Тетраодона",
      type: "main",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://yandex.net",
    }
  ]
};

export const mockUser = {
  success: true,
  user: { email: "test@yandex.ru", name: "StellarTester" }
};

export const mockOrder = {
  success: true,
  name: "Краторный люминесцентный бургер",
  order: { number: 7777 }
};
