import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserInputService } from '../../../shared/services/user-input.service';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-manage-meal-plan',
  templateUrl: './manage-meal-plan.component.html',
  styleUrls: ['./manage-meal-plan.component.css']
})
export class ManageMealPlanComponent implements OnInit, OnDestroy {

  collapseMealListInd : boolean = true;

  disableGetMealPlan : boolean = true;

  disableUpdateMealPlan : boolean = true;

  mealSelectorSubscription : Subscription;

  orderInfoSubscription : Subscription;
  
  orderInfoUpdated : boolean = false;

  mode : String;

  constructor(private userInputService : UserInputService, private router : Router, private route:ActivatedRoute, private orderService : OrderService) { }

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
    this.collapseMealListInd = true;
    this.userInputService.setCreateMealPlanClicked(true);
    if(this.userInputService.verifyAllInputsReceived()) {
      //If all inputs are received, create the order
      this.orderService.createOrder(this.userInputService.dietType, this.userInputService.deliveryDate, this.userInputService.mealList);    
      //Setup an observable to track any changes in the order
      this.orderService.orderObservableSubject.next(this.orderService.order);
      //Call backend to get a meal plan
      this.userInputService.getMealPlan.next(this.userInputService.mealList);
      //Change to update mode to allow user to update the inputs if they want
      this.router.navigate(['/meal-optimizer'], { queryParams: {mode: 'update'} });
      this.disableGetMealPlan = true;
    }
    else alert('One of the required inputs is missing');
  }

  onUpdateMealPlan() {
    this.collapseMealListInd = true;
    this.userInputService.setUpdateMealPlanClicked(true);
    (!this.userInputService.verifyAllInputsReceived())?alert('One of the required inputs is missing'):this.userInputService.getMealPlan.next(this.userInputService.mealList);
    this.disableUpdateMealPlan = true;
  }

  ngOnDestroy() : void {
    this.mealSelectorSubscription.unsubscribe();
    this.orderInfoSubscription.unsubscribe();
  }
}