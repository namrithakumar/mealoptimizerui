import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from '../../../app/shared/model/user.model';
import { AppState } from '../../../app/store/reducers/app.reducer';
import { AuthenticatedUser } from '../store/reducers/user-mgmt.reducer';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
/* The user can perform 2 actions in this component - 
 * View profile - profile information is loaded from the user currently logged in (which is loaded from store.select('authenticatedUser'))
 * Edit profile - If any of the profile info is changed, the changes are saved to the backend. - Refer #133 - will be handled later.
 * We automatically switch to edit mode if the user changes any of the profile info
 */
export class UserProfileComponent implements OnInit {

  //The user currently logged in - the user profile values are loaded from this user.
  user : User;

  //The Profile page can be in view mode or edit mode
  mode: String;

  //User profile form is displayed to the user via the template
  userProfileForm : FormGroup;

  /**TODO : Move to an env file */
  passwordPattern : any = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%?&]{6,10}$';

  get nutrients() { return this.userProfileForm.get('nutrients') as FormArray; }

  constructor(private route: ActivatedRoute, 
              private formBuilder : FormBuilder, 
              private store : Store<AppState>) { }

  /*
   * Actions inside ngOnInit:
   * Load the currently authenticated user
   * Map values from currently authenticated user to the user profile form
   * Check if user wants to (i.e. mode is in view/edit). When the component is loaded for the first time, mode = view
   * Automatically switch to edit mode if the user edits any of the fields.
   */
  ngOnInit(): void {

    //Load the currently authenticated user
    this.store.select('authenticatedUser').subscribe(( authenticatedUser : AuthenticatedUser ) => {
      this.user = authenticatedUser.user;
    });

    //Map values from currently authenticated user to the user profile form
    this.userProfileForm = this.formBuilder.group({
        email  : this.formBuilder.control(this.user.email, [Validators.required, Validators.email]),
        username : this.formBuilder.control(this.user.username, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        //error accessed as !signupForm.get('email').errors['required']
        password : this.formBuilder.control('password', [Validators.required, Validators.pattern(this.passwordPattern)]),
        nutrients : this.formBuilder.array(this.mergeNutrientMinMaxLimits(this.user.nutrientMaxLimits, this.user.nutrientMinLimits)),
        firstName  : this.formBuilder.control(this.user.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        lastName  : this.formBuilder.control(this.user.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        address  : this.formBuilder.control(this.user.address, [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
      });

    //Check current value of mode
    this.route.queryParams.subscribe(
      (queryParams) => {
        this.mode = queryParams['mode'];
      });
    }
    
  private mergeNutrientMinMaxLimits(nutrientMaxLimits : Map<String, number>, nutrientMinLimits : Map<String, number>) : FormGroup[] {
    let nutrientInfoArray : Array<FormGroup> = new Array<FormGroup>();
    let mergedArray = new Array<{ name : String, min:Number, max:number }>();
    for(let [key, value] of Object.entries(nutrientMaxLimits)) {
      mergedArray.push({ name : key, min : nutrientMinLimits[key], max : value});
    }
    mergedArray.forEach((nutrient) => {
      nutrientInfoArray.push(this.formBuilder.group({
        name : nutrient.name,
        min : nutrient.min,
        max : nutrient.max
      }));
    });
  return nutrientInfoArray;  
  }
}