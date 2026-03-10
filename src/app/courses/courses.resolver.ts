import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { filter, finalize, first, tap } from "rxjs";
import { CourseAcions } from "./store/courses.action.type";
import { areCoursesLoaded } from "./store/courses.selectors";

export const  CoursesReolver: ResolveFn<any> = () => {
  const store = inject(Store)
  let loading = false;
  return store.pipe(
    select(areCoursesLoaded),
    tap(coursesLoaded => {
      if( !coursesLoaded && !loading ) {
        loading = true; // to avoid multiple calls
        store.dispatch(CourseAcions.loadAllCourses());
      }
    }),
    filter(coursesLoaded => coursesLoaded),
    first(), // to complete with first stream
    finalize(() => loading = false) // reset loading
  )
}
