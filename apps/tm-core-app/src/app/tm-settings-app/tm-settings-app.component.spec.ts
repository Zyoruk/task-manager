import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmSettingsAppComponent } from './tm-settings-app.component';

describe('TmSettingsAppComponent', () => {
  let component: TmSettingsAppComponent;
  let fixture: ComponentFixture<TmSettingsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmSettingsAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmSettingsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
