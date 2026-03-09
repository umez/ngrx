import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { Course } from "./course/course";
import { Courses } from "./courses";

export const coursesRoutes: Routes = [
  {
    path: '',
    component: Courses,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: Home
      },
      {
        path: ':courseUrl',
        component: Course
      }
    ]
  }
];
