import {CategoryModel} from "./category.models";

export class ProductModel {
  idProduct?: number;
  nameProduct?: string;
  priceProduct?: number;
  dateCreate?: Date;
  category?: CategoryModel;
}
