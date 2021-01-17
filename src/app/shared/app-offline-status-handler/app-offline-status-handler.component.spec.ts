import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOfflineStatusHandlerComponent } from './app-offline-status-handler.component';

describe('AppOfflineStatusHandlerComponent', () => {
  let component: AppOfflineStatusHandlerComponent;
  let fixture: ComponentFixture<AppOfflineStatusHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppOfflineStatusHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOfflineStatusHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
