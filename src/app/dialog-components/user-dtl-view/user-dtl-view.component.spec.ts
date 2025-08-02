import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDtlViewComponent } from './user-dtl-view.component';

describe('UserDtlViewComponent', () => {
  let component: UserDtlViewComponent;
  let fixture: ComponentFixture<UserDtlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDtlViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDtlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
