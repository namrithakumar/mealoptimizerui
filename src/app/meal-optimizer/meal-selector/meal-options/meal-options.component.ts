import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-options',
  templateUrl: './meal-options.component.html',
  styleUrls: ['./meal-options.component.css']
})
export class MealOptionsComponent implements OnInit {

  itemList : String[] = ['Green Salad','Ice cream','Strawberry Milkshake','Garlic Bread'];

  constructor() { }

  ngOnInit(): void {
  }

}
