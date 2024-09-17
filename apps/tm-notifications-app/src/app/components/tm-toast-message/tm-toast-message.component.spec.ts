import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmToastMessageComponent } from './tm-toast-message.component';

describe('TmToastMessageComponent', () => {
  let component: TmToastMessageComponent;
  let fixture: ComponentFixture<TmToastMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmToastMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmToastMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
