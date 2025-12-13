import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material-module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ElectronicItemModel } from '../../core/models/electronicItemModel';
import { ElectronicItemService } from '../../core/services/electronicItemService';
import { BASE_URL } from '../../app.config';
import { ShoppingCartService } from '../../core/services/common/shoppingCartService';

@Component({
  selector: 'app-product-component',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ],
  templateUrl: './product-component.html',
  styleUrl: './product-component.scss',
})
export class ProductComponent implements OnInit {
  product?: ElectronicItemModel;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ElectronicItemService,
    private shoppingCartService: ShoppingCartService,
    @Inject(BASE_URL) private baseUrl: string,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.productService.getById(id).subscribe(res => {
      this.product = res.data ?? undefined;

      if (this.product && this.product.qoh < 1) {
        this.quantity = 0;
      }
    });
  }

  getImageUrl(): string {
    if (!this.product) return 'assets/images/no-image.png';

    if (this.product.electronicItemImageUrl)
      return this.product.electronicItemImageUrl;

    if (this.product.electronicItemImage)
      return `${this.baseUrl}/${this.product.electronicItemImage}`;

    return 'assets/images/no-image.png';
  }

  increaseQuantity() {
    if (this.product && this.quantity < this.product.qoh) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (!this.product) return;

    // Validate quantity & stock
    if (this.quantity < 1 || this.quantity > this.product.qoh) {
      alert('Invalid quantity');
      return;
    }

    const cartItem = {
      productId: this.product.electronicItemID!,
      name: this.product.electronicItemName,
      imageUrl: this.getImageUrl(),
      unitPrice: this.product.price,
      quantity: this.quantity,
      maxStock: this.product.qoh,
      subtotal: this.product.price * this.quantity
    };

    // Prevent duplicates
    const added = this.shoppingCartService.addToCart(cartItem);

    if (!added) {
      alert('Product already added to cart');
      return;
    }

    // Navigate to cart
    this.router.navigate(['/cart']);
  }
}
