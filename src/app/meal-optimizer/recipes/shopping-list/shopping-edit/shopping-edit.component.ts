import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IngredientValidatorService } from '../../../../shared/services/ingredientValidator.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  shoppingEdit : FormGroup;

  defaultLabel : String = 'Added by user';

  @Output() addIngredient = new EventEmitter<{ ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }>();

  @Output() deleteIngredient = new EventEmitter<{ ingredientName:String }>();

  constructor(private ingredientValidatorService : IngredientValidatorService) { }

  ngOnInit(): void {
    this.shoppingEdit = new FormGroup({
      'ingredientName' : new FormControl('Enter ingredient name here'),
      'ingredientAmount': new FormControl(null)
    });
    /* 
    When the field ingredientName is updated (touched), set ingredientAmount=1 
    by listening to the angular event 'valueChanges'. This event is emitted only
    when reactive forms is used.
    */
    this.shoppingEdit.get('ingredientName').valueChanges.subscribe((value) => {
      this.shoppingEdit.get('ingredientAmount').setValue(1);
    });
  }

  onAddIngredient() : void {
    var ingredientName : String = this.shoppingEdit.get('ingredientName').value;
    //Validate ingredient entered - the ingredient must either belong to a list of valid ingredients, or the user must confirm that he wants to add the ingredient to the list.
    if(this.ingredientValidatorService.isValidIngredient(ingredientName) || 
      confirm(ingredientName + " does not look like a valid ingredient. Are you sure you want to add it to your shopping list?")) {
        var label = new Array<String>();
        label.push(this.defaultLabel);
        this.addIngredient.emit({ ingredientName:this.shoppingEdit.get('ingredientName').value, ingredientAmount:this.shoppingEdit.get('ingredientAmount').value, ingredientLabels: label }); 
    }
  }

  onDeleteIngredient() : void {
  //  this.deleteIngredient.emit({ ingredientName:this.ingredientName.nativeElement.value });
  }

  onClearIngredient() : void {
  //  this.ingredientName.nativeElement.value = '';
  //  this.ingredientAmount.nativeElement.value = '';
  }

  validateIngredient(control : FormControl) : { [key:string]: boolean } {
    if((control.value)) {
      return { 'isValidIngredient' : true }
    }
    else if(confirm(control.value + " does not look like a valid ingredient. Are you sure you want to add it to your shopping list?")) {
      return { 'isValidIngredient' : true }
    }
    else return null;
}
}