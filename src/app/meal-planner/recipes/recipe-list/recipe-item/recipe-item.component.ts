import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/model/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  //Recipe and index are set from RecipeList.
  @Input() recipe : Recipe;

  @Input() indexOfRecipe: number;

  constructor(private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
  }

  onItemSelect() : void {
    this.router.navigate([ 'meal-planner' , { outlets : { mealoptimizer : 'meal-optimizer', recipes : [ 'recipes' , this.indexOfRecipe ] } }] , { queryParams : this.route.snapshot.queryParams });
  }
}