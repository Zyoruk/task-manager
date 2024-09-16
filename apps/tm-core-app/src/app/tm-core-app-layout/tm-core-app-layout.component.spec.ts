import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmCoreAppLayoutComponent } from './tm-core-app-layout.component';

describe('TmCoreAppLayoutComponent', () => {
  let component: TmCoreAppLayoutComponent;
  let fixture: ComponentFixture<TmCoreAppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmCoreAppLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmCoreAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
