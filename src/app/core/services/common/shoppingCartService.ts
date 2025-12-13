import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../../models/shoppingCartItemModel';

const CART_KEY = 'cart_items';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {

 getCart(): ShoppingCartItem[] {
    const data = sessionStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveCart(cart: ShoppingCartItem[]) {
    sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  addToCart(item: ShoppingCartItem) {
    const cart = this.getCart();
    const exists = cart.some(c => c.productId === item.productId);

    if (exists) {
      return false; // prevent duplicate
    }

    cart.push(item);
    this.saveCart(cart);
    return true;
  }

  updateQuantity(productId: number, qty: number) {
    const cart = this.getCart();
    const item = cart.find(c => c.productId === productId);

    if (item) {
      item.quantity = qty;
      item.subtotal = qty * item.unitPrice;
      this.saveCart(cart);
    }
  }

  removeItem(productId: number) {
    const cart = this.getCart().filter(c => c.productId !== productId);
    this.saveCart(cart);
  }

  clearCart() {
    sessionStorage.removeItem(CART_KEY);
  }
}
