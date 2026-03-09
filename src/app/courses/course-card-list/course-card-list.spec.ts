import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardList } from './course-card-list';

describe('CourseCardList', () => {
  let component: CourseCardList;
  let fixture: ComponentFixture<CourseCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCardList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
