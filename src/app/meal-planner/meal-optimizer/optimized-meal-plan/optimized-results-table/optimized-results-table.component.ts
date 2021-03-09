import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/reducers/app.reducer';
import * as UserPreferencesActions from '../../store/actions/user-preferences.actions';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

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
  
  @ViewChild('optimizationResultsTab') optimizationResultsTab : ElementRef;

  constructor(private store : Store<AppState>,
              private breakpointObserver: BreakpointObserver,
              private renderer: Renderer2) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
              //Track the size of the window and stack tabs for sizes < large
              this.breakpointObserver.observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge
              ]).subscribe( (state: BreakpointState) => {
                if (state.breakpoints[Breakpoints.XSmall] || 
                    state.breakpoints[Breakpoints.Small]) {
                      this.renderer.addClass(this.optimizationResultsTab.nativeElement as HTMLElement,'flex-column');
                }
                else if (state.breakpoints[Breakpoints.Medium] ||
                         state.breakpoints[Breakpoints.Large] || 
                         state.breakpoints[Breakpoints.XLarge]) {
                      this.renderer.removeClass(this.optimizationResultsTab.nativeElement as HTMLElement,'flex-column');
                }
              });
  }

  /*
   * Once a tab is selected, update user preferences (stored as optimizationTypeSelected)
   */
  onTabSelected(tabSelected : String) {
    this.store.dispatch(new UserPreferencesActions.OptimizationTypeSelected(tabSelected));
  }

  ngOnDestroy() : void {}
}