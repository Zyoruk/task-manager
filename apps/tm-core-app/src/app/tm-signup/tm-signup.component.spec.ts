import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmSignupComponent } from './tm-signup.component';

describe('TmSignupComponent', () => {
  let component: TmSignupComponent;
  let fixture: ComponentFixture<TmSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmSignupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
