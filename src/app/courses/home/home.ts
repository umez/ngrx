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
import { select, Store } from '@ngrx/store';
import { selectAdvancedCourses, selectAllCourses, selectBeginnerCourses, selectPromoTotal } from '../store/courses.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MATERIAL_MODULES, AsyncPipe, CourseCardList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  promoTotal$!: Observable<number>;

    beginnerCourses$!: Observable<CourseInterface[]>;

    advancedCourses$!: Observable<CourseInterface[]>;

    dialog = inject(MatDialog);

    // coursesHttpService = inject(CoursesHttpService); // CoursesHttpService

    store = inject(Store);


    ngOnInit() {
      this.reload();
    }

  reload() {

    const courses$ = this.store.select(selectAllCourses)
      .pipe(
        map((courses:any) => courses.sort(compareCourses)),
        shareReplay()
      );

    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));

    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));

    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));

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
