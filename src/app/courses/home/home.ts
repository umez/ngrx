import { Component, inject } from '@angular/core';
import { MATERIAL_MODULES } from '../course.mat';
import { AsyncPipe } from '@angular/common';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { map, shareReplay } from 'rxjs/operators';
import { compareCourses, CourseInterface } from '../model/course';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material/dialog';
import { CoursesHttpService } from '../services/courses-http.service';
import { CourseCardList } from '../course-card-list/course-card-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MATERIAL_MODULES, AsyncPipe, CourseCardList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  promoTotal$!: Observable<number>;

    loading$!: Observable<boolean>;

    beginnerCourses$!: Observable<CourseInterface[]>;

    advancedCourses$!: Observable<CourseInterface[]>;

    dialog = inject(MatDialog);

    coursesHttpService = inject(CoursesHttpService); // CoursesHttpService


    ngOnInit() {
      this.reload();
    }

  reload() {

    const courses$ = this.coursesHttpService.findAllCourses()
      .pipe(
        map((courses:any) => courses.sort(compareCourses)),
        shareReplay()
      );

    this.loading$ = courses$.pipe(map(courses => !!courses));

    this.beginnerCourses$ = courses$
      .pipe(
        map((courses:any) => courses.filter((course:any) => course.category == 'BEGINNER'))
      );


    this.advancedCourses$ = courses$
      .pipe(
        map((courses:any) => courses.filter((course:any) => course.category == 'ADVANCED'))
      );

    this.promoTotal$ = courses$
        .pipe(
            map((courses:any) => courses.filter((course:any) => course.promo).length)
        );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }

}
