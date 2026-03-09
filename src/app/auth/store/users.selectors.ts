import { createSelector } from '@ngrx/store';
import { authFeature } from './users.reducer';

export const selectCurrentUser = authFeature.selectUser;

export const selectIsLoggedIn = createSelector(selectCurrentUser, (user) => !!user);

export const selectIsLoggedOut = createSelector(selectIsLoggedIn, (loggedIn) => !loggedIn);
