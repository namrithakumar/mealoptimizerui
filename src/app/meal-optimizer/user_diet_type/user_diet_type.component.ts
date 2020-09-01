import { Component, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-user-diet-type',
    templateUrl: './user_diet_type.component.html' 
})
export class UserDietTypeComponent {
    userDietType : String;

    @Output() userDietTypeSelected = new EventEmitter< { dietType : String } >();

    onDietTypeSelect(dietType : String) {
        this.userDietType = dietType;
        this.userDietTypeSelected.emit({ dietType : this.userDietType});
    }
}