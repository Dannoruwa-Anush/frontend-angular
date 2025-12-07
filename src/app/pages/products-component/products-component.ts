import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material-module';
import { BrandService } from '../../core/services/brandService';
import { BrandModel } from '../../core/models/brandModel';


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

  brands: BrandModel[] = [];
  selectedBrand: BrandModel | null = null;

  constructor(
    private router: Router,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  private loadBrands(): void {
    this.brandService.getAllBrands().subscribe(res => {
      this.brands = res.data;
    });
  }
}
