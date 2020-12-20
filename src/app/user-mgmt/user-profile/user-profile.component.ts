import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../app/shared/model/user.model';
import { AppState } from '../../../app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { AuthenticatedUser } from '../store/reducers/user-mgmt.reducer';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user : User;

  mode: String;

  userProfileForm : FormGroup;

  passwordPattern : any = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%?&]{6,10}$';

  constructor(private router : Router, private route: ActivatedRoute, private formBuilder : FormBuilder, private store : Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('authenticatedUser').subscribe(( authenticatedUser : AuthenticatedUser ) => {
      this.user = authenticatedUser.user;
    });

      this.route.queryParams.subscribe(
        (queryParams) => {
          this.mode = queryParams['mode'];
        }
      );

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

      this.userProfileForm.valueChanges.subscribe((value) => {
        this.onEditUserProfile();
      });
  }

  mergeNutrientMinMaxLimits(nutrientMaxLimits : Array<{String, number}>, nutrientMinLimits : Array<{String, number}>) {
    let mergedArrayNoKeys : Array<{String, number}> = 
    Object.values(nutrientMinLimits).map( (nutrientMin,i) => Object.assign( {}, nutrientMin, nutrientMaxLimits[i]));
    let mergedArray = new Array<{ name : String, min:Number, max:number }>();
    mergedArrayNoKeys.forEach((nutrient) => mergedArray.push({name : nutrient.String, min: nutrient.number, max : nutrient.number}));
    return mergedArray;
  }

  onEditUserProfile() {
    this.router.navigate(['user-mgmt','user','user-profile'], { queryParams: {mode: 'edit'} });
  }

  onSaveProfileChanges() {
    console.log('Profile changes updated');
  }

}