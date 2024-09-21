import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmInputComponent } from './tm-input.component';

describe('TmInputComponent', () => {
  let component: TmInputComponent;
  let fixture: ComponentFixture<TmInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
