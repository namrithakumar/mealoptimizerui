import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserInputService } from '../../../shared/services/user-input.service';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { DisplayService } from 'src/app/shared/services/display.service';

@Component({
  selector: 'app-manage-meal-plan',
  templateUrl: './manage-meal-plan.component.html',
  styleUrls: ['./manage-meal-plan.component.css']
})
export class ManageMealPlanComponent implements OnInit, OnDestroy {

  disableGetMealPlan : boolean = true;

  disableUpdateMealPlan : boolean = true;

  mealSelectorSubscription : Subscription;

  orderInfoSubscription : Subscription;
  
  orderInfoUpdated : boolean = false;

  mode : String;

  constructor(private userInputService : UserInputService, private router : Router, private route:ActivatedRoute, private orderService : OrderService, private displayService : DisplayService) { }

  ngOnInit(): void {
        // Get value of mode (create or edit)
        this.route.queryParams.subscribe((queryParams : String) => {
          this.mode = queryParams['mode'];
        });

        this.mealSelectorSubscription = this.userInputService.onMealSelect.subscribe((mealList : String[]) => {
          this.disableGetMealPlan = (this.mode === 'create' && this.userInputService.mealList.length === 4)?false:true;
        });

        this.orderInfoSubscription = this.orderService.orderObservable.subscribe( (orderInfo) => {
          this.orderInfoUpdated = true;
          this.disableUpdateMealPlan = (this.mode === 'update' && this.orderInfoUpdated)?false:true;
        });
  }

  onGetMealPlan() {
    //mealList section can be collapsed
    this.displayService.canCollapseMealList = true;
    if(this.userInputService.verifyAllInputsReceived()) {
      //If all inputs are received, create the order
      this.orderService.createOrder(this.userInputService.dietType, this.userInputService.deliveryDate, this.userInputService.mealList);    
      //Setup an observable to track any changes in the order
      this.orderService.orderObservableSubject.next(this.orderService.order);
      //Call backend to get a meal plan
      this.userInputService.getMealPlan.next(this.userInputService.mealList);
      //User inputs are saved/sent for processing to the backend.
      this.userInputService.setUserInputSaved(true);
      //Change to update mode to allow user to update the inputs if they want
      this.router.navigate(['/meal-optimizer'], { queryParams: {mode: 'update'} });
      this.disableGetMealPlan = true;
    }
    else alert('One of the required inputs is missing');
  }

  onUpdateMealPlan() {
    //mealList section can be collapsed
    this.displayService.canCollapseMealList = true;
    //If all inputs are received, notify call backend to get a meal plan . If all inputs are not received, display an alert.
    (this.userInputService.verifyAllInputsReceived())?this.userInputService.getMealPlan.next(this.userInputService.mealList):alert('One of the required inputs is missing');
    //user inputs are saved/sent for processing to the backend.
    this.userInputService.setUserInputSaved(true);
    this.disableUpdateMealPlan = true; 
  }

  ngOnDestroy() : void {
    this.mealSelectorSubscription.unsubscribe();
    this.orderInfoSubscription.unsubscribe();
  }
}