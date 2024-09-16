import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmTasksAppComponent } from './tm-tasks-app.component';

describe('TmTasksAppComponent', () => {
  let component: TmTasksAppComponent;
  let fixture: ComponentFixture<TmTasksAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmTasksAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmTasksAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
