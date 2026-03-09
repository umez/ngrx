import { createFeature, createReducer, on } from '@ngrx/store';
import { appLoadingFinished, appLoadingStarted } from './app.actions';
import { AppState, initialAppState } from './app.state';

export const appFeature = createFeature({
  name: 'app',
  reducer: createReducer<AppState>(
    initialAppState,
    on(appLoadingStarted, (state) => ({ ...state, loading: true })),
    on(appLoadingFinished, (state) => ({ ...state, loading: false }))
  ),
});

export const { name: appFeatureKey, reducer: appReducer, selectAppState } = appFeature;
