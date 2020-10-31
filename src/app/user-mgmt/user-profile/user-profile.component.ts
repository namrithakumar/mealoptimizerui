import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user : User;

  mode: String;

  signupForm : FormGroup;

  passwordPattern : any = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%?&]{6,10}$';

  constructor(private router : Router, private route: ActivatedRoute, private userService : UserService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.user = this.userService.user.getValue();

      this.route.queryParams.subscribe(
        (queryParams) => {
          this.mode = queryParams['mode'];
        }
      );

      this.signupForm = this.formBuilder.group({
          email  : this.formBuilder.control(this.user.email, [Validators.required, Validators.email]),
          username : this.formBuilder.control(this.user.username, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
          //error accessed as !signupForm.get('email').errors['required']
          password : this.formBuilder.control('password', [Validators.required, Validators.pattern(this.passwordPattern)]),
          nutrients : this.formBuilder.array(this.mergeNutrientMinMaxLimits(this.user.nutrientMaxLimits, this.user.nutrientMinLimits))
      });

      this.signupForm.valueChanges.subscribe((value) => {
        console.log(this.signupForm);
        this.onEditUserProfile();
      });
  }

  mergeNutrientMinMaxLimits(nutrientMaxLimits : Array<{ String, number }>, nutrientMinLimits : Array<{ String, number }>) {
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