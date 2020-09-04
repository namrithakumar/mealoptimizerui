import { Component, Output, EventEmitter } from '@angular/core'
import { UserDietService } from '../../shared/services/user-diet.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
    selector: 'app-user-diet-type',
    templateUrl: './user_diet_type.component.html' 
})
export class UserDietTypeComponent {

    constructor(private userDietService : UserDietService, private orderService : OrderService) { }

    userDietType : String;

    dietTypes : Map<String, String> = this.userDietService.getDietTypes();

    onDietTypeSelect(dietType : String) {
        this.userDietType = dietType;
        this.orderService.setDietType(dietType);
    }
}