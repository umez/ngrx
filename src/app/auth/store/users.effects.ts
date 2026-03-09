import { User } from './users.state';
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserActions } from './users.action.types';
import { tap } from 'rxjs';

@Injectable()
export class UserEffects {

  actions$ = inject(Actions);

  router = inject(Router);

  login$ = createEffect(() =>
     this.actions$.pipe(
        ofType(UserActions.LoginAction),
        tap(action  => localStorage.setItem('user', JSON.stringify(action.user)))
     ),
     { dispatch: false }
  )

  logout$ = createEffect(() =>
     this.actions$.pipe(
        ofType(UserActions.LogoutAction),
        tap(() => {
          localStorage.removeItem('user')
          this.router.navigateByUrl('/login')
        })
     ),
     { dispatch: false }
  )



}
