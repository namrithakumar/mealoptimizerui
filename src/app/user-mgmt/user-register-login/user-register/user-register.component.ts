import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  get nutrients() { return this.signupForm.get('nutrients') as FormArray; }

  constructor(private formBuilder : FormBuilder, private userService : UserService) { }

  ngOnInit(): void {

    this.defaultNutrientLimits = this.userService.getDefaultNutrientLimits();
    
    this.signupForm = this.formBuilder.group({
      personalInfo : this.formBuilder.group({
        fname : this.formBuilder.control('First name'),
        lname : this.formBuilder.control('Last name'),
        dob : this.formBuilder.control('DOB')
      }),
      signupInfo : this.formBuilder.group({
        email  : this.formBuilder.control('email'),
        username : this.formBuilder.control('username'),
        password : this.formBuilder.control(null)
      }),
      nutrients : this.formBuilder.array([])
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

  viewFormInfo() {
    this.nutrients.value.forEach((nutrient) => {
      console.log(nutrient.name);
      console.log(nutrient.min);
      console.log(nutrient.max);
    });
  }
}