import { createFeature, createReducer, on, select } from '@ngrx/store';
import { appLoadingFinished, appLoadingStarted } from './app.actions';
import { AppState, initialAppState } from './app.state';
import { routerReducer } from '@ngrx/router-store';

export const appFeature = createFeature({
  name: 'app',
  reducer: createReducer<AppState>(
    initialAppState
  ),
});

export const { name: appFeatureKey, reducer: appReducer, selectAppState } = appFeature;
