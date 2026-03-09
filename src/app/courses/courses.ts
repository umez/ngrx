import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoursesHttpService } from './services/courses-http.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterOutlet],
  providers: [CoursesHttpService],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {

}
