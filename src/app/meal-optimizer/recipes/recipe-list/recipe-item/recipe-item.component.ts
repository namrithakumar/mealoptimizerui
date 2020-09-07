import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../../shared/recipe.model';
import { UserInputService } from '../../../../shared/services/user-input.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe : Recipe;

  constructor(private userInputService : UserInputService) { }

  ngOnInit(): void {
  }

  onItemSelect() : void {
    this.userInputService.onRecipeSelect.emit(this.recipe);
  }
}