export interface IShoe {
  id: string;
  size: number;
  color: string;
  brand: string;
  type: string;
  category: string;
  price: string;
  picture: Array<string>;
  name: string;
  registered: string;
}

export interface IFilters {
  key: string;
  value: string;
}