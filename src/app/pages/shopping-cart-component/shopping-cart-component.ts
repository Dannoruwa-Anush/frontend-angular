import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material-module';
import { ShoppingCartItem } from '../../core/models/shoppingCartItemModel';
import { ShoppingCartService } from '../../core/services/common/shoppingCartService';

@Component({
  selector: 'app-shopping-cart-component',
  imports: [
    CommonModule, 
    FormsModule, 
    MaterialModule
  ],
  templateUrl: './shopping-cart-component.html',
  styleUrl: './shopping-cart-component.scss',
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns = ['image', 'name', 'price', 'qty', 'subtotal', 'action'];
  cartItems: ShoppingCartItem[] = [];
  total = 0;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }

  onQtyChange(item: ShoppingCartItem) {
    if (item.quantity < 1) item.quantity = 1;
    if (item.quantity > item.maxStock) item.quantity = item.maxStock;

    item.subtotal = item.quantity * item.unitPrice;
    this.cartService.updateQuantity(item.productId, item.quantity);
    this.calculateTotal();
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
    this.loadCart();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, i) => sum + i.subtotal, 0);
  }

  placeOrder() {
    alert('Order placed!');
    this.cartService.clearCart();
    this.loadCart();
  }
}
