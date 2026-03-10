import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import { AuthService } from '../auth.service';
import { LoginAction } from '../store/users.actions';
import { MATERIAL_MODULES } from '../../courses/course.mat';
import { selectIsLoggedIn } from '../store/users.selectors';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [MATERIAL_MODULES],
    providers: [AuthService]
})
export class LoginComponent  {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private store:  Store<{}>,
      private router:Router,


    ) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  login() {
    const {email, password} = this.form.value
    this.auth.login(email, password).pipe(
      tap(user => {
        this.store.dispatch(LoginAction({user}));
        this.router.navigateByUrl('/courses')}
      )
    ).subscribe(noop)
  }

}

