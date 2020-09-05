import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../../shared/recipe.model';
import { RecipeService } from '../../../../shared/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe : Recipe;

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
  }

  onItemSelect() : void {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}