import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmBoardComponent } from './tm-board.component';

describe('TmBoardComponent', () => {
  let component: TmBoardComponent;
  let fixture: ComponentFixture<TmBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
