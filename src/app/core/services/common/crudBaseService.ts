import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from '../../../app.config';
import { ApiResponse, handleError } from '../../../utils/apiUtils';

@Injectable({
    providedIn: 'root'
})
export abstract class CrudBaseService<T> {

    protected apiBaseUrl: string;

    constructor(
        protected http: HttpClient,
        @Inject(BASE_URL) protected baseUrl: string,
        protected endpoint: string
    ) {
        this.apiBaseUrl = `${this.baseUrl.replace(/\/$/, '')}/api`;
    }

    // Get all records with optional query params
    getAll(params?: Record<string, string | number | boolean>): Observable<ApiResponse<T[]>> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                httpParams = httpParams.set(key, String(params[key]));
            });
        }

        return this.http.get<ApiResponse<T[]>>(`${this.apiBaseUrl}/${this.endpoint}`, { params: httpParams })
            .pipe(
                catchError(handleError<ApiResponse<T[]>>({
                    statusCode: 500,
                    message: `Failed to fetch all ${this.endpoint}`,
                    data: []
                }))
            );
    }

    // Get by ID
    getById(id: number): Observable<ApiResponse<T | null>> {
        return this.http.get<ApiResponse<T>>(`${this.apiBaseUrl}/${this.endpoint}/${id}`)
            .pipe(
                catchError(handleError<ApiResponse<T | null>>({
                    statusCode: 500,
                    message: `Failed to fetch ${this.endpoint} with ID ${id}`,
                    data: null
                }))
            );
    }

    // Create
    create(item: T): Observable<ApiResponse<T | null>> {
        return this.http.post<ApiResponse<T>>(`${this.apiBaseUrl}/${this.endpoint}`, item)
            .pipe(
                catchError(handleError<ApiResponse<T | null>>({
                    statusCode: 500,
                    message: `Failed to create ${this.endpoint}`,
                    data: null
                }))
            );
    }

    // Update
    update(id: number, item: T): Observable<ApiResponse<T | null>> {
        return this.http.put<ApiResponse<T>>(`${this.apiBaseUrl}/${this.endpoint}/${id}`, item)
            .pipe(
                catchError(handleError<ApiResponse<T | null>>({
                    statusCode: 500,
                    message: `Failed to update ${this.endpoint} with ID ${id}`,
                    data: null
                }))
            );
    }

    // Delete
    delete(id: number): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(`${this.apiBaseUrl}/${this.endpoint}/${id}`)
            .pipe(
                catchError(handleError<ApiResponse<null>>({
                    statusCode: 500,
                    message: `Failed to delete ${this.endpoint} with ID ${id}`,
                    data: null
                }))
            );
    }
}
