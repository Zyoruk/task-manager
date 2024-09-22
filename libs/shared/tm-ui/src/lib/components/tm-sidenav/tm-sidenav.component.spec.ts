import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TmSidenavComponent } from './tm-sidenav.component';

describe('TmSidenavComponent', () => {
  let component: TmSidenavComponent;
  let fixture: ComponentFixture<TmSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TmSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
