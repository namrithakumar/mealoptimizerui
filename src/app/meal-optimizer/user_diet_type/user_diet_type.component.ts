import { Component, Output, EventEmitter } from '@angular/core'
import { UserDietService } from '../../shared/services/user-diet.service';

@Component({
    selector: 'app-user-diet-type',
    templateUrl: './user_diet_type.component.html' 
})
export class UserDietTypeComponent {

    constructor(private userDietService : UserDietService) { }

    userDietType : String;

    dietTypes : Map<String, String> = this.userDietService.getDietTypes();

    onDietTypeSelect(dietType : String) {
        this.userDietType = dietType;
    }
}