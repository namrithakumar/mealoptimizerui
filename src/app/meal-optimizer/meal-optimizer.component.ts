import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CanComponentDeactivate } from '../shared/services/can-exit-page.service';
import { Observable } from 'rxjs';
import { IUserDietType } from '../shared/services/user-diet-type-resolver.service';
import { ActivatedRoute, Data } from '@angular/router';

//This component handles routing, link to optimizationService via controller
@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit, CanComponentDeactivate {

  constructor(private route: ActivatedRoute) {
  }

  dietTypes : Array<IUserDietType>;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dietTypes = data['userDietTypes'];
    });
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}