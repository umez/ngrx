import { createSelector } from '@ngrx/store';
import { appFeature } from './app.reducer';

export const selectIsAppLoading = createSelector(
  appFeature.selectAppState,
  (state) => state.loading
);
