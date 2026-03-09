import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseInterface } from '../model/course';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../course/course';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { MATERIAL_MODULES } from '../course.mat';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-card-list',
  imports: [MATERIAL_MODULES, RouterLink],
  templateUrl: './course-card-list.html',
  styleUrl: './course-card-list.scss',
})
export class CourseCardList {
  @Input() courses!: CourseInterface[];

   @Output()
    courseChanged = new EventEmitter();

    constructor(
      private dialog: MatDialog ) {
    }

    ngOnInit() {

    }

    editCourse(course:CourseInterface) {

        const dialogConfig = defaultDialogConfig();

        dialogConfig.data = {
          dialogTitle:"Edit Course",
          course,
          mode: 'update'
        };

        this.dialog.open(EditCourseDialogComponent, dialogConfig)
          .afterClosed()
          .subscribe(() => this.courseChanged.emit());

    }

  onDeleteCourse(course:CourseInterface) {


  }
}
