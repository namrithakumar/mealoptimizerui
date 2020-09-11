import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterLoginLogoutComponent } from './user-register-login-logout.component';

describe('UserRegisterLoginLogoutComponent', () => {
  let component: UserRegisterLoginLogoutComponent;
  let fixture: ComponentFixture<UserRegisterLoginLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterLoginLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterLoginLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
