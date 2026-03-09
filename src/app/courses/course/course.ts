import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, of, tap } from 'rxjs';
import { Lesson } from '../model/lesson';
import { CoursesHttpService } from '../services/courses-http.service';
import { MATERIAL_MODULES } from '../course.mat';
import { AsyncPipe } from '@angular/common';
import { CourseInterface } from '../model/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.html',
  styleUrl: './course.scss',
  imports: [MATERIAL_MODULES, AsyncPipe]
})
export class Course {

  course$!: Observable<CourseInterface>;

  lessons$: Observable<Lesson[]> = of([]);

  loading$!: Observable<boolean>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private coursesService: CoursesHttpService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    if(courseUrl) {
      this.course$ = this.coursesService.findCourseByUrl(courseUrl);
    }

    this.lessons$ = this.course$.pipe(
      concatMap((course:any) => this.coursesService.findLessons(course.id)),
      tap(console.log)
    );

  }


   loadLessonsPage(course: CourseInterface) {

  }


}
