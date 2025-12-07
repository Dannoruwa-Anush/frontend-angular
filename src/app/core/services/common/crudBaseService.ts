import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from '../../../app.config';
import { ApiResponse, handleError } from '../../../utils/apiUtils';

export class CrudBaseService<T> {

    constructor(
        protected http: HttpClient,
        @Inject(BASE_URL) protected baseUrl: string,
        protected endpoint: string
    ) { }

    // Get all
    getAll(): Observable<ApiResponse<T[]>> {
        return this.http.get<ApiResponse<T[]>>(`${this.baseUrl}/${this.endpoint}`)
            .pipe(
                catchError(handleError<ApiResponse<T[]>>({
                    statusCode: 500,
                    message: `Failed to fetch all ${this.endpoint}`,
                    data: []
                }))
            );
    }

    // Get By ID
    getById(id: number): Observable<ApiResponse<T | null>> {
        return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${this.endpoint}/${id}`)
            .pipe(
                catchError(handleError<ApiResponse<T | null>>({
                    statusCode: 500,
                    message: `Failed to fetch ${this.endpoint} with ID ${id}`,
                    data: null
                }))
            );
    }

    // Create a new record
    create(item: T): Observable<ApiResponse<T | null>> {
        return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${this.endpoint}`, item)
            .pipe(
                catchError(handleError<ApiResponse<T | null>>({
                    statusCode: 500,
                    message: `Failed to create ${this.endpoint}`,
                    data: null
                }))
            );
    }

    // Update an existing record
    update(id: number, item: T): Observable<ApiResponse<T | null>> {
        return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${this.endpoint}/${id}`, item)
            .pipe(
                catchError(handleError<ApiResponse<T | null>>({
                    statusCode: 500,
                    message: `Failed to update ${this.endpoint} with ID ${id}`,
                    data: null
                }))
            );
    }

    // Delete an existing record
    delete(id: number): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${this.endpoint}/${id}`)
            .pipe(
                catchError(handleError<ApiResponse<null>>({
                    statusCode: 500,
                    message: `Failed to delete ${this.endpoint} with ID ${id}`,
                    data: null
                }))
            );
    }
}
