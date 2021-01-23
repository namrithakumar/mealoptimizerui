import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/reducers/app.reducer';
import { HttpRequestStatus } from '../../../../shared/http-request-status.enum';
import * as UserPreferencesActions from '../../store/actions/user-preferences.actions';

@Component({
  selector: 'app-optimized-results-table',
  templateUrl: './optimized-results-table.component.html',
  styleUrls: ['./optimized-results-table.component.css']
})
/*
 * This component has 3 sections (tabs):
 * OrderInfo : Displays the user inputs
 * Optimized by Cost : Displays Item name, portion and cost for meal plan optimized by Cost
 * Optimized by Quality : Displays Item name, portion and cost for meal plan optimized by Quality
 * 
 * Tasks:
 * (1) Setup structure of the tabs
 * (2) Pass item info to the tabs optimized by Cost and optimized by Quality
 *     Technique used: attribute binding
 * (3) Update User Preferences with the name of the tab selected - this value is stored as optimizationTypeSelected.
 * (4) Disable tabs if the isOptimizationFeasible = false
 */
export class OptimizedResultsTableComponent implements OnInit, OnDestroy {

  @Input() costOptimizedPlan; 
  
  @Input() qualityOptimizedPlan;

  @Input() isOptimizationFeasible;

  @Input() defaultText;
  
  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {}

  /*
   * Once a tab is selected, update user preferences (stored as optimizationTypeSelected)
   */
  onTabSelected(tabSelected : String) {
    this.store.dispatch(new UserPreferencesActions.OptimizationTypeSelected(tabSelected));
  }

  ngOnDestroy() : void {}
}