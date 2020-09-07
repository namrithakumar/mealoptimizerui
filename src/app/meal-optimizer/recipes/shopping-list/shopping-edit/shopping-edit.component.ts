import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingredientName') ingredientName : ElementRef;
  @ViewChild('ingredientAmount') ingredientAmount : ElementRef;

  defaultLabel : String = 'Added by user';

  @Output() addIngredient = new EventEmitter<{ ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }>();

  @Output() deleteIngredient = new EventEmitter<{ ingredientName:String }>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient() : void {
    this.ingredientAmount.nativeElement.value = (this.ingredientAmount.nativeElement.value === '')?1:this.ingredientAmount.nativeElement.value;
    var label = new Array<String>();
    label.push(this.defaultLabel);
    this.addIngredient.emit({ ingredientName:this.ingredientName.nativeElement.value, ingredientAmount:this.ingredientAmount.nativeElement.value, ingredientLabels: label });
  }

  onDeleteIngredient() : void {
    this.deleteIngredient.emit({ ingredientName:this.ingredientName.nativeElement.value });
  }

  onClearIngredient() : void {
    this.ingredientName.nativeElement.value = '';
    this.ingredientAmount.nativeElement.value = '';
  }
}
