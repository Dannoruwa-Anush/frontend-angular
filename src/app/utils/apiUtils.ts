import { HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export function handleError<T>(fallback: T, log: boolean = true) {
  return (error: HttpErrorResponse): Observable<T> => {
    if (log) {
      console.error('API call failed:', {
        status: error.status,
        message: error.message,
        url: error.url
      });
    }

    // add notification later!

    return of(fallback);
  };
}