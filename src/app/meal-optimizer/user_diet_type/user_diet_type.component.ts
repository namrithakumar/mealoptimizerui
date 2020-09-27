import { Component, OnInit, HostListener, Input } from '@angular/core'
import { UserDietService } from '../../shared/services/user-diet.service';
import { UserInputService } from '../../shared/services/user-input.service';
import { DisplayService } from '../../shared/services/display.service';
import { IUserDietType } from '../../shared/services/user-diet-type-resolver.service';

@Component({
    selector: 'app-user-diet-type',
    templateUrl: './user_diet_type.component.html' 
})
export class UserDietTypeComponent implements OnInit {
    
    constructor(private userDietService : UserDietService, private userInputService : UserInputService, private displayService : DisplayService) { }

    @Input() dietTypes : Array<IUserDietType>;

    setCollapseInd : boolean = false;

    onDietTypeSelect(dietType : String) {
        this.userInputService.setDietType(dietType);
    }

    ngOnInit(): void { }

    @HostListener('mouseover', ['$event'])  
    @HostListener('mouseout', ['$event']) handleMouseEvent() {
        //Update collapse indicator only if diet type is not empty
        if(this.userInputService.dietType !== undefined)
            this.setCollapseInd = this.displayService.getCollapsibleInd(event.type);
    }
}