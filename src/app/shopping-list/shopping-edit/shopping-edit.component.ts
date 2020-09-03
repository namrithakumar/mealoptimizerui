import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingredientName') ingredientName : ElementRef;
  @ViewChild('ingredientAmount') ingredientAmount : ElementRef;

  ingredientLabel : String = 'Added by user';

  @Output() addIngredient = new EventEmitter<{ ingredientName:String, ingredientAmount:number, ingredientLabel:String }>();

  @Output() deleteIngredient = new EventEmitter<{ ingredientName:String }>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient() : void {
    this.ingredientAmount.nativeElement.value = (this.ingredientAmount.nativeElement.value === '')?1:this.ingredientAmount.nativeElement.value;
    this.addIngredient.emit({ ingredientName:this.ingredientName.nativeElement.value, ingredientAmount:this.ingredientAmount.nativeElement.value, ingredientLabel:this.ingredientLabel });
  }

  onDeleteIngredient() : void {
    this.deleteIngredient.emit({ ingredientName:this.ingredientName.nativeElement.value });
  }

  onClearIngredient() : void {
    this.ingredientName.nativeElement.value = '';
    this.ingredientAmount.nativeElement.value = '';
  }
}
