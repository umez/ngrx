import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

export const LoginAction = createAction(
  '[User] Login',
  props<{ user: User }>()
);

export const LogoutAction = createAction('[User] Logout');

