import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { Course } from "./course/course";
import { Courses } from "./courses";
import { CoursesReolver } from "./courses.resolver";

export const coursesRoutes: Routes = [
  {
    path: '',
    component: Courses,
    resolve: {
      courses: CoursesReolver
    },
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
