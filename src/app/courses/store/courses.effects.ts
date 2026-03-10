import { loadAllCourses } from './courses.action';
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseAcions } from './courses.action.type';
import { concatMap, map, tap } from 'rxjs';
import { CoursesHttpService } from '../services/courses-http.service';

@Injectable()
export class CoursesEffects {

  actions$ = inject(Actions);
  coursesService = inject(CoursesHttpService);

  loadAllCourses = createEffect(
    () => this.actions$.pipe(
      ofType(CourseAcions.loadAllCourses),
      concatMap(action => this.coursesService.findAllCourses()),
      map(courses => CourseAcions.allCoursesLoaded({courses}))
    )
  )

  updateCourse = createEffect(() => this.actions$.pipe(
    ofType(CourseAcions.courseUpdated),
    concatMap(action => this.coursesService.saveCourse(action.update.id, action.update.changes))
  ), {dispatch: false})

}
