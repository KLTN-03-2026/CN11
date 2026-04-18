export interface Food {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Food {
  quantity: number;
}
