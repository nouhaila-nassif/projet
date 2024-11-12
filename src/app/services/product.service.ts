import { Injectable } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {CategoryModel} from "../models/category.models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs";
const httpOptions:{headers:HttpHeaders}=
  {
    headers : new HttpHeaders({
      'content-Type' : 'application/json'
    })
  }

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL : string = "http://localhost:8080/api";
  products: ProductModel[];
  product! : ProductModel;
  categories : CategoryModel[];
  category! : CategoryModel;


  constructor(private  http: HttpClient) {
    this.categories = [];
    this.products = [];
  }
  catgoriesList() {
    return this.http.get<CategoryModel[]>(this.apiURL + "/categories", httpOptions).pipe(
      tap(categories => console.log("Categories from API:", categories))
    );
  }

  productsList(){
    return this.http.get<ProductModel[]>(this.apiURL+"/products",httpOptions);
  }
  addProduct(newProduct :ProductModel)
  {
    return this.http.post<ProductModel>(this.apiURL+"/products/save",newProduct,httpOptions);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiURL}/products/${id}`, httpOptions);
  }

  editProduct(id:number){
    this.product =this.products.find(p=>p.idProduct==id)!;
    return this.product;
  }
  updateProduct(product: ProductModel) {
    return this.http.put<ProductModel>(`${this.apiURL}/products/update`, product, httpOptions).pipe(
      tap(updatedProduct => {
        console.log("Product updated:", updatedProduct);
        // Optionnel : Mettez à jour le produit localement après la mise à jour dans la base de données.
        const index = this.products.findIndex(p => p.idProduct === updatedProduct.idProduct);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      })
    );
    //this.deleteProduct(product);
    //this.addProduct(product);
    //this.sortProducts();

  }
  getProductById(id: number) {
    return this.http.get<ProductModel>(`${this.apiURL}/products/${id}`, httpOptions);
  }

  sortProducts(): void {
    this.products.sort((x: ProductModel, y: ProductModel): number => {
      return x.idProduct! > y.idProduct! ? 1 : -1;
    });
  }
  sortProductsByName(order: 'asc' | 'desc' = 'asc'): void {
    this.products.sort((a: ProductModel, b: ProductModel): number => {
      const nameA = a.nameProduct ? a.nameProduct.toLowerCase() : '';
      const nameB = b.nameProduct ? b.nameProduct.toLowerCase() : '';

      if (nameA < nameB) {
        return order === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  editCategory(id:number){
    this.category =this.categories.find(c=>c.idCategory==id)!;
    return this.category;
  }








}
