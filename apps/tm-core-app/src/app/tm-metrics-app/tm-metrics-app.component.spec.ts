import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmMetricsAppComponent } from './tm-metrics-app.component';

describe('TmMetricsAppComponent', () => {
  let component: TmMetricsAppComponent;
  let fixture: ComponentFixture<TmMetricsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmMetricsAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmMetricsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
