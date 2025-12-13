import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material-module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ElectronicItemModel } from '../../core/models/electronicItemModel';
import { ElectronicItemService } from '../../core/services/electronicItemService';
import { BASE_URL } from '../../app.config';

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
export class ProductComponent implements OnInit{
  
  product?: ElectronicItemModel;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ElectronicItemService,
    @Inject(BASE_URL) private baseUrl: string,
  ) {}

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
    if (!this.product) 
      return 'assets/images/no-image.png';

    if (this.product.electronicItemImageUrl) 
      return this.product.electronicItemImageUrl;

    if (this.product.electronicItemImage) 
      return `${this.baseUrl}/${this.product.electronicItemImage}`;

    return 'assets/images/no-image.png';
  }

  increaseQuantity() {
    if (this.product && this.quantity < this.product.qoh) this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    if (!this.product || this.quantity < 1) return;
    alert(`${this.quantity} item(s) added to cart`);
  }
}
