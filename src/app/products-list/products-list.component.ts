import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductModel} from '../models/product.model';
import {ProductService} from '../services/product.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router'; // Importer CommonModule

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],

 // Ajoutez CommonModule ici
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'] // Correction du champ styleUrls
})
export class ProductsListComponent {
  products!: ProductModel[];

  constructor(private productService : ProductService) {
    productService.productsList().subscribe(p=> {
      //console.log(p);
      this.products=p;
    })
    //this.products = productService.productsList();
  }
  deleteProduct(id: number | undefined): void {
    if (id !== undefined) { // Vérification que l'ID est bien défini
      this.productService.deleteProduct(id).subscribe(() => {
        console.log(`Produit avec ID ${id} supprimé.`);
        this.loadProducts(); // Rafraîchir la liste des produits après suppression
      });
    } else {
      console.error("Erreur : l'ID du produit est indéfini !");
    }
  }



// Méthode pour charger la liste des produits, au cas où elle n'existerait pas
  loadProducts(): void {
    this.productService.productsList().subscribe(products => {
      this.products = products;
    });
  }

}
