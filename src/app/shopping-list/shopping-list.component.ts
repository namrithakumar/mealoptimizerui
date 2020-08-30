import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Ingredient[] = [
    new Ingredient('Spinach',2),
    new Ingredient('Onion',1),
    new Ingredient('Tomatoes (cherry)', 8),
    new Ingredient('Olives', 10)];
  constructor() { }

  ngOnInit(): void {
  }

}
