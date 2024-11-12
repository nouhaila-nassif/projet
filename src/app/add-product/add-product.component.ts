import { Component } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {Router} from "@angular/router";
import {CategoryModel} from "../models/category.models";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']  // Correction ici
})
export class AddProductComponent {
  newProduct =new ProductModel();
  categories! : CategoryModel[];
  newCategory! : CategoryModel;
  newCategoryId!: number;
  constructor(private  productService :ProductService,    private router: Router  // Injection du service Router
  ) {
    productService.catgoriesList().subscribe(c=> {
      this.categories = c;
    })
    //this.categories=productService.catgoriesList();
  }
  addProduct(): void {
    console.log('Catégories:', this.categories);
    console.log('ID Catégorie sélectionnée:', this.newCategoryId);

    this.newProduct.category = this.categories.find(c => c.idCategory == this.newCategoryId);
    console.log('Catégorie trouvée:', this.newProduct.category);

    if (this.newProduct.category) {
      this.productService.addProduct(this.newProduct).subscribe(p => {
        this.router.navigate(['/productsList']);
      });
    } else {
      console.error('Catégorie non trouvée !');
    }
  }


}
