import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule,],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  images = [
    'assets/images/banner/banner1.png',
    'assets/images/banner/banner2.png',
  ];

  currentSlide = 0;

  constructor() {
    setInterval(() => this.nextSlide(), 3000); // auto-play every 3s
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.images.length) % this.images.length;
  }
}
