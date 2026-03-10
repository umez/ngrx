import { createAction, props } from "@ngrx/store";
import { Courses } from "../courses";
import { CourseInterface } from "../model/course";
import { Update } from "@ngrx/entity";


export const loadAllCourses = createAction('[Courses Resolver] Load All Courses');

export const allCoursesLoaded = createAction(
  '[Load Courses Effect] All Courses Loaded',
  props<{ courses: CourseInterface[] }>()
);

export const courseUpdated = createAction(
  '[Edit Course Dialog] Course Updated',
  props<{ update: Update<CourseInterface> }>()
)
