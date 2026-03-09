import { createFeature, createReducer, on } from '@ngrx/store';
import { LoginAction, LogoutAction } from './users.actions';
import { UsersState, initialUsersState } from './users.state';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer<UsersState>(
    initialUsersState,
    on(LoginAction, (state, action) => ({
      ...state,
      user: action.user,
    })),
    on(LogoutAction, (state) => ({
      ...state,
      user: null,
    }))
  ),
});

export const { name: authFeatureKey, reducer: usersReducer, selectAuthState, selectUser } =
  authFeature;
