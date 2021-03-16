import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthReaderComponent } from './auth-reader.component';

describe('AuthReaderComponent', () => {
  let component: AuthReaderComponent;
  let fixture: ComponentFixture<AuthReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
