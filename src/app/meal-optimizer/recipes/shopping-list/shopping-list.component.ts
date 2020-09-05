import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../shared/ingredient.model';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { CalendarAngularDateFormatter } from 'angular-calendar';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Ingredient[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(ingredientInfo : { ingredientName:String, ingredientAmount:number, ingredientLabel:String }) {
    (this.ingredients.length ==0)?(this.ingredients.push(new Ingredient(ingredientInfo.ingredientName.toLowerCase(), ingredientInfo.ingredientAmount, ingredientInfo.ingredientLabel))):(this.ingredients.forEach((ingredient, index) => {
      if(ingredient.name.toLowerCase() === ingredientInfo.ingredientName.toLowerCase()) {
        this.ingredients.splice(index, 1, new Ingredient(ingredientInfo.ingredientName.toLowerCase(), (Number(ingredientInfo.ingredientAmount) + Number(ingredient.amount)), ingredientInfo.ingredientLabel))
      }
      else {
        this.ingredients.push(new Ingredient(ingredientInfo.ingredientName.toLowerCase(), ingredientInfo.ingredientAmount, ingredientInfo.ingredientLabel))
      }
    }));
  }

  deleteIngredient(ingredientInfo : { ingredientName:String }) {
    if(this.ingredients.length > 0) {
      (this.ingredients.forEach((ingredient, index) => {
        if(ingredient.name.toLowerCase() === ingredientInfo.ingredientName.toLowerCase()) {
          this.ingredients.splice(index, 1);
        }
      }));
    }   
  }
}
