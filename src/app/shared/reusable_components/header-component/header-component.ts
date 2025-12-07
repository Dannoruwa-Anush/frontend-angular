import { Component } from '@angular/core';

import { MaterialModule } from '../../material/material-module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [
    MaterialModule,
    RouterModule
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {

}
