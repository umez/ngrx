import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { selectIsLoggedIn } from "../store/users.selectors";

export const authGuard: CanActivateFn = ()  => {
  const store = inject(Store);

  const router = inject(Router);

  return store.pipe(
    select(selectIsLoggedIn),
    tap(loggegIn => {
      if (!loggegIn) {
        console.log("User is logged out");
        router.navigate(["/login"]);
        return false;
      } else {
        return true;
      }
    })
  )

}
