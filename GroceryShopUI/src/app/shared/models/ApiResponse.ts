import { GroceryTransaction } from "./GroceryTransaction";

export interface ApiResponse {
    statusCode: number;
    message: string;
    data: GroceryTransaction[];
  }