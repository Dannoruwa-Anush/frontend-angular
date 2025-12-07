import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BrandModel } from '../models/brandModel';
import { BASE_URL } from '../../app.config';
import { CrudBaseService } from './common/crudBaseService';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends CrudBaseService<BrandModel> {

  constructor(http: HttpClient, @Inject(BASE_URL) baseUrl: string) {
    super(http, baseUrl, 'brand'); // set endpoint here
  }

  //can add custom api methods here
}