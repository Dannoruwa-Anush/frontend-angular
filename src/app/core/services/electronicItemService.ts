import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../app.config';
import { CrudBaseService } from './common/crudBaseService';
import { ElectronicItemModel } from '../models/electronicItemModel';

@Injectable({
  providedIn: 'root',
})
export class ElectronicItemService extends CrudBaseService<ElectronicItemModel> {

  constructor(http: HttpClient, @Inject(BASE_URL) baseUrl: string) {
    super(http, baseUrl, 'electronicItem'); // set endpoint here
  }

  //can add custom api methods here
}
