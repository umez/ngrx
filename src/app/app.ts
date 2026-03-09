import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MATERIAL_MODULES } from './material';
import { AsyncPipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { appLoadingFinished, appLoadingStarted } from './store/app.actions';
import { selectIsAppLoading } from './store/app.selectors';
import { LoginAction, LogoutAction } from './auth/store/users.actions';
import { selectIsLoggedIn, selectIsLoggedOut } from './auth/store/users.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MATERIAL_MODULES, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('ngrx');

  router = inject(Router);
  #store = inject(Store);

   destroyRef = inject(DestroyRef);

  loading$: Observable<boolean> = this.#store.select(selectIsAppLoading);
  isLoggedIn$: Observable<boolean> = this.#store.select(selectIsLoggedIn);
  isLoggedOut$: Observable<boolean> = this.#store.select(selectIsLoggedOut);

  ngOnInit(): void {

    const userProfile = localStorage.getItem('user');

    if (userProfile) {
      this.#store.dispatch(LoginAction({ user: JSON.parse(userProfile) }));
    }

    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.#store.dispatch(appLoadingStarted());
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.#store.dispatch(appLoadingFinished());
            break;
          }
          default: {
            break;
          }
        }
      });

      this.isLoggedIn$ = this.#store.pipe(
        select(selectIsLoggedIn),
      )

      this.isLoggedOut$ = this.#store.pipe(
        select(selectIsLoggedOut),
      )
  }

  logout() {
    this.#store.dispatch(LogoutAction());
  }
}
