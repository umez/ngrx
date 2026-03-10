import { CourseInterface } from "../model/course";
import { createEntityAdapter, EntityState } from "@ngrx/entity";

export interface CoursesState extends EntityState<CourseInterface> {
  allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<CourseInterface>();

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});


