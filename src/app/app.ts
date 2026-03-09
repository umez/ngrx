import { Component, inject, OnInit, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MATERIAL_MODULES } from './material';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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


  loading = false;
  isLoggedIn$: Observable<boolean> = of(true);
  isLoggedOut$: Observable<boolean> = of(false);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {

    }

}
