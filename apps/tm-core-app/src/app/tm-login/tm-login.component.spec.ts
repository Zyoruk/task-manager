import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmLoginComponent } from './tm-login.component';

describe('TmLoginComponent', () => {
  let component: TmLoginComponent;
  let fixture: ComponentFixture<TmLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
