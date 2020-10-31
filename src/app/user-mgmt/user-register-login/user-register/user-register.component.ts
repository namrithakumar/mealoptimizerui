import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Nutrient } from 'src/app/shared/model/nutrient.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  signupForm : FormGroup;

  defaultNutrientLimits : Nutrient[];

  unavailableUsernames : String[];

  passwordPattern : any = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%?&]{6,10}$';

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
      { type: 'maxlength', message: 'Password must be utmost 10 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'nutrients': [
      { type: 'required', message: 'Value is required' },
      { type: 'min', message: 'Min value must be at least 1' },
      { type: 'max', message: 'Max must not exceed 3000' },
    ]
  }
  
  get nutrients() { return this.signupForm.get('nutrients') as FormArray; }

  constructor(private formBuilder : FormBuilder, private userService : UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.unavailableUsernames = data['usernames'];
      console.log('Username received');
    });

    this.defaultNutrientLimits = this.userService.getDefaultNutrientLimits();
    
    this.signupForm = this.formBuilder.group({
      personalInfo : this.formBuilder.group({
        fname : this.formBuilder.control('First name'),
        lname : this.formBuilder.control('Last name'),
        dob : this.formBuilder.control('DOB')
      }),
      signupInfo : this.formBuilder.group({
        email  : this.formBuilder.control('email', [Validators.required, Validators.email]),
        username : this.formBuilder.control('username', [Validators.required, Validators.minLength(2), Validators.maxLength(20), this.checkUsernameAvailability.bind(this)]),
        password : this.formBuilder.control(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(this.passwordPattern)])
      }),
      nutrients : this.formBuilder.array([], [Validators.required, Validators.min(1), Validators.max(3000)])
    });
    
    this.defaultNutrientLimits.forEach((nutrient) => this.addNutrient(nutrient.name, nutrient.min, nutrient.max, nutrient.unitOfMeasure));
  }

  private addNutrient(nutrientName : String, min : number, max : number, unitOfMeasure : String) {
    this.nutrients.push(this.formBuilder.group({
      name : nutrientName,
      min : min,
      max : max,
      unitOfMeasure : unitOfMeasure
    }));
  }

  private checkUsernameAvailability(control:FormControl) : { usernameIsUnavailable : boolean } {
    if(this.unavailableUsernames.indexOf(control.value) !== -1)
      return { "usernameIsUnavailable" : true };
    else return null;
  }

  viewFormInfo() {
    this.nutrients.value.forEach((nutrient) => {
      console.log(nutrient.name);
      console.log(nutrient.min);
      console.log(nutrient.max);
    });
  }
}