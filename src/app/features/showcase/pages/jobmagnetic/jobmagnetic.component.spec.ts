import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobmagneticComponent } from './jobmagnetic.component';

describe('JobmagneticComponent', () => {
  let component: JobmagneticComponent;
  let fixture: ComponentFixture<JobmagneticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobmagneticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobmagneticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
