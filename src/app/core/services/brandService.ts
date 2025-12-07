import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { BrandModel } from '../models/brandModel';
import { BASE_URL } from '../../app.config';
import { ApiResponse, handleError } from '../../utils/apiUtils';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private endpoint = 'brand'; // Base endpoint for brands

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) { }

    /** Get all brands */
  getAllBrands(): Observable<ApiResponse<BrandModel[]>> {
    return this.http.get<ApiResponse<BrandModel[]>>(`${this.baseUrl}/${this.endpoint}`)
      .pipe(
        catchError(handleError<ApiResponse<BrandModel[]>>({
          statusCode: 500,
          message: 'Failed to fetch brands',
          data: []
        }))
      );
  }

  /** Get brand by ID */
  getBrandById(id: number): Observable<ApiResponse<BrandModel | null>> {
    return this.http.get<ApiResponse<BrandModel>>(`${this.baseUrl}/${this.endpoint}/${id}`)
      .pipe(
        catchError(handleError<ApiResponse<BrandModel | null>>({
          statusCode: 500,
          message: `Failed to fetch brand with ID ${id}`,
          data: null
        }))
      );
  }

  /** Create a new brand */
  createBrand(brand: BrandModel): Observable<ApiResponse<BrandModel | null>> {
    return this.http.post<ApiResponse<BrandModel>>(`${this.baseUrl}/${this.endpoint}`, brand)
      .pipe(
        catchError(handleError<ApiResponse<BrandModel | null>>({
          statusCode: 500,
          message: 'Failed to create brand',
          data: null
        }))
      );
  }

  /** Update a brand */
  updateBrand(id: number, brand: BrandModel): Observable<ApiResponse<BrandModel | null>> {
    return this.http.put<ApiResponse<BrandModel>>(`${this.baseUrl}/${this.endpoint}/${id}`, brand)
      .pipe(
        catchError(handleError<ApiResponse<BrandModel | null>>({
          statusCode: 500,
          message: `Failed to update brand with ID ${id}`,
          data: null
        }))
      );
  }

  /** Delete a brand */
  deleteBrand(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${this.endpoint}/${id}`)
      .pipe(
        catchError(handleError<ApiResponse<null>>({
          statusCode: 500,
          message: `Failed to delete brand with ID ${id}`,
          data: null
        }))
      );
  }
}