import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../app.config';
import { CrudBaseService } from './common/crudBaseService';
import { CategoryModel } from '../models/categoryModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CrudBaseService<CategoryModel> {

  constructor(http: HttpClient, @Inject(BASE_URL) baseUrl: string) {
    super(http, baseUrl, 'category'); // set endpoint here
  }

  //can add custom api methods here
}
