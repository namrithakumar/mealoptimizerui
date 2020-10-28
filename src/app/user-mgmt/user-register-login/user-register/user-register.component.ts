import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  signupForm : FormGroup;

  nutrientNames = ['carbs', 'protein', 'fat', 'calories', 'sodium', 'calcium'];

  get nutrients() { return this.signupForm.get('nutrients') as FormArray; }

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
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
    
    this.nutrientNames.forEach((nutrientName) => this.addNutrient(nutrientName));
  }

  private addNutrient(nutrientName : String) {
    this.nutrients.push(this.formBuilder.group({
      name : nutrientName,
      min : 5,
      max : 2000
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