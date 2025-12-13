import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

// 1. Create an InjectionToken for the backend URL
export const BASE_URL = new InjectionToken<string>('BASE_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // 2. Enable HttpClient with fetch for SSR
    provideHttpClient(withFetch()),

    // 3. Provide the backend URL
    { provide: BASE_URL, useValue: 'http://localhost:5106/' }
  ]
};
