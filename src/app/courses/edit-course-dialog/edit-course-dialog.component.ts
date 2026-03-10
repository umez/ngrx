
import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CourseInterface} from '../model/course';
import {FormBuilder, FormGroup,  ReactiveFormsModule,  Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {CoursesHttpService} from '../services/courses-http.service';
import { MATERIAL_MODULES } from '../course.mat';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { CourseAcions } from '../store/courses.action.type';
import { Update } from '@ngrx/entity';

@Component({
    selector: 'course-dialog',
    imports: [MATERIAL_MODULES, ReactiveFormsModule, AsyncPipe],
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css'],
})
export class EditCourseDialogComponent {

  form!: FormGroup;

  dialogTitle: string;

  course: CourseInterface;

  mode: 'create' | 'update';

  store = inject(Store);

  loading$:Observable<boolean> = of(false);

   dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private coursesService: CoursesHttpService) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.course});
    }
    else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {

    const course:   CourseInterface = {
      ...this.course,
      ...this.form.value
    };

    const update: Update<CourseInterface> = {
      id: course.id,
      changes: course
    };

    this.store.dispatch(CourseAcions.courseUpdated({update}));

    this.dialogRef.close()

    // this.coursesService.saveCourse(course.id, course)
    //   .subscribe(
    //     () => this.dialogRef.close()
    //   )


  }


}
