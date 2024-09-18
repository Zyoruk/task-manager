import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmUiComponent } from './tm-ui.component';

describe('TmUiComponent', () => {
  let component: TmUiComponent;
  let fixture: ComponentFixture<TmUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
