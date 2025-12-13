import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BASE_URL } from '../../../app.config';
import { ApiResponse, handleError } from '../../../utils/apiUtils';

export interface LoginData {
    token: string;
    email: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly apiBaseUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) {
        this.apiBaseUrl = `${this.baseUrl.replace(/\/$/, '')}/api/auth`;
    }

    // Login API
    login(email: string, password: string): Observable<LoginData | null> {
        return this.http.post<ApiResponse<LoginData>>(`${this.apiBaseUrl}/login`, { email, password })
            .pipe(
                map(res => res.data),
                catchError(handleError<LoginData | null>(null))
            );
    }

    // Logout user
    logout(): void {
        sessionStorage.clear();
    }

    // Store login session in sessionStorage
    setSession(data: LoginData): void {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('role', data.role);
    }

    // Get stored JWT token
    getToken(): string | null {
        return sessionStorage.getItem('token');
    }

    // Get stored user role
    getRole(): string | null {
        return sessionStorage.getItem('role');
    }

    // Get stored user email
    getEmail(): string | null {
        return sessionStorage.getItem('email');
    }

    // Check if user is logged in
    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    // Check if the current user has one of the allowed roles
    hasRole(allowedRoles: string[]): boolean {
        const role = this.getRole();
        return role ? allowedRoles.includes(role) : false;
    }
}
