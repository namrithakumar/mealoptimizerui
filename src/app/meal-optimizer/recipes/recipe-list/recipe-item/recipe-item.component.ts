import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../../shared/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe : Recipe;

  @Input() indexOfRecipe: number;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onItemSelect() : void {
    this.router.navigate(['meal-optimizer','recipes',this.indexOfRecipe]);
  }
}