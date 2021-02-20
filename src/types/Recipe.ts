import {Ingredient} from '@appRoot/types/Ingredient'
import {Quantity} from '@appRoot/types/Quantity'

export type Recipe = {
  cook_time: Quantity;
  description: string;
  hands_on_time: Quantity;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  tips: string[];
  title: string;
}