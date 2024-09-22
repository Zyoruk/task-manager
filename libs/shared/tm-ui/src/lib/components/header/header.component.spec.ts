import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: TmHeaderComponent;
  let fixture: ComponentFixture<TmHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
