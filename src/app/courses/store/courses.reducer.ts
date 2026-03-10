import { createFeature, createReducer, on } from "@ngrx/store";
import { CoursesState, initialCoursesState } from "./courses.state";
import { CourseAcions } from "./courses.action.type";
import { createEntityAdapter, Update } from "@ngrx/entity";
import { compareCourses, CourseInterface } from "../model/course";

export const adapter = createEntityAdapter<CourseInterface>(
  {
    sortComparer: compareCourses,
    // selectId: (course) => course.courseId if
  }
);

export const coursesFeature = createFeature({

  name: 'courses',

  reducer: createReducer(
    initialCoursesState,
    on( CourseAcions.allCoursesLoaded,
      (state, action) =>
        adapter.setAll(action.courses, {...state, allCoursesLoaded: true}
      )
    ),
    on( CourseAcions.courseUpdated,
      (state, action) => adapter.updateOne(action.update, state)
    )
  )
})

export const { name: coursesFeatureKey, reducer: coursesReducer, selectCoursesState } = coursesFeature;

export const {selectAll} = adapter.getSelectors()

