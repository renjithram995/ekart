export interface IShoe {
  id: string;
  size: number;
  color: string;
  brand: string;
  type: string;
  category: string;
  price: number;
  picture: string;
  name: string;
  registered: string;
  idealFor: string;
  hidden: boolean
}

export type enumIShoeKeys = keyof IShoe
export interface IFilters {
  key: enumIShoeKeys;
  value: string | number | boolean | Array<Number>;
  selected?: boolean;
  count: number
}

export type IgroupFilters = {
  [key in enumIShoeKeys]: Array<IFilters>;
};