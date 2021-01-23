import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Nutrient } from 'src/app/shared/model/nutrient.model';
import { IUserDietType } from 'src/app/shared/services/user-diet-type-resolver.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { AuthenticatedUser } from '../../store/reducers/user-mgmt.reducer';
import * as UserMgmtActions from '../../store/actions/user-mgmt.actions';
import { DefaultMessages } from 'src/app/shared/default-messages';
import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  signupForm : FormGroup;

  defaultNutrientLimits : Nutrient[];

  unavailableUsernames : String[];

  passwordPattern : string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9$@$!%*?&]+$";

  defaultText : String = DefaultMessages.register.get(HttpRequestStatus.NO_ACTION);
  
  dietTypes : Array<IUserDietType>;

  nutrientInitialLimits = new Array<FormGroup>();

  error : String;
  
  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 2 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long' },
      { type: 'usernameIsUnavailable', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      { type: 'maxlength', message: 'Password must be utmost 8 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'preferredDietType' : [
      { type: 'required', message: 'Value is required' }
    ],
    'nutrients': [
      { type: 'required', message: 'Value is required' },
      { type: 'min', message: 'Min value must be at least 1' },
      { type: 'max', message: 'Max must not exceed 3000' },
    ],
    'firstName': [
      { type: 'required', message: 'First name is required' },
      { type: 'minlength', message: 'First name must be at least 2 characters long' },
      { type: 'maxlength', message: 'First name cannot be more than 20 characters long' }
    ],
    'lastName': [
      { type: 'required', message: 'Last name is required' },
      { type: 'minlength', message: 'Last name must be at least 2 characters long' },
      { type: 'maxlength', message: 'Last name cannot be more than 20 characters long' }
    ],
    'address': [
      { type: 'required', message: 'Address is required' },
      { type: 'minlength', message: 'Address must be at least 5 characters long' },
      { type: 'maxlength', message: 'Address cannot be more than 100 characters long' }
    ]
  }
  
  get nutrients() { return this.signupForm.get('nutrients') as FormArray; }

  constructor(private formBuilder : FormBuilder, private userService : UserService, private route: ActivatedRoute, private router : Router, private store : Store<AppState>) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.unavailableUsernames = data['usernames'];
    });

    this.route.data.subscribe(data => {
      this.dietTypes = data['dietTypes'];
    });

    this.defaultNutrientLimits = this.userService.getDefaultNutrientLimits();
    
    this.defaultNutrientLimits.forEach((nutrient) => {
      this.nutrientInitialLimits.push(this.addNutrient(nutrient.name, nutrient.min, nutrient.max, nutrient.unitOfMeasure));
      
    });

    this.signupForm = this.formBuilder.group({
      signupInfo : this.formBuilder.group({
        email  : this.formBuilder.control('email', [Validators.required, Validators.email]),
        username : this.formBuilder.control('username', [Validators.required, Validators.minLength(2), Validators.maxLength(20), this.checkUsernameAvailability.bind(this)]),
        password : this.formBuilder.control(null, [Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern(this.passwordPattern)])
      }),
      preferredDietType : this.formBuilder.control(null, Validators.required),
      nutrients : this.formBuilder.array(this.nutrientInitialLimits, [Validators.required, Validators.min(1), Validators.max(3000)]),
      personalInfo : this.formBuilder.group({
        firstName  : this.formBuilder.control('first name', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        lastName  : this.formBuilder.control('last name', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        address  : this.formBuilder.control('address', [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
      })
    });
  }

  private addNutrient(nutrientName : String, min : number, max : number, unitOfMeasure : String) : FormGroup {
    return this.formBuilder.group({
      name : nutrientName,
      min : min,
      max : max,
      unitOfMeasure : unitOfMeasure
    });
  }

  private checkUsernameAvailability(control:FormControl) : { usernameIsUnavailable : boolean } {
    if(this.unavailableUsernames.indexOf(control.value) !== -1)
      return { "usernameIsUnavailable" : true };
    else return null;
  }

  signup() {
    let signupRequest = this.userService.createUserSignupRequest(this.signupForm.value);
    this.store.dispatch(new UserMgmtActions.UpdateRequestStatus(HttpRequestStatus.REQUEST_SENT));
    this.store.dispatch(new UserMgmtActions.SignupStart(signupRequest));
    this.store.select('authenticatedUser').subscribe(( authenticatedUser : AuthenticatedUser ) => {
      
      switch(authenticatedUser.requestStatus) {

        case HttpRequestStatus.NO_ACTION :         this.defaultText = DefaultMessages.register.get(HttpRequestStatus.NO_ACTION);
                                                   break;
        case HttpRequestStatus.REQUEST_SENT :      this.defaultText = DefaultMessages.register.get(HttpRequestStatus.NO_ACTION);
                                                   break;
        case HttpRequestStatus.RESPONSE_RECEIVED : this.defaultText = DefaultMessages.register.get(HttpRequestStatus.NO_ACTION);
                                                   if(authenticatedUser.error) this.error = authenticatedUser.error;
                                                   else {
                                                     this.router.navigate(['/meal-planner', { outlets: { mealoptimizer : ['meal-optimizer'] } }], { queryParams: {optimizermode: 'create'} });
                                                    }                                                                    
                                                   break;                                                                            
      }});
  }
}