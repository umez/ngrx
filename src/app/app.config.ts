import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appFeature } from './store/app.reducer';
import { authFeature } from './auth/store/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './auth/store/users.effects';
import { provideRouterStore, RouterState } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CoursesEffects } from './courses/store/courses.effects';
import { coursesFeature } from './courses/store/courses.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      [appFeature.name]: appFeature.reducer,
      [authFeature.name]: authFeature.reducer,
      [coursesFeature.name]: coursesFeature.reducer

    }),
    provideEffects([UserEffects, CoursesEffects]),
    provideRouterStore({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    })

  ],
};
