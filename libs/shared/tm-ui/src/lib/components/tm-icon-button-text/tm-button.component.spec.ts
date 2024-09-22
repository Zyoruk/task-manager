import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmButtonComponent } from './tm-button.component';

describe('TmButtonComponent', () => {
  let component: TmButtonComponent;
  let fixture: ComponentFixture<TmButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
