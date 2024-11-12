import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.models';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, DatePipe, NgForOf],  // Ajout de FormsModule et DatePipe dans les imports
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  currentProduct: ProductModel = new ProductModel();
  categories: CategoryModel[] = [];
  newCategoryId!: number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du produit depuis les paramètres de l'URL
    const id = this.activatedRoute.snapshot.params['id'];

    // Charger les catégories
    this.productService.catgoriesList().subscribe(categories => {
      this.categories = categories;
    });

    // Charger le produit avec l'ID
    this.productService.productsList().subscribe(products => {
      this.currentProduct = products.find(product => product.idProduct === +id)!;

      // Assigner la catégorie initiale
      this.newCategoryId = this.currentProduct.category?.idCategory!;
    });
  }

  updateProduct(): void {
    // Mettre à jour le produit avec la nouvelle catégorie sélectionnée
    const selectedCategory = this.categories.find(category => category.idCategory === this.newCategoryId);

    if (selectedCategory) {
      this.currentProduct.category = selectedCategory;

      // Mettre à jour le produit avec les nouvelles informations
      this.productService.updateProduct(this.currentProduct).subscribe(() => {
        this.router.navigate(['/productsList']); // Redirection après la mise à jour
      });
    }
  }
}
