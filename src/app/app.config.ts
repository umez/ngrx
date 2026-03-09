import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appFeature } from './store/app.reducer';
import { authFeature } from './auth/store/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './auth/store/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      [appFeature.name]: appFeature.reducer,
      [authFeature.name]: authFeature.reducer,
    }),
    provideEffects([UserEffects]),
  ],
};
