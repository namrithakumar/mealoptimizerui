import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/model/recipe.model';
import { Input } from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
/*
 * This component is loaded for the route meal-planner/recipes.
 * It is composed of 4 RecipeItems.
 * 
 * Tasks : Takes recipes from 'Recipes' store and passes them to RecipeItem.
 * Technique used : Attribute Binding 
 */
export class RecipeListComponent implements OnInit, OnDestroy {
  matcher: MediaQueryList;
  showSlider : boolean = false;

  @Input() recipes: Recipe[];

  constructor(private mediaMatcher: MediaMatcher,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
      //Set initial slider to true - if size is <767px, false - if size >=768px.
      if (this.breakpointObserver.isMatched('(max-width: 767px)')) {
        this.showSlider = true;
      }

      //Track the size of the window and display slider for recipes accordingly.
      this.matcher = this.mediaMatcher.matchMedia('(max-width: 767px)');

      this.matcher.addListener(this.screenSizeListener);
  }

  screenSizeListener(event) : void {
    this.showSlider = event.matches ? true : false;
  }

  ngOnDestroy() {
    this.matcher.removeListener(this.screenSizeListener);
  }
}