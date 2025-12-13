import { Component, Inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material-module';
import { BrandService } from '../../core/services/brandService';
import { BrandModel } from '../../core/models/brandModel';
import { CategoryModel } from '../../core/models/categoryModel';
import { ElectronicItemModel } from '../../core/models/electronicItemModel';
import { CategoryService } from '../../core/services/categoryService';
import { ElectronicItemService } from '../../core/services/electronicItemService';
import { BASE_URL } from '../../app.config';


@Component({
  selector: 'app-products-component',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ],
  templateUrl: './products-component.html',
  styleUrl: './products-component.scss',
})
export class ProductsComponent implements OnInit {

  
  // dropdown data
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];

  // product data
  allItems: ElectronicItemModel[] = []; // original list
  items: ElectronicItemModel[] = [];    // filtered list

  // filters
  selectedBrandId?: number;
  selectedCategoryId?: number;
  searchText = '';

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private router: Router,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private electronicItemService: ElectronicItemService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
    this.loadProducts();
  }

  // ---------------- API CALLS ----------------

  loadBrands() {
    this.brandService.getAll().subscribe(res => {
      this.brands = res.data ?? [];
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(res => {
      this.categories = res.data ?? [];
    });
  }

  loadProducts() {
    this.electronicItemService.getAll().subscribe(res => {
      this.allItems = res.data ?? [];
      this.items = [...this.allItems]; // show all initially
    });
  }

  // ---------------- FILTER HANDLERS ----------------

  onBrandSelect(brandId?: number) {
    this.selectedBrandId = brandId;
    this.applyFilters();
  }

  onCategorySelect(categoryId?: number) {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
  }

  applyFilters() {
    this.items = this.allItems.filter(item => {

      const matchesBrand =
        !this.selectedBrandId ||
        item.brandResponseDto?.brandID === this.selectedBrandId;

      const matchesCategory =
        !this.selectedCategoryId ||
        item.categoryResponseDto?.categoryID === this.selectedCategoryId;

      const matchesSearch =
        !this.searchText ||
        item.electronicItemName
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

      return matchesBrand && matchesCategory && matchesSearch;
    });
  }

  // ---------------- UI HELPERS ----------------

  openProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  getImageUrl(item: ElectronicItemModel): string {
    if (item.electronicItemImageUrl) {
      return item.electronicItemImageUrl;
    }

    if (item.electronicItemImage) {
      return `${this.baseUrl}/${item.electronicItemImage}`;
    }

    return 'assets/images/no-image.png';
  }
}
