import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMealPlanComponent } from './manage-meal-plan.component';

describe('ManageMealPlanComponent', () => {
  let component: ManageMealPlanComponent;
  let fixture: ComponentFixture<ManageMealPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMealPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
