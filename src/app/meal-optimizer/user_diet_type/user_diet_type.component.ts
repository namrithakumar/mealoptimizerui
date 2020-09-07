import { Component, Output, EventEmitter, HostListener, HostBinding, ViewChild, ElementRef } from '@angular/core'
import { UserDietService } from '../../shared/services/user-diet.service';
import { UserInputService } from '../../shared/services/user-input.service';
import { DisplayService } from '../../shared/services/display.service';

@Component({
    selector: 'app-user-diet-type',
    templateUrl: './user_diet_type.component.html' 
})
export class UserDietTypeComponent {
    
    constructor(private userDietService : UserDietService, private userInputService : UserInputService, private displayService : DisplayService) { }

    userDietType : String;

    dietTypes : Map<String, String> = this.userDietService.getDietTypes();

    setCollapseInd : boolean = false;

    onDietTypeSelect(dietType : String) {
        this.userDietType = dietType;
        this.userInputService.setDietType(dietType);
    }

    @HostListener('mouseover') onMouseOver() {
            this.setCollapseInd = this.displayService.getCollapsibleInd('mouseover' , this.userDietType);
    }

    @HostListener('mouseout') onMouseOut() {
        if(this.userDietType !== undefined)
        this.setCollapseInd = this.displayService.getCollapsibleInd('mouseout' , this.userDietType);
    }
}