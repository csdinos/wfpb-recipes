export type Ingredient = {
  amount: string;
  amount_unit: string;
  name: string;
}

export type Quantity = {
  amount: string;
  amount_unit: string;
}

export type Recipe = {
  // TODO: remove optional attrs
  cook_time?: Quantity;
  description: string;
  hands_on_time?: Quantity;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  tips: string[];
  title: string;
}
