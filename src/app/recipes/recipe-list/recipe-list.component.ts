import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Green Salad", "A healthy blend of veggies to provide your daily needs", "https://i2.wp.com/reluctantentertainer.com/wp-content/uploads/2015/10/SA3.jpg","https://www.youtube.com/watch?v=bRJmMw9dDw8"),
    new Recipe("Ice cream","A frozen dessert you can enjoy on a hot day","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgq9bi1CJq3hyOP7qbPTgBb0M3GJobLJ1xQg&usqp=CAU","https://www.youtube.com/watch?v=ye9_bkCcczo"),
    new Recipe("Strawberry Milkshake","Taste and goodness all in one","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGHLe0bYqNDSTzwQwVZXP4cMUgSVoksD6a7g&usqp=CAU","https://www.youtube.com/watch?v=5_DTtGT23iU"),
    new Recipe("Garlic Bread","Feed your senses with some spice","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfuqq0ADG7H1LaGVBsIXkPEZsW_ECSzRHrow&usqp=CAU","https://www.youtube.com/watch?v=TAt2Nn0F2mc")
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
